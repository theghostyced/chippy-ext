import styled from '@emotion/styled';

export const Wrapper = styled.ul``;

export const Item = styled.li`
  padding: var(--chpy-spacing);
  display: flex;
  align-items: center;
  height: 40px;

  p {
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
    letter-spacing: 0.02em;
  }
`;

export const Input = styled.input`
  background: var(--chpy-button-inactive);
  color: var(--chpy-button-inactive-text);
  border-radius: 16px;
  font-weight: bold;
  border: none;
  border-radius: 16px;
  letter-spacing: 0.02em;
  font-size: 9px;
  padding: 7px 10px;
  margin-left: 8px;
  &:focus {
    color: var(--chpy-button-active-text);
    background-color: var(--chpy-button-active);
  }
`;

export const Button = styled.button`
  cursor: pointer;
  background: var(--chpy-button-inactive);
  color: var(--chpy-button-inactive-text);
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  border-radius: 16px;
  letter-spacing: 0.02em;
  font-size: 9px;
  line-height: 12px;
  display: flex;
  align-items: center;
  padding: 7px 10px;
  gap: 4px;
  margin-left: 8px;
  
  &:hover {
    color: var(--chpy-button-active-text);
    background-color: var(--chpy-button-active);
  }

  &.selected {
    background: var(--chpy-button-active);
    color: var(--chpy-button-active-text);
  }
`;

export const SelectPopupWrapper = styled.div`
  position: relative;
  display: flex;

  &:hover .sub-menu,
  &:active .sub-menu,
  &.force-open .sub-menu {
    display: block !important;
  }

  ${Button} {
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
  }
`;

export const SelectPopupContainer = styled.div`
  position: absolute;
  top: 20px;
  background: var(--chpy-color-bg);
  border: 1px solid var(--chpy-color-bg-border);
  border-radius: 8px;
  overflow: hidden;
  display: none;
  z-index: 9999;

  ul {
    min-width: 150px;
  }
`;
