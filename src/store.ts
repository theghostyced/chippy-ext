import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  RESYNC,
  persistReducer,
  persistStore,
} from '@plasmohq/redux-persist';
import { Storage } from '@plasmohq/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { localStorage } from 'redux-persist-webextension-storage';
import autoMergeLevel2 from '@plasmohq/redux-persist/lib/stateReconciler/autoMergeLevel2';
import conversationsSlice from '~features/conversations/conversationsSlice';
import { checkAndUpdateConversationNameMiddleware } from '~features/conversations/middlewareConversation';
// import { filterNotNamedConversations } from '~features/conversations/transformConversations';
import settingsSlice from '~features/settings/settingsSlice';
import usersSlice from '~features/user/userSlice';
import { MASTER_STORAGE_KEY } from '~utils/constants';

const combinedReducers = combineReducers({
  conversations: conversationsSlice,
  user: usersSlice,
  settings: settingsSlice,
});

const persistConfig = {
  key: MASTER_STORAGE_KEY,
  version: 1,
  storage: localStorage,
  stateReconciler: autoMergeLevel2, // merge states two levels deep, instead of 1
  // transforms: [filterNotNamedConversations], // TODO: figure out why this breaking
};

// TODO: Fix persistReducer so it doesn't break the types
const persistedReducer = persistReducer(persistConfig, combinedReducers);

// Until persistReducer is fixed, we need to use this mock store to get the types
const mockStore = configureStore({
  reducer: combinedReducers,
});

export type Store = typeof mockStore;

// @ts-ignore
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          RESYNC,
        ],
      },
      thunk: true,
    }).concat(checkAndUpdateConversationNameMiddleware), // Add your custom middleware
}) as Store;

export const persistor = persistStore(store);

// This is what makes Redux sync properly with multiple pages
// Open your extension's options page and popup to see it in action
new Storage({ area: 'local' }).watch({
  [`persist:${persistConfig.key}`]: () => {
    persistor.resync();
  },
});

// Get the types from the mock store
export type RootState = ReturnType<typeof mockStore.getState>;
export type AppDispatch = typeof mockStore.dispatch;

// Export the hooks with the types from the mock store
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
