import { sendToBackground } from '@plasmohq/messaging';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser } from '~features/user/userSlice';
import { type RootState } from '~store';
import { createDefaultConversation, generateId } from '~utils/conversation';

import {
  MessageRole,
  type ConversationType,
  type MessageType,
  FollowUpTypes,
  type Thread,
} from '~utils/types';

export interface CreateConversation {
  conversationId: string;
}

export interface AddUserMessage {
  conversationId: string;
  content: MessageType['content'];
  role: MessageRole;
  isCopy?: boolean;
  isInstruction?: boolean;
}

export interface SubmitConversation {
  conversationId: string;
  context?: string;
  thread?: Thread;
}

export interface SubmitEmail {
  conversationId: string;
  thread: Thread;
}

export interface GenerateFollowUp {
  conversationId: string;
  context?: string;
  type: FollowUpTypes;
}

export interface GenerateCurrentPageSuggestions {
  url: string;
  title: string;
  description?: string;
}

export const submitConversation = createAsyncThunk(
  'conversations/submitConversation',
  async (payload: SubmitConversation, thunkAPI) => {
    const { conversationId, context, thread } = payload;
    if (!conversationId) {
      throw Error('No conversation ID provided');
    }
    const storeState = thunkAPI.getState() as RootState;
    const conversation = storeState.conversations.find(
      (conversation) => conversation.id === conversationId,
    );
    const userModel = storeState.settings.model;
    thunkAPI.dispatch(fetchUser());
    sendToBackground({
      name: 'ai',
      body: {
        messages: conversation.messages,
        context: context,
        userModel: userModel,
        thread,
      },
    });
  },
);

export const generateFollowUpQuestions = createAsyncThunk(
  'conversations/generateFollowUpQuestions',
  async (payload: GenerateFollowUp, thunkAPI) => {
    const { conversationId, context, type } = payload;
    if (!conversationId) {
      throw Error('No conversation ID provided');
    }
    const storeState = thunkAPI.getState() as RootState;
    const conversation = storeState.conversations.find(
      (conversation) => conversation.id === conversationId,
    );
    sendToBackground({
      name: 'followup',
      body: {
        messages: conversation.messages,
        context: context,
        type: type,
      },
    });
  },
);

export const generateCurrentPageQuestions = createAsyncThunk(
  'conversations/generateCurrentPageQuestions',
  async (payload: GenerateCurrentPageSuggestions, _thunkAPI) => {
    const { url, title, description } = payload;
    sendToBackground({
      name: 'currentPage',
      body: {
        url,
        title,
        description,
      },
    });
  },
);

export const submitGenerateEmailQuestion = createAsyncThunk(
  'conversations/submitConversation',
  async (payload: SubmitEmail, _thunkAPI) => {
    const { conversationId, thread } = payload;
    if (!conversationId) {
      throw Error('No conversation ID provided');
    }
    // const storeState = thunkAPI.getState() as RootState;
    // const conversation = storeState.conversations.find(
    //   (conversation) => conversation.id === conversationId,
    // );
    // const userModel = storeState.settings.model;
    // thunkAPI.dispatch(fetchUser());
    sendToBackground({
      name: 'email',
      body: {
        thread: thread,
      },
    });
  },
);

// this should only be called via a middleWare
export const createConversationName = createAsyncThunk(
  'conversations/createConversationName',
  async ({ conversationId }: { conversationId: string }, thunkAPI) => {
    const storeState = thunkAPI.getState() as RootState;
    const conversation = storeState.conversations.find(
      (conversation) => conversation.id === conversationId,
    );

    if (!conversation) {
      throw Error('No conversation found');
    }

    if (conversation.name) {
      throw Error('Conversation already named');
    }

    const resp = await sendToBackground({
      name: 'summary',
      body: {
        messages: conversation.messages,
      },
    });
    thunkAPI.dispatch(fetchUser());
    thunkAPI.dispatch(
      updateConversationName({ conversationId, name: resp.name }),
    );
  },
);

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: [] as ConversationType[],
  reducers: {
    addMessage: (state, action: PayloadAction<AddUserMessage>) => {
      const { conversationId, content, role, isCopy, isInstruction } =
        action.payload;
      const index = state.findIndex(
        (conversation) => conversation.id === conversationId,
      );
      if (index === -1) {
        throw Error('No conversation found');
      }
      // If this is the second message in the conversation, set the date created
      if (state[index]?.messages?.length === 1) {
        state[index].created = new Date().toISOString();
      }
      state[index].messages.push({
        content: content,
        role: role,
        id: generateId(),
        isCopy,
        isInstruction,
      });
    },
    createConversation: (state, action: PayloadAction<CreateConversation>) => {
      const { conversationId } = action.payload;
      const conversation = createDefaultConversation();
      conversation.id = conversationId;
      conversation.created = new Date().toISOString();
      state.push(conversation);
    },
    updateConversationName: (
      state,
      action: PayloadAction<{
        conversationId: ConversationType['id'];
        name: string;
      }>,
    ) => {
      const { conversationId, name } = action.payload;
      const conversation = state.find(
        (conversation) => conversation.id === conversationId,
      );
      if (conversation) {
        conversation.name = name;
      }
    },
    updateConversationChippyStatus: (
      state,
      action: PayloadAction<{
        conversationId: ConversationType['id'];
        chippyDisabled: boolean;
      }>,
    ) => {
      const { conversationId, chippyDisabled } = action.payload;
      const conversation = state.find(
        (conversation) => conversation.id === conversationId,
      );
      if (conversation) {
        conversation.chippyDisabled = chippyDisabled;
      }
    },
    deleteConversation: (
      state,
      action: PayloadAction<{ conversationId: ConversationType['id'] }>,
    ) => {
      const { conversationId } = action.payload;
      return state.filter((conversation) => conversationId !== conversation.id);
    },
    deleteMessage: (
      state,
      action: PayloadAction<{
        conversationId: ConversationType['id'];
        messageId: string;
      }>,
    ) => {
      const { conversationId, messageId } = action.payload;
      const conversation = state.find(
        (conversation) => conversation.id === conversationId,
      );
      if (!conversation) {
        throw Error('No conversation found in deleteMessage');
      }
      const messageIndex = conversation.messages.findIndex(
        (message) => message.id === messageId,
      );
      if (messageIndex !== -1) {
        conversation.messages.splice(messageIndex, 1);
      }
    },
  },
});

export const {
  createConversation,
  addMessage,
  updateConversationName,
  deleteConversation,
  updateConversationChippyStatus,
  deleteMessage,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
