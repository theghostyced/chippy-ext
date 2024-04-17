import {
  PromptButton,
  PromptCloseButton,
  PromptOptionsWrapper,
  PromptText,
  PromptWrapper,
} from '~components/common/Message';
import { ThemedChippyCharacter } from '~components/svgs/ChippyCharacter';
import Close from '~components/svgs/Close';
import MessageArrow from '~components/svgs/MessageArrow';
import { useTheme } from '~providers/ThemeProvider';

export type OptionType = {
  label: string;
  onClick: (val: string, index: number) => void;
};

export default function Options({
  title,
  options,
  onClose,
  showChippyCharacter = true,
}: {
  title: string | JSX.Element;
  options?: Array<OptionType>;
  onClose?: () => void;
  showChippyCharacter?: boolean;
}) {
  const { theme } = useTheme();
  return (
    <PromptWrapper className={`prompt--${theme}`}>
      <PromptText>
        {title}
        {onClose && (
          <PromptCloseButton onClick={() => onClose()}>
            <Close />
          </PromptCloseButton>
        )}
      </PromptText>
      {options && (
        <PromptOptionsWrapper>
          {options.map((option, i) => (
            <PromptButton
              onClick={() => option.onClick(option.label, i)}
              key={option.label}
            >
              {option.label}
            </PromptButton>
          ))}
        </PromptOptionsWrapper>
      )}
      <MessageArrow />
      {showChippyCharacter && <ThemedChippyCharacter />}
    </PromptWrapper>
  );
}
