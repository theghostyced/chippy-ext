import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  UserStatus,
  type ThemeMode,
  type UserStatuses,
  ThemesTypes,
  SupportedAIModels,
} from '~utils/types';

export interface SettingsType {
  model: SupportedAIModels;
  translationLanguage: string;
  theme: ThemeMode;
  userStatus: UserStatuses;
  showChippyToggle: boolean;
}

const settingsSlice = createSlice({
  name: 'settings',

  initialState: {
    model: SupportedAIModels.gpt3,
    translationLanguage: 'Spanish', // TODO: do we want a way to check browser's default locale?
    theme: ThemesTypes.window98,
    userStatus: UserStatus.onboarding,
    showChippyToggle: true,
  } as SettingsType,

  reducers: {
    updateTranslationLanguage: (
      state,
      action: PayloadAction<{ lang: string }>,
    ) => {
      const { lang } = action.payload;
      state.translationLanguage = lang;
    },
    updateGPTModel: (
      state,
      action: PayloadAction<{ model: SupportedAIModels }>,
    ) => {
      const { model } = action.payload;
      state.model = model;
    },
    updateTheme: (state, action: PayloadAction<{ theme: ThemeMode }>) => {
      const { theme } = action.payload;
      state.theme = theme;
    },
    updateUserStatus: (
      state,
      action: PayloadAction<{ status: UserStatuses }>,
    ) => {
      const { status } = action.payload;
      state.userStatus = status;
    },
    updateShowChippyToggle: (
      state,
      action: PayloadAction<{ showChippyToggle: boolean }>,
    ) => {
      const { showChippyToggle } = action.payload;
      state.showChippyToggle = showChippyToggle;
    },
  },
});

export const {
  updateGPTModel,
  updateTranslationLanguage,
  updateTheme,
  updateUserStatus,
  updateShowChippyToggle,
} = settingsSlice.actions;

export default settingsSlice.reducer;
