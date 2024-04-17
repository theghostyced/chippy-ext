import Loading from '../Loading/Loading';
import {
  InlinePromptHeader,
  InlinePromptNeedHelp,
  InlinePromptNeedHelpWrapper,
  InlinePromptOptionButton,
  InlinePromptOptionsWrapper,
  InlinePromptWrapper,
} from './styles';
import DOMPurify from 'dompurify';
import React, { useEffect, useRef } from 'react';
import { ThemedChippyCharacter } from '~components/svgs/ChippyCharacter';
import { useTheme } from '~providers/ThemeProvider';

const InlinePromptArrow = () => (
  <svg
    width='15'
    height='22'
    viewBox='0 0 15 22'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <title>Inline Prompt Arrow</title>
    <path d='M87.1621 -10C91.5804 -10 95.1621 -6.41828 95.1621 -2L95.1621 14C95.1621 18.4183 91.5804 22 87.1621 22L15 22L7.41274 22C6.52204 22 6.07578 20.9233 6.70532 20.2932L7.978 19.0194C12.4743 14.5192 15 8.41786 15 2.0563L15 -2C15 -6.41828 18.5817 -10 23 -10L87.1621 -10Z' />
  </svg>
);

export type InlineOptionType = {
  label: string;
  onClick: (val: string, index: number) => void;
};

interface IProps {
  title?: string;
  options: Array<InlineOptionType>;
}

// A function to sort our options so the longest option is
// always in the middle
function sortOptions(options) {
  const newOptions = [...options].sort((a, b) => {
    return a.label.length - b.label.length;
  });
  if (newOptions.length === 3) {
    return [newOptions[0], newOptions[2], newOptions[1]];
  }
  return newOptions;
}

export const InlineOptions = ({ title, options }: IProps) => {
  const { theme } = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const headElement = wrapperRef.current.children.item(0);
    const centerElement = wrapperRef.current.children.item(1);
    const tailElement = wrapperRef.current.children.item(2);

    if (!headElement) {
      return;
    }

    if (centerElement.clientWidth - 8 <= headElement.clientWidth) {
      headElement.classList.add('rounded');
      centerElement.classList.add('flat-corner');
    }
    if (
      tailElement &&
      centerElement.clientWidth - 8 <= tailElement.clientWidth
    ) {
      tailElement.classList.add('rounded');
      centerElement.classList.add('flat-corner');
    }
  }, [wrapperRef.current]);
  return (
    <InlinePromptWrapper className={`prompt--${theme}`}>
      <InlinePromptHeader>
        <ThemedChippyCharacter />

        <InlinePromptNeedHelpWrapper>
          <InlinePromptArrow />
          <InlinePromptNeedHelp>{title || 'Need help?'}</InlinePromptNeedHelp>
        </InlinePromptNeedHelpWrapper>
      </InlinePromptHeader>

      <InlinePromptOptionsWrapper ref={wrapperRef} id='inline-prompt-wrapper'>
        {sortOptions(options).map((option, i) => (
          <InlinePromptOptionButton
            onClick={() => option.onClick(option.label, i)}
            key={option.label}
            // rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            // rome-ignore lint/security/noDangerouslySetInnerHtmlWithChildren: <explanation>
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(option.label),
            }}
          />
        ))}
      </InlinePromptOptionsWrapper>
    </InlinePromptWrapper>
  );
};

export const ChippyInlineLoading = () => {
  const { theme } = useTheme();

  return (
    <InlinePromptWrapper className={`prompt--${theme}`}>
      <InlinePromptHeader>
        <ThemedChippyCharacter />

        <InlinePromptNeedHelpWrapper>
          <InlinePromptArrow />
          <InlinePromptNeedHelp>
            <Loading />
          </InlinePromptNeedHelp>
        </InlinePromptNeedHelpWrapper>
      </InlinePromptHeader>
    </InlinePromptWrapper>
  );
};
