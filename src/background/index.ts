import { sendToContentScript } from '@plasmohq/messaging';
import { getUserInfo } from '~utils/auth';
import { API_URL } from '~utils/constants';

// if chrome extension icon clicked, send message to content script
// defaults to active tab if not specified
chrome.action.onClicked.addListener(async function () {
  await sendToContentScript({
    name: 'icon',
    body: {},
  });
});

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: 'https://chippyai.com/onboarding' });
    // set uninstall URL to track uninstalls / redirect to a survey
    const userInfo = await getUserInfo();
    chrome.runtime.setUninstallURL(`${API_URL}/uninstall/${userInfo?.id}`);
  }
});
