import React, {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from 'react';
import { createConversation } from '~features/conversations/conversationsSlice';
import { useAppDispatch, useAppSelector } from '~store';
import { extractText, generateId } from '~utils/conversation';
import type { ConversationType, QuestionsType } from '~utils/types';

interface ConversationContextProps {
  currentAssistantMessage: string;
  setCurrentAssistantMessage: Dispatch<SetStateAction<string>>;
  activeConversationId: string | null;
  setActiveConversationId: Dispatch<SetStateAction<string | null>>;
  currentStatusMessage: string | undefined;
  setCurrentStatusMessage: Dispatch<SetStateAction<string | null>>;
  chippyPrompt: QuestionsType | undefined;
  setChippyPrompt: Dispatch<SetStateAction<QuestionsType | null>>;
  conversation: ConversationType | undefined;
  startNewConversation: () => void;
  usePageContext: boolean;
  setUsePageContext: Dispatch<SetStateAction<boolean>>;
  pageContext: string | undefined;
  setPageContext: Dispatch<SetStateAction<string | undefined>>;
  isLoadingFollowUp: boolean;
  setLoadingFollowUp: Dispatch<SetStateAction<boolean>>;
  isPageFollowup: boolean;
  setIsPageFollowup: Dispatch<SetStateAction<boolean>>;
}

interface ConversationsProps {
  children: React.ReactNode;
}

const ConversationsContext = createContext<ConversationContextProps>(null);

const ConversationsProvider = ({ children }: ConversationsProps) => {
  const dispatch = useAppDispatch();

  const [chippyPrompt, setChippyPrompt] = React.useState<
    QuestionsType | undefined
  >();

  // Handles streaming response from assistant to prevent error from too many writes to Storage
  const [currentAssistantMessage, setCurrentAssistantMessage] =
    React.useState('');
  const [currentStatusMessage, setCurrentStatusMessage] = React.useState<
    string | undefined
  >(undefined);
  const [pageContext, setPageContext] = React.useState<string | undefined>();
  const [isLoadingFollowUp, setLoadingFollowUp] = React.useState(false);
  const [usePageContext, setUsePageContext] = React.useState(false);
  const [isPageFollowup, setIsPageFollowup] = React.useState(false);

  // note: we use provider so activeConversationId is *not* stored in `storage` and
  // causes activateConversation to be shared amongst all open webpages
  const [activeConversationId, setActiveConversationId] = React.useState(null);
  const activeConversation: ConversationType = useAppSelector((state) => {
    return state.conversations.find(
      (conversation) => conversation.id === activeConversationId,
    );
  });

  useEffect(() => {
    if (usePageContext) {
      const text = extractText(document);
      setPageContext(text);
    } else {
      setPageContext(undefined);
    }
  }, [usePageContext]);

  // will trigger useEffect to create a new conversation
  const startNewConversation = () => {
    const conversationId = generateId();
    setActiveConversationId(conversationId);
    setPageContext('');
    setUsePageContext(false);
    setChippyPrompt(undefined);
    dispatch(createConversation({ conversationId: conversationId }));
  };

  React.useEffect(() => {
    if (!activeConversationId) {
      startNewConversation();
    }
  }, [activeConversationId]);

  return (
    <ConversationsContext.Provider
      value={{
        conversation: activeConversation,
        currentAssistantMessage,
        setCurrentAssistantMessage,
        activeConversationId,
        setActiveConversationId,
        currentStatusMessage,
        setCurrentStatusMessage,
        chippyPrompt,
        setChippyPrompt,
        startNewConversation,
        pageContext,
        setPageContext,
        usePageContext,
        setUsePageContext,
        isLoadingFollowUp,
        setLoadingFollowUp,
        isPageFollowup,
        setIsPageFollowup,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

export const useConversations = () => useContext(ConversationsContext);

export default ConversationsProvider;
