import styled from '@emotion/styled';
import React, { type FC } from 'react';

const StyledCheckbox = styled.input`
  visibility: hidden;
`;

const StyledCheckboxLabel = styled.label<{ checked: boolean }>`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  gap: 4px;
  font-size: 9px;
  font-weight: bold;
  line-height: 12px;
  letter-spacing: 0.02em;
  /* color: ${(props) =>
    props.checked
      ? 'var(--chpy-checkbox-color-active, var(--chpy-button-active))'
      : 'var(--chpy-color-text)'}; */
  color: var(--chpy-color-text);
  /* opacity: ${(props) => (props.checked ? 1 : 0.5)}; */

  &:hover {
    opacity: 1;
    color: var(--chpy-checkbox-color-active, var(--chpy-button-active));
  }

  &:hover .chpy-checkbox {
    border-color: var(--chpy-checkbox-color-active, var(--chpy-button-active));
  }

  input:checked ~ .chpy-checkbox {
    background: var(--chpy-button-active);
    border-color: var(--chpy-button-active);
    color: var(--chpy-checkbox-color-active, var(--chpy-button-active));
  }

  /* input:checked ~ .chpy-checkbox:after {
    display: block;
  } */

  .checkmark-icon {
    position: absolute;
    z-index: 9999;
    visibility: hidden;
  }

  .checkmark-icon--selected {
    visibility: visible;
    color: var(--chpy-button-active-text);
  }
`;

const StyledCustomCheckbox = styled.span`
  position: absolute;
  top: 1px;
  left: 0;
  height: 16px;
  width: 16px;
  background-color: transparent;
  border: 1.2px solid var(--chpy-checkbox-border, var(--chpy-color-text));
  border-radius: 4px;

  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 5px;
    bottom: 3px;
    width: 5px;
    height: 10px;
    border: solid var(--chpy-button-active-text);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

interface IProps {
  label: string;
  onClick: (newChecked: boolean) => void;
  value: boolean;
}

const CheckboxInput: FC<IProps> = ({ label, onClick, value }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onClick(event.target.checked); // Pass the new checked state to the parent component
  };

  return (
    <StyledCheckboxLabel checked={value}>
      <StyledCheckbox type='checkbox' checked={value} onChange={handleChange} />
      {label}
      <StyledCustomCheckbox className='chpy-checkbox' />
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        className={`checkmark-icon ${value && 'checkmark-icon--selected'}`}
      >
        <title>Checkmark Icon</title>
        <path
          d='M4 7.69231L6.52632 10L12 5'
          stroke='currentColor'
          strokeWidth='1.2'
        />
      </svg>
    </StyledCheckboxLabel>
  );
};

export default CheckboxInput;
