import { sendToContentScript, type PlasmoMessaging } from '@plasmohq/messaging';
import { getUserInfo, logout, saveIdToken } from '~utils/auth';
import { BackgroundTypes } from '~utils/types';
import { API_URL } from '~utils/constants';

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { action } = req.body;

  try {
    if (!action || action === 'login') {
      const profile = await getUserInfo();
      chrome.runtime.setUninstallURL(`${API_URL}/uninstall/${profile?.id}`);
      res.send({ success: true, profile });
    } else if (action === 'token') {
      const { token } = req.body;
      saveIdToken(token);
      chrome.runtime.setUninstallURL(`${API_URL}/uninstall/${token}`);
      await sendToContentScript({
        name: BackgroundTypes.login,
        body: {
          token,
        },
      });
    } else if (action === 'logout') {
      await logout();
      res.send({ success: true });
    }
  } catch (err) {
    console.log('Error', err);
    return res.send({ success: false, error: err });
  }
};

export default handler;
