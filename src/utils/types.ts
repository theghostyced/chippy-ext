export enum MessageRole {
  system = 'system',
  user = 'user',
  assistant = 'assistant',
}

export type QuestionsType = {
  questions: Array<string>;
  relevancy: 'high' | 'medium' | 'low';
  subject: string;
  type: string;
  funnyPrompt: string;
};

export type MessageType = {
  content: string;
  role: MessageRole;
  id: string;
  isCopy?: boolean;
  chippyDisabled?: boolean;
  isInstruction?: boolean;
};

export type ConversationType = {
  messages: MessageType[];
  id: string;
  name: string;
  created: string;
  chippyDisabled?: boolean;
};

export type AssistantStreamResponse = {
  message: string;
  messageId: string;
  isStreamComplete: boolean;
  isStatusMessage?: boolean;
  isOverLimitMessage?: boolean;
};

export type AssistantStreamRequest = {
  messages: MessageType[];
};

export enum SupportedAIModels {
  gpt3 = 'gpt-3.5-turbo-16k',
  gpt4 = 'gpt-4-0613',
}

export type SupportedAIModelTypes = keyof typeof SupportedAIModels;

export type Settings = {
  defaultSystem?: string;
  model: SupportedAIModels;
  temp: number;
};

export type SummaryRequest = {
  messages: MessageType[];
};

export type SummaryResponse = {
  name: string;
};

export type UserType = {
  profile?: UserInfo;
  id: string;
  isFree: boolean;
  dailyMessages: number;
  dailyMessagesGPT4: number;
  messagesToken: string;
};

export type UserInfo = {
  email: string;
  family_name: string;
  given_name: string;
  hd?: string;
  sub: string;
  language: string;
  locale: string;
  picture: string;
  name: string;
  verified_email: boolean;
};

export enum ThemesTypes {
  light = 'light',
  dark = 'dark',
  window98 = 'window98',
  glossy = 'glossy',
}

export type ThemeMode = keyof typeof ThemesTypes;

export type FollowUpRequest = {
  messages: MessageType[];
  context?: string;
};

export type FollowUpResponse = {
  result: QuestionsType;
};

export type CurrentPageRequest = {
  url: string;
  title: string;
  description?: string;
};

export type CurrentPageResponse = {
  result: QuestionsType;
};

export enum UserStatus {
  onboarding = 'onboarding',
  theme = 'theme',
  complete = 'complete',
}

export type UserStatuses = keyof typeof UserStatus;

export enum BackgroundTypes {
  ai = 'ai',
  summary = 'summary',
  icon = 'icon',
  followup = 'followup',
  pageFollowup = 'page-followup',
  login = 'login',
}

export enum ChippyTypes {
  email = 'email',
  followup = 'followup',
}

export type BackgroundMessage = {
  name: string;
  body: object;
};

export type BackgroundAIResponse = {
  name: 'ai';
  body: AssistantStreamResponse;
};

export type BackgroundFollowupResponse = {
  name: 'ai';
  body: FollowUpResponse;
};

export enum FollowUpTypes {
  copy = 'copy',
  question = 'question',
}

export type GmailThread = {
  thread_id: string;
  emails: Gmail[];
};

// see gmail-js for more fields
export type Gmail = {
  content_html: string;
  from: {
    address: string;
    name: string;
  };
  to: {
    address: string;
    name: string;
  }[];
  cc: {
    address: string;
    name: string;
  }[];
  date: string;
  subject: string;
};

export type SimplifiedEmail = {
  content_html: string;
  from: {
    address: string;
    name: string;
  };
  to: {
    address: string;
    name: string;
  }[];
  cc: {
    address: string;
    name: string;
  }[];
  date: string;
};

export type Thread = {
  subject: string;
  emails: SimplifiedEmail[];
  userEmail: string;
};
