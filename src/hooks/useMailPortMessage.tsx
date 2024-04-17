import { useEffect, useState } from 'react';
import {
  addMessage,
  generateFollowUpQuestions,
} from '~features/conversations/conversationsSlice';
import { useConversations } from '~providers/Conversations';
import { useSidebarContext } from '~providers/SidebarProvider';
import { useUserInfo } from '~providers/UserInfoProvider';
import { useAppDispatch } from '~store';
import {
  BackgroundTypes,
  MessageRole,
  type BackgroundAIResponse,
  FollowUpTypes,
} from '~utils/types';

// This hook is used to listen to messages from the AI port
function useMailPortMessages(conversationId) {
  const dispatch = useAppDispatch();
  // store streaming response
  const [currentMessage, setCurrentMessage] = useState('');
  const { refetchUser } = useUserInfo();
  const {
    activeConversationId,
    setCurrentAssistantMessage,
    setCurrentStatusMessage,
  } = useConversations();
  const { setOverLimitVisible } = useSidebarContext();

  useEffect(() => {
    function handleMessage(request: BackgroundAIResponse) {
      const data = request.body;

      if (request.name !== BackgroundTypes.ai) {
        return;
      }

      if (data.isStatusMessage) {
        setCurrentStatusMessage(data.message);
        return;
      }

      if (data.isOverLimitMessage) {
        setOverLimitVisible(true);
        return;
      }

      if (data.message) {
        setCurrentMessage((prevMessage) => {
          const updatedMessage = prevMessage + data.message;
          return updatedMessage;
        });
        setCurrentAssistantMessage(currentMessage + data.message);
      }

      if (data.isStreamComplete) {
        if (!activeConversationId) {
          throw new Error('No active conversation');
        }
        dispatch(
          addMessage({
            conversationId: activeConversationId,
            content: currentMessage,
            role: MessageRole.assistant,
          }),
        );
        setCurrentAssistantMessage(undefined);
        setCurrentMessage('');
        dispatch(
          generateFollowUpQuestions({
            conversationId: activeConversationId,
            type: FollowUpTypes.question,
          }),
        );
        refetchUser(); // We call this to reload the daily message count
      }
      setCurrentStatusMessage(undefined);
    }

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, [dispatch, conversationId, setCurrentAssistantMessage, currentMessage]);
}

export default useMailPortMessages;
