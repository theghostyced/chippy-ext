import ButtonSend from './svgs/ButtonSend';
import { useState } from 'react';
import {
  MessageButton,
  PromptButton,
  PromptOptionsWrapper,
  PromptText,
  PromptWrapper,
} from '~components/common/Message';
import { ThemedChippyCharacter } from '~components/svgs/ChippyCharacterImage';
import MessageArrow from '~components/svgs/MessageArrow';
import { useTheme } from '~providers/ThemeProvider';
import { ThemesTypes } from '~utils/types';

export type OptionType = {
  label: string;
  value?: ThemesTypes;
  onClick: (val: string, index: number) => void;
};

export default function ForcedOptions({
  title,
  options,
  onSubmit,
}: {
  title: string;
  options: Array<OptionType>;
  onSubmit: () => void;
}) {
  const { theme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  return (
    <PromptWrapper
      style={{
        alignSelf: 'flex-end',
        marginRight: '30px',
        maxWidth: '40%',
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
      }}
      className={`prompt--${theme}`}
    >
      <PromptText style={{ paddingLeft: '4px', paddingRight: '4px' }}>
        {title}
      </PromptText>
      <PromptOptionsWrapper>
        {options.map((option, i) => (
          <PromptButton
            onClick={() => {
              setSelectedTheme(option.value);
              option.onClick(option.label, i);
            }}
            key={option.label}
            className={option.value === theme ? 'selected' : ''}
          >
            {option.label}
          </PromptButton>
        ))}
      </PromptOptionsWrapper>
      <MessageButton
        onClick={onSubmit}
        style={{
          marginTop: 'var(--chpy-spacing)',
          alignSelf: 'flex-end',
          marginRight: '8px',
        }}
        className={
          selectedTheme
            ? selectedTheme === ThemesTypes.dark ||
              selectedTheme === ThemesTypes.light
              ? 'active flipped'
              : 'active'
            : ''
        }
      >
        <ButtonSend />
      </MessageButton>
      <MessageArrow />
      <ThemedChippyCharacter />
    </PromptWrapper>
  );
}
