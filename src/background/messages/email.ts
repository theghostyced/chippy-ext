import { sendToContentScript, type PlasmoMessaging } from '@plasmohq/messaging';
import { getIdToken, getMessageToken } from '~utils/auth';
import { API_URL } from '~utils/constants';
import { captureException } from '~utils/sentry';

import { BackgroundTypes, ChippyTypes } from '~utils/types';

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { thread } = req.body;

  try {
    const token = await getIdToken();
    const messageToken = await getMessageToken();

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    };

    // We're in an anonymous mode, so generate and save a anon token
    const response = await fetch(`${API_URL}/email`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        thread: thread,
        messageToken,
      }),
    });
    const result = await response.json();
    result.type = ChippyTypes.email;
    await sendToContentScript({
      name: BackgroundTypes.followup,
      body: {
        result: result,
      },
    });
    res.send({
      message: '',
    });
  } catch (error) {
    // send empty result to content script to ensure the loading state is removed
    await sendToContentScript({
      name: BackgroundTypes.followup,
      body: {},
    });
    console.log('Caught error in followup', error);
    await captureException(error);
  }
};

export default handler;
