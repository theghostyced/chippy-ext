import { InlineOptions } from '~components/common/Options/InlineOptions';
import {
  submitConversation,
  addMessage,
} from '~features/conversations/conversationsSlice';
import { useConversations } from '~providers/Conversations';
import { useAppDispatch } from '~store';
import { MessageRole, UserStatus } from '~utils/types';
import { updateUserStatus } from '~features/settings/settingsSlice';
import { useTrackEvent } from '~hooks/useTrackEvent';

export default function ChippyOptionsOnboarding() {
  const dispatch = useAppDispatch();
  const { trackEvent } = useTrackEvent();
  const { activeConversationId: conversationId } = useConversations();

  const askQuestion = (content: string) => {
    trackEvent('OnboardingRandom');
    dispatch(
      addMessage({
        conversationId,
        content,
        role: MessageRole.user,
      }),
    );
    dispatch(submitConversation({ conversationId }));
  };

  const questions = [
    {
      label: 'Read about my father on wikipedia',
      clickHandler: () => {
        trackEvent('OnboardingWikipedia');
        window.location.href = 'https://en.wikipedia.org/wiki/Office_Assistant';
      },
    },
    // {
    //   label: 'Try me on gmail by responding to an email',
    //   clickHandler: () => {
    //     window.location.href = 'https://gmail.com/';
    //   },
    // },
    {
      label: 'Ask me a random question',
      clickHandler: () => askQuestion('Can you give me a fun fact?'),
    },
  ];

  return (
    <InlineOptions
      title={'Looking good. Now test my skills'}
      options={questions.map((q) => ({
        label: q.label,
        onClick: () => {
          q.clickHandler();
          dispatch(updateUserStatus({ status: UserStatus.complete }));
        },
      }))}
    />
  );
}
