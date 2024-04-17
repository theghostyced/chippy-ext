// import Optio from './Options';
import { useState, useEffect, useRef } from 'react';
import { Divider } from '~components/common/Divider';
import {
  MessageButton,
  MessageInputBottom,
  MessageInputContainer,
  MessageTextarea,
  MessageBoxContainer,
  PromptMessageContainer,
  FreePlanPromptContainer,
  FooterActivationText,
} from '~components/common/Message';
import Options from '~components/common/Options/Options';
import { SegmentedControl } from '~components/common/SegmentedControl';
import ButtonSend from '~components/svgs/ButtonSend';
import { Star } from '~components/svgs/Star';
import { useAddConversationMessage } from '~hooks/useAddConversationMessage';
import useAutosizeTextArea from '~hooks/useAutosizeTextArea';
import { useGenerateEmailQuestions } from '~hooks/useGenerateEmailQuestions';
import useIsOnGmail from '~hooks/useIsOnGmail';
import { useConversations } from '~providers/Conversations';
import { useSidebarContext } from '~providers/SidebarProvider';
import { useUserInfo } from '~providers/UserInfoProvider';
import {
  PAID_MESSAGE_LIMIT_GPT3,
  PAID_MESSAGE_LIMIT_GPT4,
} from '~utils/constants';
import { type ConversationType } from '~utils/types';

type MessageInputProps = {
  conversationId: ConversationType['id'] | null;
  disabled: boolean;
};

const useDisableSubmit = (disabled: boolean) => {
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const { currentAssistantMessage, currentStatusMessage } = useConversations();

  useEffect(() => {
    setSubmitDisabled(
      disabled || !!currentAssistantMessage || !!currentStatusMessage,
    );
  }, [disabled, currentAssistantMessage, currentStatusMessage]);

  return submitDisabled;
};

function MessageInput({ conversationId, disabled }: MessageInputProps) {
  const [unsentMessage, setUnsentMessage] = useState('');
  const { isOpen } = useSidebarContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const submitDisabled = useDisableSubmit(disabled);
  useAutosizeTextArea(textareaRef.current, unsentMessage);
  const [isOnGmail, loading] = useIsOnGmail();
  const { userQueryLimitLeft, userQueryLimit, upgrade, user } = useUserInfo();
  const { pageContext, usePageContext, setUsePageContext } = useConversations();
  useAutosizeTextArea(textareaRef.current, unsentMessage);
  const addConversationMessage = useAddConversationMessage({
    conversationId,
    usePageContext,
    pageContext,
    unsentMessage,
    setUnsentMessage,
  });
  const generateEmailQuestions = useGenerateEmailQuestions({
    conversationId,
    usePageContext,
    pageContext,
  });

  // Update usePageContext if isOnGmail
  useEffect(() => {
    if (isOpen && isOnGmail) {
      setUsePageContext(true);
    }
  }, [isOnGmail, isOpen]);

  useEffect(() => {
    if (!loading && isOnGmail && pageContext) {
      generateEmailQuestions();
    }
  }, [loading, isOnGmail, generateEmailQuestions, pageContext]);

  const focusTextArea = () => {
    if (textareaRef.current && isOpen) {
      textareaRef.current.focus();
    }
  };

  // autofocus textarea when component mounts or disabled changes
  useEffect(() => {
    focusTextArea();
  }, [textareaRef, isOpen, disabled, conversationId]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation(); // stop propagation only for the Enter key without Shift
      if (!submitDisabled) {
        addConversationMessage();
      }
    } else if (event.key === 'j' && event.metaKey) {
      // Do nothing and let the event propagate for Command + J
    } else {
      event.stopPropagation(); // stop propagation for all other keys except Command + J
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (!submitDisabled) {
      addConversationMessage();
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUnsentMessage(event.target.value);
  };

  const FreePlanPrompt = () => {
    return (
      <FreePlanPromptContainer>
        <MessageBoxContainer>
          <PromptMessageContainer>
            {user.isFree && (
              <Options
                title={
                  <>
                    <p className='options-text'>
                      You are currently on a free plan that only gets you{' '}
                      <span className='text-bg'>20 queries</span> per day.
                    </p>

                    <p>For more queries or to use GPT-4 upgrade now.</p>
                  </>
                }
                options={[
                  {
                    label: 'Upgrade',
                    onClick: upgrade,
                  },
                ]}
                showChippyCharacter={false}
              />
            )}
            {!user.isFree && (
              <Options
                showChippyCharacter={false}
                title={
                  <div>
                    <p className='options-text'>Your paid plan gets you:</p>
                    <ul>
                      <li>{PAID_MESSAGE_LIMIT_GPT3} GPT-3 queries per day</li>
                      <li>{PAID_MESSAGE_LIMIT_GPT4} GPT-4 queries per day</li>
                    </ul>
                  </div>
                }
              />
            )}
          </PromptMessageContainer>
        </MessageBoxContainer>
        <FooterActivationText>
          <Star />
          {user.isFree ? 'Free Plan' : 'Paid Plan'} {userQueryLimitLeft} /{' '}
          {userQueryLimit}
        </FooterActivationText>
      </FreePlanPromptContainer>
    );
  };

  return (
    <>
      <Divider />
      <MessageTextarea
        aria-multiline='true'
        ref={textareaRef}
        value={unsentMessage}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        placeholder='Start a message'
        disabled={disabled}
      />

      <MessageInputBottom>
        <MessageInputContainer>
          <SegmentedControl
            selected={usePageContext ? 1 : 0}
            items={[
              {
                title: 'ChatGPT',
                toolTip: 'Ask ChatGPT',
                onClick: () => {
                  setUsePageContext(false);
                },
              },
              {
                title: 'Current Page',
                toolTip: 'Ask ChatGPT about the current page',
                onClick: () => {
                  setUsePageContext(true);
                },
              },
            ]}
          />
        </MessageInputContainer>

        <MessageInputContainer style={{ alignItems: 'center' }}>
          <FreePlanPrompt />

          <MessageButton
            onClick={handleClick}
            className={unsentMessage?.length > 0 && 'active'}
          >
            <ButtonSend />
          </MessageButton>
        </MessageInputContainer>
      </MessageInputBottom>
    </>
  );
}

export default MessageInput;
