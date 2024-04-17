import { useCallback } from 'react';
import { submitGenerateEmailQuestion } from '~features/conversations/conversationsSlice';
import { useTrackEvent } from '~hooks/useTrackEvent';
import { useConversations } from '~providers/Conversations';
import { useAppDispatch } from '~store';
import { generateThreadFromSession } from '~utils/conversation';
import { type ConversationType } from '~utils/types';

type CreateOrAddChatProps = {
  conversationId: ConversationType['id'] | null;
  usePageContext: boolean;
  pageContext?: string;
};

export const useGenerateEmailQuestions = ({
  conversationId,
  usePageContext,
  pageContext,
}: CreateOrAddChatProps) => {
  const { trackEvent } = useTrackEvent();
  const dispatch = useAppDispatch();
  const { setActiveConversationId, setChippyPrompt, setLoadingFollowUp } =
    useConversations();
  // const { isOverDailyLimit } = useUserInfo();
  const generateEmailQuestions = useCallback(() => {
    // if (isOverDailyLimit) {
    //   trackEvent('HitLimit');
    //   console.log('Overlimit');
    //   return setOverLimitVisible(true);
    // }
    setChippyPrompt(undefined);
    const thread = generateThreadFromSession();
    setLoadingFollowUp(true);
    dispatch(submitGenerateEmailQuestion({ conversationId, thread }));
  }, [
    conversationId,
    usePageContext,
    pageContext,
    dispatch,
    trackEvent,
    setActiveConversationId,
    setChippyPrompt,
  ]);

  return generateEmailQuestions;
};
