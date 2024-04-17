import { useCallback } from 'react';
import { MorningMetricIds } from '~utils/morning';
import { sendToBackground } from '@plasmohq/messaging';
import { Storage } from '@plasmohq/storage';

const storage = new Storage();

type EventType = keyof typeof MorningMetricIds;
type EventAttributes = {
  [key: string]: string | number;
};

export async function trackEvent(
  eventType: EventType,
  attributes?: EventAttributes | undefined,
) {
  const resp = await sendToBackground({
    name: 'events',
    body: {
      eventType,
      attributes,
    },
  });
  await storage.set(MorningMetricIds[eventType], resp.success);
  return resp;
}

export function useTrackEvent() {
  const trackEventCB = useCallback(trackEvent, []);
  return {
    trackEvent: trackEventCB,
  };
}

export async function hasTrackedEvent(type: EventType) {
  const event = await storage.get(MorningMetricIds[type]);
  if (event) return true;
  return false;
}
