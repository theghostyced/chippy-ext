import DOMPurify from 'dompurify';
import highligher from 'highlight.js';
import { marked } from 'marked';
import React from 'react';
import type { MessageType } from '~utils/types';

const renderMarkdownContent = (message: MessageType) => {
  const renderer = {
    code(code, infostring) {
      const language = highligher.getLanguage(infostring)
        ? infostring
        : 'plaintext';
      const higlighted = highligher.highlight(code.toString(), {
        language,
      }).value;

      return `
        <pre style="whitespace: pre-wrap">
          <code class="hljs">${higlighted}</code>
        </pre>
      `;
    },

    paragraph(text) {
      return `<p class='block text'>${text}</p>`;
    },
  };

  marked.use({ renderer });
  const html = marked.parse(message.content, {
    mangle: false,
    headerIds: false,
  });
  const cleanHtml = DOMPurify.sanitize(html);

  // rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};

export default renderMarkdownContent;
