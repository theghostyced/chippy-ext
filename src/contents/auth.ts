import type { PlasmoCSConfig } from 'plasmo';

import { sendToBackground } from '@plasmohq/messaging';

export const config: PlasmoCSConfig = {
  // TODO: disable on production build
  matches: [
    'http://localhost:3000/*',
    'https://chippy-api.nunn.ink/*',
    'https://chippyai.com/*',
    'https://www.chippyai.com/*',
  ],
};

const processUrl = () => {
  const location = window.location;
  if (
    config.matches.includes(`${location.origin}/*`) &&
    location.pathname === '/auth'
  ) {
    const params = new URLSearchParams(location.search);
    sendToBackground({
      name: 'auth',
      body: {
        action: 'token',
        token: params.get('token'),
      },
    });
  }
};

processUrl();
