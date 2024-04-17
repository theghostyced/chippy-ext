import styled from '@emotion/styled';

export const InlinePromptHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  gap: 4px;
`;

export const InlinePromptNeedHelpWrapper = styled.div`
  position: relative;
  min-width: 100px;
  /* min-height: 40px; */
  padding: 12px 14px;
  margin-top: 4px;
  background: var(--chpy-inlineprompt-bg);
  color: var(--chpy-inlineprompt-color);
  border-radius: calc(var(--chpy-spacing) / 2);
  border-bottom-left-radius: 0;
  align-self: baseline;

  .chippy-character svg,
  .chippy-character img {
    width: 65px;
  }

  svg {
    position: absolute;
    left: -14px;
    bottom: 0;
  }

  svg path {
    fill: var(--chpy-inlineprompt-bg);
  }
`;

export const InlinePromptNeedHelp = styled.p`
  text-align: center;
  font-size: 11px;
  font-weight: bold;
  line-height: normal;
  letter-spacing: -0.22px;
`;

export const InlinePromptOptionsWrapper = styled.div`
  margin: 0 var(--chpy-spacing);

  button:first-child {
    border-radius: 8px;
    max-width: 80%;
    border-bottom-right-radius: 0;
    // border-bottom-width: 0px;
  }

  button:last-child {
    border-radius: 8px;
    max-width: 90%;
    border-top-right-radius: 0;
    // border-top-width: 0px;
  }

  button:not(:last-child) {
    border-bottom-left-radius: 0;
  }

  button:not(:first-child) {
    border-top-left-radius: 0;
  }
`;

export const InlinePromptOptionButton = styled.button`
  color: var(--chpy-inlinepromot-msgtext);
  border: 1px solid var(--chpy-inlineprompt-border);
  background-color: transparent;
  border-radius: 16px;
  gap: 8px;
  display: block;
  align-items: center;
  flex-direction: row;
  padding: 8px 8px 8px 24px;
  cursor: pointer;
  font-weight: 500;
  line-height: unset;
  text-align: left;
  font-size: 11px;
  position: relative;
  margin-bottom: -1px;

  &:before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: var(--chpy-button-active);
    position: absolute;
    left: 8px;
    top: 12px;
  }
  &:hover:before {
    background-color: var(--chpy-color-text);
  }
  &:hover {
    background-color: var(--chpy-color-bg-secondary);
    color: var(--chpy-color-text);
  }

  &.selected {
    background: var(--chpy-button-active);
    color: var(--chpy-button-active-text);
  }

  &.flat-corner,
  &.rounded {
    border-top-right-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
  }

  &.selected::before {
    background: var(--chpy-color-text);
  }
`;

export const InlinePromptWrapper = styled.div`
  margin: 0 var(--chpy-spacing);
  margin-top: 24px;
  margin-left: 7px;

  .window98-character {
    width: 70px;
  }

  .chippy-character svg {
    width: 50px;
    margin-right: 12px;
    margin-left: 6px;
  }
`;
