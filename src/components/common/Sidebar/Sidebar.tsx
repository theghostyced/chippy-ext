import React, { useEffect, useRef, useState } from 'react';
import SidebarToggle from '~components/common/sidebar/SidebarToggle';
import {
  addMessage,
  generateFollowUpQuestions,
} from '~features/conversations/conversationsSlice';
import useHideChippyOnFullscreen from '~hooks/useHideChippyOnFullscreen';
import { useTextSelection } from '~hooks/useTextSelection';
import { useConversations } from '~providers/Conversations';
import { useSidebarContext } from '~providers/SidebarProvider';
import { useAppDispatch } from '~store';
import { FollowUpTypes, MessageRole } from '~utils/types';

const SideBar = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useSidebarContext();
  const { activeConversationId, pageContext, setLoadingFollowUp } =
    useConversations();
  const dispatch = useAppDispatch();
  const [hideChippy, setHideChippy] = useState(false);
  const { selectedText } = useTextSelection();
  const sidebarRef = useRef<HTMLDivElement>();
  useHideChippyOnFullscreen(setHideChippy);

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollTop = sidebarRef.current.scrollHeight;
    }
  }, [sidebarRef.current]);

  const addMessageFromCopyPaste = (content: string) => {
    dispatch(
      addMessage({
        conversationId: activeConversationId,
        content: content,
        role: MessageRole.user,
        isCopy: true,
      }),
    );
    setLoadingFollowUp(true);
    dispatch(
      generateFollowUpQuestions({
        conversationId: activeConversationId,
        type: FollowUpTypes.copy,
        context: pageContext,
      }),
    );
  };

  useEffect(() => {
    // create conversation from copy paste if sidebar open
    // to prevent too many conversations from being created
    if (selectedText && isOpen) {
      addMessageFromCopyPaste(selectedText);
    }
  }, [selectedText, isOpen]);

  return (
    <nav
      aria-label='Chippy sidebar'
      id='sidebar'
      className={`${isOpen ? 'open' : 'closed'}
      ${selectedText && !isOpen && 'selected-text'} 
      ${hideChippy ? 'hide-chippy' : ''} sidebar`}
    >
      <SidebarToggle />
      <div ref={sidebarRef} className='sidebar-wrapper'>
        {children}
      </div>
    </nav>
  );
};

export default SideBar;
