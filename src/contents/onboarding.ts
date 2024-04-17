import type { PlasmoCSConfig } from 'plasmo';
import { hasTrackedEvent, trackEvent } from '~hooks/useTrackEvent';
import { getIdToken, getTemporaryToken, saveIdToken } from '~utils/auth';

export const config: PlasmoCSConfig = {
  // TODO: disable on production build
  matches: [
    'http://localhost:3000/*',
    'https://chippy-api.nunn.ink/*',
    'https://chippyai.com/*',
    'https://www.chippyai.com/*',
  ],
};

const processOnboarding = async () => {
  const location = window.location;
  if (location.pathname === '/onboarding') {
    // Make sure we have a valid token
    let token = await getIdToken();

    // We're in an anonymous mode, so generate and save a anon token
    if (!token) {
      token = await getTemporaryToken();
      await saveIdToken(token);
    }

    const alreadyTracked = await hasTrackedEvent('OnboardingViewed');
    if (!alreadyTracked) {
      await trackEvent('OnboardingViewed', {});
    }
    const trackInstall = await hasTrackedEvent('Installs');
    if (!trackInstall) {
      await trackEvent('Installs', {});
    }
  }
};

processOnboarding();
