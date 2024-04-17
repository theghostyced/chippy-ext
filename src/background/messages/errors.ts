import type { PlasmoMessaging } from '@plasmohq/messaging';
import { captureException } from '~utils/sentry';

class ContentScriptError extends Error {
  constructor(message, stack) {
    super(message); // (1)
    this.name = 'ContentScriptError'; // (2)
    this.stack = stack;
  }
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log('error handler called', req.body);
  const { error } = req.body;
  const execption =
    error.type === 'error'
      ? new ContentScriptError(error.message, error.stack)
      : error.message;
  const resp = await captureException(execption);
  res.send({ success: true, resp });
};

export default handler;
