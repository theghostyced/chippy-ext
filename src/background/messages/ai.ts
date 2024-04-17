import { sendToContentScript, type PlasmoMessaging } from '@plasmohq/messaging';
import {
  getIdToken,
  getMessageToken,
  getTemporaryToken,
  getUserInfo,
  saveIdToken,
} from '~utils/auth';
import { API_URL, MAX_MODEL_TOKENS } from '~utils/constants';
import { generateId } from '~utils/conversation';
import { captureException } from '~utils/sentry';
import {
  BackgroundTypes,
  type AssistantStreamResponse,
  type MessageType,
} from '~utils/types';

export type RequestBody = {
  messages: MessageType[];
};
export type ResponseBody = AssistantStreamResponse;

const sendRequest = async (
  url,
  messages,
  context,
  userModel,
  thread,
  retryCount = 0,
) => {
  let token = await getIdToken();

  // We're in an anonymous mode, so generate and save a anon token
  if (!token) {
    token = await getTemporaryToken();
    await saveIdToken(token);
    await getUserInfo();
  }

  const messageToken = await getMessageToken();

  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      messages: messages,
      context: context,
      userModel: userModel,
      thread,
      messageToken,
    }),
  });

  if (response.status === 401 && retryCount === 0) {
    // Note: This indicates that the user message token is expired.
    // We should try to refresh it before failing.
    await getUserInfo();
    return sendRequest(url, messages, context, userModel, thread, 1);
  }

  return response;
};

const processStream = async (response, messageId, res) => {
  if (!response.body) {
    throw new Error('ReadableStream not available');
  }

  const reader = response.body.getReader();
  let streamComplete = false;

  while (!streamComplete) {
    const { done, value } = await reader.read();

    if (done) {
      streamComplete = true;
      await sendToContentScript({
        name: BackgroundTypes.ai,
        body: {
          isStreamComplete: true,
        },
      });
      res.send({
        message: '',
      });
    } else {
      const token = new TextDecoder('utf-8').decode(value);
      await sendToContentScript({
        name: BackgroundTypes.ai,
        body: {
          message: token,
          messageId: messageId,
        },
      });
    }
  }
};

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { messages, context, userModel, thread } = req.body;

  try {
    const messageId = generateId();

    const isLongContext = context && context.length > MAX_MODEL_TOKENS;
    const url = isLongContext ? `${API_URL}/page` : `${API_URL}/ai`;

    if (isLongContext) {
      await sendToContentScript({
        name: BackgroundTypes.ai,
        body: {
          message: 'Searching page for information...',
          isStatusMessage: true,
        },
      });
    }

    const response = await sendRequest(
      url,
      messages,
      context,
      userModel,
      thread,
    );

    if (response.status === 429) {
      await sendToContentScript({
        name: BackgroundTypes.ai,
        body: {
          message: 'User is over daily free limit.',
          messageId: messageId,
          isStreamComplete: true,
          isError: true,
          isOverLimitMessage: true,
        },
      });
      return;
    }

    if (response.status === 401) {
      throw new Error('Message token is expired');
    }

    await processStream(response, messageId, res);
  } catch (error) {
    console.log('Caught error', error);
    const messageId = generateId();
    await sendToContentScript({
      name: BackgroundTypes.ai,
      body: {
        message:
          'There was an unexpected error from ChatGPT. Please try your message again.',
        messageId: messageId,
        isStreamComplete: true,
        isError: true,
      },
    });
    return await captureException(error);
  }
};

export default handler;
