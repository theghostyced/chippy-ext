import ChippyOptions from './ChippyOptions';
import Upgrade from './Upgrade';
import styleTextDark from 'data-text:~css/_3_components/highlighting-dark.css';
import styleTextLight from 'data-text:~css/_3_components/highlighting-light.css';
import styleTextWin98 from 'data-text:~css/_3_components/highlighting-win98.css';
import React, { useEffect, useRef, useState } from 'react';
import { DividerContainer, Divider } from '~components/common/Divider';
import renderMarkdownContent from '~components/common/Markdown';
import {
  MessageBoxAssistant,
  MessageBoxUser,
  Message as MessageStyled,
  Messages,
  MessageBoxContainer,
  PromptMessageContainer,
  CopyToClipboardButton,
} from '~components/common/Message';
import ChippyOptionsOnboarding from '~components/conversation/ChippyOptionsOnboarding';
import CopyToClipboard from '~components/svgs/CopyToClipboard';
import GlossyProfileIcon from '~components/svgs/GlossyProfileIcon';
import ProfileIcon from '~components/svgs/ProfileIcon';
import TrashIcon from '~components/svgs/TrashIcon';
import { deleteMessage } from '~features/conversations/conversationsSlice';
import { useConversations } from '~providers/Conversations';
import { useTheme } from '~providers/ThemeProvider';
import { useAppDispatch, useAppSelector } from '~store';
import { MessageRole, UserStatus, type MessageType } from '~utils/types';

function ClipboardButton({ text }) {
  const [copied, setCopied] = useState(false);

  return (
    <CopyToClipboardButton
      type='button'
      className={`copy-to-clipboard ${copied && 'copied'}`}
      onClick={() => {
        navigator.clipboard.writeText(`${text}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
    >
      {copied && '✓'}
      {!copied && <CopyToClipboard />}
    </CopyToClipboardButton>
  );
}

function Message({
  message,
  isBuilding,
}: {
  message: MessageType;
  isBuilding?: boolean;
}) {
  if (!message.content) return;

  const { activeConversationId } = useConversations();
  const dispatch = useAppDispatch();

  const handleDeleteMessage = () => {
    dispatch(
      deleteMessage({
        conversationId: activeConversationId,
        messageId: message.id,
      }),
    );
  };

  return (
    <MessageStyled
      align={message.role === 'user' ? 'center' : 'flex-start'}
      className={isBuilding ? 'building' : ''}
    >
      <div
        className={message.role === 'user' ? 'no-margin' : 'assisant-message'}
      >
        {renderMarkdownContent(message)}
      </div>

      <div className='button-group'>
        {message.role !== 'user' && <ClipboardButton text={message.content} />}
        <button
          type='button'
          onClick={handleDeleteMessage}
          aria-label='Delete message'
          className={message.role !== 'user' ? 'button-margin' : ''}
        >
          <TrashIcon />
        </button>
      </div>
    </MessageStyled>
  );
}

function Conversation() {
  const {
    currentAssistantMessage,
    activeConversationId,
    currentStatusMessage,
    chippyPrompt,
    conversation,
  } = useConversations();
  const userStatus = useAppSelector((state) => state.settings.userStatus);
  const spanScrollView = useRef<HTMLSpanElement>(null);

  // watches if chatgpt is answering a question and scrolls to the
  // bottom of the chat message section
  useEffect(() => {
    if (spanScrollView) {
      spanScrollView.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [
    currentAssistantMessage,
    currentStatusMessage,
    chippyPrompt,
    conversation.messages,
  ]);

  const { theme } = useTheme();
  const Icon = theme === 'glossy' ? GlossyProfileIcon : ProfileIcon;
  let highlightTheme = styleTextLight;
  if (theme === 'dark') {
    highlightTheme = styleTextDark;
  } else if (theme === 'window98') {
    highlightTheme = styleTextWin98;
  }

  return (
    <>
      <style>{highlightTheme}</style>
      <Messages>
        {conversation.messages
          .filter((message) => !message.isInstruction) // Hide any instruction messages
          .map((message, index) => {
            return (
              <React.Fragment key={`message-${index}`}>
                {message.role === 'user' && (
                  <MessageBoxUser>
                    <Icon className='profile-icon' />
                    <Message message={message} />
                  </MessageBoxUser>
                )}

                {message.role === 'assistant' && (
                  <MessageBoxContainer>
                    {/* <div className="message-bubble" /> */}
                    {/* <MessageClip /> */}

                    <MessageBoxAssistant>
                      <Message message={message} />
                    </MessageBoxAssistant>
                  </MessageBoxContainer>
                )}

                {message.role === 'assistant' && (
                  <DividerContainer>
                    <Divider />
                  </DividerContainer>
                )}
              </React.Fragment>
            );
          })}

        {(currentAssistantMessage || currentStatusMessage) &&
          activeConversationId === conversation.id && (
            <MessageBoxContainer>
              {/* <div className="message-bubble" /> */}
              {/* <MessageClip /> */}
              <MessageBoxAssistant>
                <Message
                  message={{
                    content: currentStatusMessage || currentAssistantMessage,
                    role: MessageRole.assistant,
                    id: '',
                  }}
                  isBuilding={true}
                />
              </MessageBoxAssistant>
            </MessageBoxContainer>
          )}

        <MessageBoxContainer>
          {userStatus === UserStatus.theme && <ChippyOptionsOnboarding />}
          <ChippyOptions type='inline' questions={chippyPrompt} />
          <PromptMessageContainer>
            <Upgrade />
            {/* {!chippyPrompt && <CopyOptions />} */}
          </PromptMessageContainer>
        </MessageBoxContainer>
        <span style={{ minHeight: '20px' }} ref={spanScrollView} />
      </Messages>
    </>
  );
}

export default Conversation;
