import {
  addMessage,
  createConversationName,
} from '~features/conversations/conversationsSlice';
import type { RootState } from '~store';
import { MessageRole } from '~utils/types';

export const checkAndUpdateConversationNameMiddleware =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    // Call the next middleware or reducer in the chain
    const result = next(action);
    // After the state has been updated, check if we need to update the conversation name
    if (action.type === addMessage.type) {
      const {
        payload: { conversationId },
      } = action;

      const storeState = getState() as RootState;

      const conversation = storeState.conversations.find(
        (conversation) => conversation.id === conversationId,
      );

      if (!conversation) {
        throw Error('No conversation found');
      }

      // Check if conversation has no name and there are both user and assistant messages
      const hasUserMessage = conversation.messages.some(
        (msg) => msg.role === MessageRole.user,
      );
      const hasAssistantMessage = conversation.messages.some(
        (msg) => msg.role === MessageRole.assistant,
      );

      if (!conversation.name && hasUserMessage && hasAssistantMessage) {
        dispatch(createConversationName({ conversationId: conversation.id }));
      }
    }

    return result;
  };
