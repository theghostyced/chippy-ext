import { useCallback } from 'react';
import {
  addMessage,
  submitConversation,
} from '~features/conversations/conversationsSlice';
import { useTrackEvent } from '~hooks/useTrackEvent';
import { useConversations } from '~providers/Conversations';
import { useAppDispatch, useAppSelector } from '~store';
import { MessageRole, type ConversationType, UserStatus } from '~utils/types';
import { updateUserStatus } from '~features/settings/settingsSlice';

type CreateOrAddChatProps = {
  unsentMessage: string;
  setUnsentMessage: (name: string) => void;
  conversationId: ConversationType['id'] | null;
  usePageContext: boolean;
  pageContext?: string;
};

export const useAddConversationMessage = ({
  unsentMessage,
  setUnsentMessage,
  conversationId,
  usePageContext,
  pageContext,
}: CreateOrAddChatProps) => {
  const { trackEvent } = useTrackEvent();
  const dispatch = useAppDispatch();
  const { setActiveConversationId, setChippyPrompt } = useConversations();
  const userStatus = useAppSelector((state) => state.settings.userStatus);
  const userStatusNotComplete = userStatus !== UserStatus.complete;
  // const { isOverDailyLimit } = useUserInfo();
  const addConversationMessage = useCallback(() => {
    // if (isOverDailyLimit) {
    //   trackEvent('HitLimit');
    //   console.log('Overlimit');
    //   return setOverLimitVisible(true);
    // }
    setChippyPrompt(undefined);
    const content = unsentMessage;
    let context;
    if (usePageContext) {
      context = pageContext;
    }
    dispatch(
      addMessage({
        conversationId,
        content,
        role: MessageRole.user,
      }),
    );
    dispatch(submitConversation({ conversationId, context: context }));
    setUnsentMessage('');
    if (userStatusNotComplete) {
      dispatch(updateUserStatus({ status: UserStatus.complete }));
    }
  }, [
    unsentMessage,
    setUnsentMessage,
    conversationId,
    usePageContext,
    pageContext,
    dispatch,
    trackEvent,
    setActiveConversationId,
    setChippyPrompt,
  ]);

  return addConversationMessage;
};
