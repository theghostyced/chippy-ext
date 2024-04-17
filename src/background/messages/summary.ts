import type { PlasmoMessaging } from '@plasmohq/messaging';
import { API_URL } from '~utils/constants';
import { captureException } from '~utils/sentry';
import { type SummaryRequest, type SummaryResponse } from '~utils/types';

const handler: PlasmoMessaging.MessageHandler<SummaryRequest, SummaryResponse> =
  async (req, res) => {
    const messages = req.body.messages;
    if (!messages) {
      throw Error('Missing message');
    }
    try {
      const response = await fetch(`${API_URL}/summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages,
        }),
      });
      const respBody = await response.json();
      res.send({
        name: respBody.name,
      });
    } catch (error) {
      console.log('error in summary', error);
      captureException(error);
    }
  };

export default handler;
