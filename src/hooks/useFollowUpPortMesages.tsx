import { useEffect } from 'react';
import { useConversations } from '~providers/Conversations';
import { BackgroundTypes } from '~utils/types';

// listen for followup questions and update state
function useFollowUpPortMessages() {
  const { setChippyPrompt, setLoadingFollowUp, setIsPageFollowup } =
    useConversations();

  useEffect(() => {
    function handleFollowUp(request) {
      const data = request.body;
      if (
        request.name !== BackgroundTypes.followup &&
        request.name !== BackgroundTypes.pageFollowup
      ) {
        return;
      }
      if (data.result) {
        setChippyPrompt(data.result);
        setIsPageFollowup(request.name === BackgroundTypes.pageFollowup);
      }
      setLoadingFollowUp(false);
    }
    chrome.runtime.onMessage.addListener(handleFollowUp);
    return () => {
      chrome.runtime.onMessage.removeListener(handleFollowUp);
    };
  }, [setChippyPrompt]);
}

export default useFollowUpPortMessages;
