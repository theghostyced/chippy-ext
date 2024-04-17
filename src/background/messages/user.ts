import type { PlasmoMessaging } from '@plasmohq/messaging';
import { getUserInfo } from '~utils/auth';

const handler: PlasmoMessaging.MessageHandler = async (_, res) => {
  const userType = await getUserInfo();
  const response = {
    success: true,
    ...userType,
  };
  res.send(response);
};

export default handler;
