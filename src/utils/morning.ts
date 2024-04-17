import platform from 'platform';
import { getUserInfo } from './auth';

export const MorningMetricIds = {
  Installs: 'M_NMUOUDAC2F',
  Opens: 'M_QZV310074L',
  SuggestionsPicked: 'M_BNXIC5R1QD',
  OnboardingViewed: 'M_ZHNXCCEUQF',
  OnboardingOpened: 'M_5339EO7UT1',
  OnboardingTheme: 'M_2J7FY05W77',
  OnboardingWikipedia: 'M_FLOCG2GZ58',
  OnboardingRandom: 'M_40A0Y2I4LV',
};

export async function defaultAttributes() {
  const platformData = platform.parse(navigator.userAgent);
  let profile;
  let avatar;
  try {
    ({ profile } = await getUserInfo());
    if (profile.picture) {
      avatar = profile.picture;
    }
  } catch (_) {
    // silent fail
  }
  const attributes = {
    language: navigator.language,
    browser: platformData.name,
    browserVersion: platformData.version,
    os: platformData.os.family,
    osVersion: platformData.os.version,
    ...(profile ? profile : {}),
    avatar,
  };

  return attributes;
}

export async function trackEvent(
  metricId: string,
  personId: string,
  attributes = null,
) {
  if (!process.env.PLASMO_PUBLIC_MORNING_API_KEY) {
    throw new Error('Morning not configured');
  }
  const apiKey = process.env.PLASMO_PUBLIC_MORNING_API_KEY;
  const params = {
    method: 'increment',
    value: 1,
    personId,
    personAttributes: attributes ? attributes : {},
  };
  const response = await fetch(
    `https://api.morning.so/v3/metrics/${metricId}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(params),
    },
  );
  return response.status;
}
