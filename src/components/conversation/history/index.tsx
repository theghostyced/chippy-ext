import { HistoryCTAWrapper, HistoryLink } from './style';
import React from 'react';
import { Divider } from '~components/common/Divider';
import { List } from '~components/common/List/List';
import SidebarSkeleton from '~components/common/sidebar/SidebarSkeleton';
import TrashIcon from '~components/svgs/TrashIcon';
import { deleteConversation } from '~features/conversations/conversationsSlice';
import { useConversations } from '~providers/Conversations';
import { useAppSelector, useAppDispatch } from '~store';
import type { ConversationType } from '~utils/types';

const ConversationList = () => {
  const conversations: ConversationType[] = useAppSelector(
    (state) => state.conversations,
  );
  const dispatch = useAppDispatch();
  if (!conversations) return null;
  const { setActiveConversationId } = useConversations();

  // filter non named conversations
  // note: named convos are persisted to storage,
  // non-named are not but are still in local state (see convo transform)
  const namedConversations = conversations.filter(
    (conversation) => conversation.name,
  );

  const sortedConversations = [...namedConversations].sort((a, b) =>
    b.created.localeCompare(a.created),
  );

  const removeConversation = (
    e: React.MouseEvent,
    conversationId: ConversationType['id'],
  ) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deleteConversation({ conversationId }));
  };

  return (
    <SidebarSkeleton>
      <List.Wrapper>
        {sortedConversations.map((conversation) => (
          <React.Fragment key={conversation.id}>
            <HistoryLink
              key={conversation.id}
              onClick={() => setActiveConversationId(conversation.id)}
              to='/conversations/current'
            >
              <List.Item>
                <p>{conversation.name}</p>

                <HistoryCTAWrapper>
                  <button
                    type='button'
                    onClick={(e) => removeConversation(e, conversation.id)}
                    aria-label='conversation remove button'
                  >
                    <TrashIcon />
                  </button>
                </HistoryCTAWrapper>
              </List.Item>
              <Divider />
            </HistoryLink>
          </React.Fragment>
        ))}
      </List.Wrapper>
    </SidebarSkeleton>
  );
};

export default ConversationList;
