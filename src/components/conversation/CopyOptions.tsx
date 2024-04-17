import Options from '../common/Options/Options';
import { useEffect, useState } from 'react';
import {
  submitConversation,
  addMessage,
} from '~features/conversations/conversationsSlice';
import { useConversations } from '~providers/Conversations';
import { useAppDispatch, useAppSelector } from '~store';
import { MessageRole, type MessageType } from '~utils/types';

export default function CopyOptions() {
  const [hideMessage, setHideMessage] = useState(false);
  const [lastMessage, setLastMessage] = useState<undefined | MessageType>();
  const dispatch = useAppDispatch();
  const { activeConversationId: conversationId, conversation } =
    useConversations();
  const { translationLanguage: defaultSettingLanguage } = useAppSelector(
    (state) => state.settings,
  );
  useEffect(() => {
    if (conversation?.messages && conversation.messages.length > 0) {
      const [lastItem] = conversation.messages.slice(-1);
      setLastMessage(lastItem);
    }
  }, [conversation]);

  useEffect(() => {
    setHideMessage(false);
  }, [lastMessage]);

  const addMessageWithContent = (content) => {
    dispatch(
      addMessage({
        conversationId,
        content,
        role: MessageRole.user,
        isInstruction: true,
      }),
    );
    dispatch(submitConversation({ conversationId }));
  };

  const summarize = () => {
    const content = `Summarize this text with a short paragraph and then with a bullet point list with the most important things (illustrate each point with an emoji):\n\n"""${lastMessage.content}"""`;
    addMessageWithContent(content);
  };

  const explain = () => {
    const content = `Explain the following text:\n\n"""${lastMessage.content}"""`;
    addMessageWithContent(content);
  };

  const translate = () => {
    const content = `Translate the following to ${defaultSettingLanguage}:\n\n"""${lastMessage.content}"""`;
    addMessageWithContent(content);
  };

  if (!lastMessage?.isCopy || hideMessage) {
    return <></>;
  }

  return (
    <Options
      onClose={() => {
        setHideMessage(true);
      }}
      title='Do you need help with this selection?'
      options={[
        {
          label: 'SUMMARIZE',
          onClick: summarize,
        },
        {
          label: 'EXPLAIN',
          onClick: explain,
        },
        {
          label: `TRANSLATE TO ${defaultSettingLanguage.toUpperCase()}`,
          onClick: translate,
        },
      ]}
    />
  );
}
