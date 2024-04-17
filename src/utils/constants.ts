import { SupportedAIModels, type Settings } from '~utils/types';

export const DEFAULT_SETTINGS: Settings = {
  temp: 1.2,
  model: SupportedAIModels.gpt3,
};

export const MASTER_STORAGE_KEY = 'root-v2';
export const CONVERSATION_STORAGE_KEY = 'conversation_testing_a'; // test key for now until structure more down
export const AI_API_STORAGE_KEY = 'ai_key_storage';
export const AI_MODEL_STORAGE_KEY = 'ai_model';
export const THEME_STORAGE_KEY = 'chpy-theme-key';

export const FREE_MESSAGE_LIMIT = 20;
export const PAID_MESSAGE_LIMIT_GPT3 = 100;
export const PAID_MESSAGE_LIMIT_GPT4 = 12;

export const MAX_MODEL_TOKENS = 16000;
export const DEFAULT_OPENAI_MODEL = 'gpt-3.5-turbo-16k';
// todo: switch to env variable
// export const SITE_URL = 'http://localhost:3000';
export const SITE_URL = process.env.PLASMO_PUBLIC_SITE_URL;
// export const SITE_URL = 'https://chippy-api.nunn.ink';
// export const SITE_URL = 'https://chippyai.com';

export const API_URL = `${SITE_URL}/api`;
// export const API_URL = 'https://chippyai.com/api';

export const languages = [
  'Arabic',
  'Bengali',
  'English',
  'Hindi',
  'Japanese',
  'Chinese',
  'Portuguese',
  'Punjabi',
  'Russian',
  'Spanish',
];
