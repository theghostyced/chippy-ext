import Options from '../common/Options/Options';
import {
  InlineOptions,
  ChippyInlineLoading,
} from '~components/common/Options/InlineOptions';
import {
  submitConversation,
  addMessage,
  updateConversationChippyStatus,
} from '~features/conversations/conversationsSlice';
import useIsOnGmail from '~hooks/useIsOnGmail';
import { trackEvent } from '~hooks/useTrackEvent';
import { useConversations } from '~providers/Conversations';
import { useAppDispatch } from '~store';
import { extractText, generateThreadFromSession } from '~utils/conversation';
import { MessageRole, type QuestionsType } from '~utils/types';

export default function ChippyOptions({
  questions,
  type = 'float',
}: {
  questions: QuestionsType | undefined;
  type?: 'inline' | 'float'; // Default is 'float'
}) {
  const dispatch = useAppDispatch();
  const {
    activeConversationId: conversationId,
    setChippyPrompt,
    currentAssistantMessage,
    currentStatusMessage,
    pageContext,
    isLoadingFollowUp,
    isPageFollowup,
    setUsePageContext,
  } = useConversations();

  const [isOnGmail] = useIsOnGmail();

  const clearChippy = () => {
    setChippyPrompt(undefined);
    dispatch(
      updateConversationChippyStatus({ conversationId, chippyDisabled: true }),
    );
  };

  const askQuestion = (content: string) => {
    dispatch(
      addMessage({
        conversationId,
        content,
        role: MessageRole.user,
      }),
    );
    let context = pageContext;
    if (isPageFollowup) {
      context = extractText(document);
    }
    if (isOnGmail) {
      // call get email questions function
      const thread = generateThreadFromSession();
      dispatch(submitConversation({ conversationId, thread: thread }));
    } else {
      dispatch(submitConversation({ conversationId, context }));
    }
    trackEvent('SuggestionsPicked', {});
    setChippyPrompt(undefined);
  };

  if (currentAssistantMessage || currentStatusMessage) {
    return <></>;
  }

  if (isLoadingFollowUp) {
    return <ChippyInlineLoading />;
  }
  if (!questions) {
    return <></>;
  }

  return (
    <>
      {type === 'float' ? (
        <Options
          onClose={() => {
            clearChippy();
          }}
          title={questions.funnyPrompt}
          options={questions.questions.map((q) => ({
            label: q,
            onClick: () => {
              if (isPageFollowup) {
                setUsePageContext(true);
              }
              askQuestion(q);
            },
          }))}
        />
      ) : (
        <InlineOptions
          title={questions.funnyPrompt}
          options={questions.questions.map((q) => ({
            label: q,
            onClick: () => {
              if (isPageFollowup) {
                setUsePageContext(true);
              }
              askQuestion(q);
            },
          }))}
        />
      )}
    </>
  );
}
