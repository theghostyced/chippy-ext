import type { PlasmoMessaging } from '@plasmohq/messaging';
import { getUserInfo } from '~utils/auth';
import {
  MorningMetricIds,
  trackEvent,
  defaultAttributes,
} from '~utils/morning';

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { eventType, attributes } = req.body;
  const metricId = MorningMetricIds[eventType];
  const { id } = await getUserInfo();
  if (!metricId) {
    res.send({
      status: 'error',
      message: `Could not load id for event type ${eventType}`,
    });
  }
  const response = await trackEvent(metricId, id, {
    ...(await defaultAttributes()),
    ...(attributes ? attributes : {}),
  });
  res.send({ success: response === 200 });
};

export default handler;
