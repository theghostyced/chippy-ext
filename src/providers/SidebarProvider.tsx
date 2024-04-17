import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateCurrentPageQuestions } from '~features/conversations/conversationsSlice';
import { hasTrackedEvent, useTrackEvent } from '~hooks/useTrackEvent';
import { useAppDispatch, useAppSelector } from '~store';
import { useConversations } from './Conversations';
import { UserStatus } from '~utils/types';
import { useTextSelection } from '~hooks/useTextSelection';

interface SidebarContextProps {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
  setOverLimitVisible: React.Dispatch<React.SetStateAction<boolean>>;
  overLimitVisible: boolean;
}

interface SidebarProviderProps {
  children: React.ReactNode;
}

const SidebarContext = createContext<SidebarContextProps>(null);

const SidebarContextProvider = ({ children }: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuestions, setInitialQuestions] = useState(false);
  const [overLimitVisible, setOverLimitVisible] = useState(false);
  const { trackEvent } = useTrackEvent();
  const { selectedText } = useTextSelection();
  const { setLoadingFollowUp } = useConversations();
  const { userStatus } = useAppSelector((state) => state.settings);
  const userStatusIsComplete = userStatus === UserStatus.complete;
  const { conversation } = useConversations();

  const isEmptyConversation = !conversation?.messages?.length;
  const dispatch = useAppDispatch();

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const close = () => {
    setIsOpen(false);
  };
  const open = () => {
    setIsOpen(true);
  };
  // TODO: clean this up
  useEffect(() => {
    if (
      !isOpen ||
      initialQuestions ||
      !userStatusIsComplete ||
      !isEmptyConversation ||
      selectedText
    ) {
      return;
    }
    const url = `${window.location.origin}${window.location.pathname}`;
    const title = document.querySelector('title').text;
    let description = document
      .querySelector('meta[name="description"]')
      ?.getAttribute('content');
    const keywords = document
      .querySelector('meta[name="keywords"]')
      ?.getAttribute('content');
    if (!description) {
      description = document
        .querySelector('meta[property="og:description"]')
        ?.getAttribute('content');
    }
    if (keywords) {
      description = `${description}. Keywords: ${keywords}.`;
    }
    // TODO: move loading state into redux
    setLoadingFollowUp(true);
    dispatch(
      generateCurrentPageQuestions({
        url,
        title,
        description,
      }),
    );
    setInitialQuestions(true);
  }, [
    isOpen,
    initialQuestions,
    userStatusIsComplete,
    isEmptyConversation,
    selectedText,
  ]);

  useEffect(() => {
    if (isOpen) {
      trackEvent('Opens');
      hasTrackedEvent('OnboardingOpened').then((hasTracked) => {
        if (!hasTracked) {
          trackEvent('OnboardingOpened');
        }
      });
    }
  }, [isOpen]);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggle,
        close,
        open,
        overLimitVisible,
        setOverLimitVisible,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);

export default SidebarContextProvider;
