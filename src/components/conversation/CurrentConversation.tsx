// import Upgrade from "./Upgrade";
import React from 'react';
import { MessageInputArea } from '~components/common/Message';
import SidebarSkeleton from '~components/common/sidebar/SidebarSkeleton';
import ChippyPickTheme from '~components/conversation/ChippyPickTheme';
import Conversation from '~components/conversation/Conversation';
import MessageInput from '~components/conversation/MessageInput';
import useFollowUpPortMessages from '~hooks/useFollowUpPortMesages';
import useMailPortMessages from '~hooks/useMailPortMessage';
import { useConversations } from '~providers/Conversations';
// import { useSidebarContext } from "~providers/SidebarProvider";
import { useAppSelector } from '~store';
import { UserStatus } from '~utils/types';

function CurrentConversation() {
  const { activeConversationId, conversation } = useConversations();
  // const { overLimitVisible } = useSidebarContext();
  const userStatus = useAppSelector((state) => state.settings.userStatus);
  const isOnboarding = userStatus && userStatus === UserStatus.onboarding;

  useFollowUpPortMessages();
  useMailPortMessages(activeConversationId);
  return (
    <SidebarSkeleton>
      <div className='conversations'>
        {conversation && <Conversation />}
        {/* {overLimitVisible && <Upgrade />} */}
        {/* can eventually remove `conversation` but i want this to obviously broken if not */}
      </div>
      {conversation && (
        <MessageInputArea>
          {isOnboarding && <ChippyPickTheme />}
          <MessageInput
            conversationId={activeConversationId}
            disabled={false}
          />
        </MessageInputArea>
      )}
    </SidebarSkeleton>
  );
}

export default CurrentConversation;
