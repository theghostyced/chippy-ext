import type { PlasmoCSConfig } from 'plasmo';
export const config: PlasmoCSConfig = {
  matches: ['https://mail.google.com/*'],
  run_at: 'document_start',
};
function addScript(src) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = chrome.runtime.getURL(src);
  (document.body || document.head || document.documentElement).appendChild(
    script,
  );
}

addScript('assets/js/gmailJsLoader.js');
addScript('assets/js/extension.js');
