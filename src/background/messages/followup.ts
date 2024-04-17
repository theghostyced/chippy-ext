import { sendToContentScript, type PlasmoMessaging } from '@plasmohq/messaging';
import { getIdToken } from '~utils/auth';
import { API_URL } from '~utils/constants';
import { captureException } from '~utils/sentry';

import { BackgroundTypes } from '~utils/types';

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { messages, context } = req.body;

  try {
    const token = await getIdToken();

    const headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${API_URL}/suggestion`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        messages: messages,
        context: context,
      }),
    });
    const result = await response.json();
    await sendToContentScript({
      name: BackgroundTypes.followup,
      body: {
        result: result,
      },
    });
    res.send({
      message: '',
    });
    // }
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
