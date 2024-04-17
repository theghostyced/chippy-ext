import { type DetailedHTMLProps, type InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import CheckboxIcon from '~components/svgs/Checkbox';

const CheckboxWrapper = styled.label`
  display: flex;
  flex-direction: row;
  gap: 4px;
  text-transform: uppercase;
  align-items: center;
  font-size: 9px;
  cursor: pointer;
  color: var(--chpy-button-inactive-text);
  opacity: 0.8;

  &.checked,
  &:hover {
    opacity: 1;
    color: var(--chpy-button-active)
  }

  input[type='checkbox'] {
    display: none;
  }
`;

export function Checkbox({
  children,
  ...rest
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <CheckboxWrapper className={`${rest.checked && 'checked'}`}>
      <input type='checkbox' {...rest} />
      <CheckboxIcon checked={rest.checked} />
      {children}
    </CheckboxWrapper>
  );
}
