import { sendToContentScript, type PlasmoMessaging } from '@plasmohq/messaging';
import { getIdToken, getMessageToken } from '~utils/auth';
import { API_URL } from '~utils/constants';
import { captureException } from '~utils/sentry';
import { BackgroundTypes, type CurrentPageRequest } from '~utils/types';

const handler: PlasmoMessaging.MessageHandler<CurrentPageRequest, unknown> =
  async (req, res) => {
    const { url, title, description } = req.body;
    if (!url || !title) {
      throw Error('Missing required params: title or url');
    }
    try {
      const token = await getIdToken();
      const messageToken = await getMessageToken();

      const headers = {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      };

      const response = await fetch(`${API_URL}/suggestion/page`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          url,
          title,
          description,
          messageToken,
        }),
      });
      if (response.status !== 200) {
        await sendToContentScript({
          name: BackgroundTypes.pageFollowup,
          body: {
            success: false,
          },
        });
        return;
      }
      const result = await response.json();
      await sendToContentScript({
        name: BackgroundTypes.pageFollowup,
        body: {
          result: result,
        },
      });
      res.send({
        message: '',
      });
    } catch (error) {
      console.log('error in page suggestions', error);
      // send empty result to content script to ensure the loading state is removed
      await sendToContentScript({
        name: BackgroundTypes.pageFollowup,
        body: {},
      });
      captureException(error);
    }
  };

export default handler;
