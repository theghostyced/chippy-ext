import { createTransform } from '@plasmohq/redux-persist';

export const filterNotNamedConversations = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, _key) => {
    // Check each conversation in the state
    return inboundState
      .map((conversation) => {
        if (conversation.name) {
          // If conversation has a name, include it in the state to be persisted
          return conversation;
        } else {
          // If conversation doesn't have a name, return null
          return null;
        }
      })
      .filter(Boolean); // filter out null values
  },
  // transform state being rehydrated
  (outboundState, _key) => {
    return outboundState;
  },
  // define which reducers this transform gets called for.
  { whitelist: ['conversations'] },
);
