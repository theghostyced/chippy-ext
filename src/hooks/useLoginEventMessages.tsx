import { useEffect } from 'react';
import { BackgroundTypes } from '~utils/types';

// listen for followup questions and update state
function useLoginEventMessages(onLogin: () => void) {
  useEffect(() => {
    function handleLogin(request) {
      if (request.name !== BackgroundTypes.login) {
        return;
      }
      onLogin();
    }
    chrome.runtime.onMessage.addListener(handleLogin);
    return () => {
      chrome.runtime.onMessage.removeListener(handleLogin);
    };
  }, [onLogin]);
}

export default useLoginEventMessages;
