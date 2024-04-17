import { nanoid } from '@reduxjs/toolkit';
// import GPT3Tokenizer from 'gpt3-tokenizer';
import {
  type ConversationType,
  type SimplifiedEmail,
  type Gmail,
  type GmailThread,
  type Thread,
} from '~utils/types';

export const generateId = () => nanoid();

// export function contextChunks(context: string): Array<string> {
//   const numChunks = Math.ceil(context.length / MAX_MODEL_TOKENS);
//   const chunks = new Array(numChunks);

//   for (let i = 0, o = 0; i < numChunks; ++i, o += MAX_MODEL_TOKENS) {
//     chunks[i] = context.substr(o, MAX_MODEL_TOKENS);
//   }
//   console.log('Got chunks', chunks);
//   return chunks;
// }

export function createDefaultConversation() {
  const defaultConversation: ConversationType = {
    id: '',
    name: '',
    created: '',
    messages: [],
  };
  return defaultConversation;
}

// export function estimateTokens(messages: ChatCompletionRequestMessage[]) {
//   const tokenizer = new GPT3Tokenizer({ type: 'gpt3' }); // or 'codex'
//   let tokenString = '';
//   messages.forEach((message) => {
//     tokenString += message.content;
//   });
//   const estimatedTokens = tokenizer.encode(tokenString).text.length;
//   return estimatedTokens;
// }

// export function prepareMessages(messages: MessageType[], context?: string) {
//   const preparedMessage: ChatCompletionRequestMessage[] = [];

//   messages.forEach((message) => {
//     preparedMessage.push({
//       role: message.role,
//       content: message.content,
//     });
//   });

//   if (context) {
//     const contextContent = `Use the provided articles delimited by triple quotes to answer questions. If the answer cannot be found in the articles, write "I could not find an answer."`;

//     preparedMessage.push({
//       role: MessageRole.system,
//       content: contextContent,
//     });

//     preparedMessage.push({
//       role: MessageRole.system,
//       content: `"""${context}"""`,
//     });
//   }

//   let estimatedTokens = estimateTokens(preparedMessage);
//   // Trim user messages until our model is under the max tokens
//   while (estimatedTokens > MAX_MODEL_TOKENS) {
//     preparedMessage.splice(1, 1);
//     estimatedTokens = estimateTokens(preparedMessage);
//   }

//   return preparedMessage;
// }

export function extractText(doc: Document): string {
  const texts: string[] = [];
  const clonedBody = doc.body.cloneNode(true) as HTMLElement;

  Array.from(
    clonedBody.querySelectorAll(
      'style,svg,script,img,iframe,*[aria-hidden="true"]',
    ),
  ).forEach((el: Element) => el.remove());

  function visitNode(node: Node) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent) {
      texts.push(node.textContent.trim());
      return;
    }

    if (node.hasChildNodes()) {
      Array.from(node.childNodes).forEach(visitNode);
    }
  }

  visitNode(clonedBody);

  // Remove all extra whitespace and newlines
  const text = texts.join('\n\n').replace(/\s\s+/g, ' ');
  return text;
}

export function strippedEmails(emails: Gmail[]): {
  emails: SimplifiedEmail[];
  subject: string;
} {
  const simplifiedEmails = emails.map((email) => {
    // Replace all HTML tags with an empty string
    const noHtmlContent = email.content_html?.replace(/<[^>]+>/g, '');

    // Replace carriage return characters with newline characters
    const normalizedNewlinesContent = noHtmlContent?.replace(/\r/g, '\n');

    // Replace sequences of multiple newline characters with a single newline character
    const content_html = normalizedNewlinesContent?.replace(/\n+/g, '\n');

    return {
      content_html,
      from: email.from,
      to: email.to.map((to) => to),
      cc: email.cc.map((cc) => cc),
      date: email.date,
    };
  });

  const subject = emails[0].subject;

  return { emails: simplifiedEmails, subject };
}

export const generateThreadFromSession = (): Thread | null => {
  const emailThreadString = sessionStorage.getItem('emailThread');
  const userEmail = sessionStorage.getItem('userEmail');

  if (emailThreadString) {
    const emailThread: GmailThread = JSON.parse(emailThreadString);
    const strippedThread = strippedEmails(emailThread.emails);
    const thread: Thread = {
      emails: strippedThread.emails,
      subject: strippedThread.subject,
      userEmail,
    };
    return thread;
  }

  return null;
};
