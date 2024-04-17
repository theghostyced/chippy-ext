import { Divider } from '../Divider';
import { List } from '../List/List';
import styled from '@emotion/styled';
import CheckmarkIcon from '~components/svgs/CheckmarkIcon';

const MessageBox = styled.div`
  display: flex;
  column-gap: calc(var(--chpy-spacing) / 2);
  margin: 0 var(--chpy-spacing);
  margin-top: var(--chpy-message-spacing);
  align-items: center;

  ul,
  ol {
    margin-left: 11px;
  }
`;

export const MessageBoxContainer = styled.div`
  position: relative;

  .message-bubble {
    position: absolute;
    width: 32px;
    height: 32px;
    right: 25px;
    top: var(--chpy-spacing);
    z-index: 1;
    background-color: var(--chpy-button-inactive);
    border-radius: 32px;
  }

  .message-clip {
    position: absolute;
    right: 32px;
    top: calc(var(--chpy-spacing) + 9px);
    z-index: 3;

    ::before {
      position: absolute;
      width: 32px;
      height: 32px;
      right: 13px;
      top: -17px;
      z-index: 1;
      background-color: var(--chpy-color-bg-secondary);
      border-radius: 32px;
      content: "";
    }
  }
`;

export const MessageBoxAssistant = styled(MessageBox)`
  background: var(--chpy-color-bg-secondary);
  /* border: 1px solid var(--chpy-color-bg-border); */
  /* box-shadow: var(--chpy-box-shadow); */
  /* backdrop-filter: blur(8px); */
  border-radius: 8px;
  padding: 0 var(--chpy-spacing);
  z-index: 2;
  position: relative;
`;

export const MessageBoxUser = styled(MessageBox)`
  svg {
    align-self: flex-start;
  }

  .no-margin svg {
    align-self: center;
  }

  svg:not(.profile-icon) {
    margin-top: 4px;
  }

  .profile-icon {
    margin-top: 0;
    align-self: center;
  }
`;

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  scrollbar-width: none;
  height: calc(
    100vh - (var(--chpy-chat-input-height) + var(--chpy-navbar-height) + 60px)
  );
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Message = styled.div<{ align?: 'center' | 'flex-start' }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: ${(props) => props.align};
  cursor: pointer;

  &:hover {
    button {
      visibility: visible;
    }
  }

  & :first-child {
    flex-grow: 1;
  }

  > * {
    margin-bottom: var(--chpy-spacing);
  }

  > *:first-of-type {
    margin-top: var(--chpy-spacing);
  }

  .no-margin {
    margin: 0;
  }

  .button-group {
    position: absolute;
    right: 8px;

    display: flex;
    justify-content: center;
    align-items: center;
    /* flex-direction: column; */
    gap: 8px;
    margin: 0 !important;
    margin-top: ${(props) =>
      props.align === 'center' ? '' : '12px !important'};
  }

  button {
    background: var(--chpy-color-bg);
    border: none;
    visibility: hidden;
    cursor: pointer;
    margin: 0 !important;
    padding: 0;
    width: 24px;
    height: 24px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--chpy-color-text);

    :hover {
      background: var(--chpy-button-trash-hover);
      color: var(--chpy-button-trash-color, var(--chpy-color-text));
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .block.text:not(:first-child) {
    margin-top: var(--chpy-spacing);
  }

  .assisant-message li {
    margin-top: var(--chpy-spacing);
  }

  .button-margin {
    /* margin-top: 10px !important; */
  }

  // TODO: remove building logic if blinking animantion not needed
  // i.e. if gpt4 is slow
  // &.building > *:last-child:after {
  //   animation: 1s blink step-end infinite;
  //   height: 16px;
  //   width: 8px;
  //   content: "";
  //   display: inline-block;
  //   margin-left: 4px;
  //   margin-bottom: -4px;
  //   @keyframes "blink" {
  //     from,
  //     to {
  //       background-color: var(--chpy-color-text);
  //     }
  //     50% {
  //       background-color: transparent;
  //     }
  //   }
  // }
`;

export const MessageInputArea = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--chpy-color-input-gradient);
  z-index: 100;
  border-bottom-left-radius: var(--chpy-sidebar-radius);
  border-bottom-right-radius: var(--chpy-sidebar-radius);
`;

export const MessageTextarea = styled.textarea`
  background: transparent;
  border: none;
  outline: none;
  color: var(--chpy-color-text);
  padding: var(--chpy-spacing) var(--chpy-spacing) 0;
  font-size: 14px;
  resize: none;
  min-height: var(--chpy-chat-input-height);
  max-height: 200px;
  margin-bottom: 36px;
  :focus {
    border-color: var(--chpy-color-divider-bottom);
    outline-color: var(--chpy-color-divider-bottom);
  }
`;

export const MessageInputBottom = styled.div`
  position: absolute;
  bottom: 8px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 calc(var(--chpy-spacing) / 2);
`;

export const MessageInputContainer = styled.div`
  display: flex;
  gap: var(--chpy-spacing);
`;

export const MessageInputLabel = styled.label`
  display: flex;
  flex-direction: row;
  gap: 4px;
  text-transform: uppercase;
  align-items: center;
  font-size: 9px;
`;

export const MessageInputPopupWrapper = styled.div`
  position: relative;
  display: flex;
  &:hover .sub-menu,
  &:active .sub-menu,
  &.force-open .sub-menu {
    display: block !important;
  }
`;

export const MessageInputPopupContainer = styled.div`
  position: absolute;
  bottom: 25px;
  background: var(--chpy-color-bg);
  border: 1px solid var(--chpy-color-bg-border);
  border-radius: 8px;
  overflow: hidden;
  display: none;
`;

export const SidebarBottomContainer = styled.div`
  position: absolute;
  bottom: 8px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 0 var(--chpy-spacing);
  min-height: 24px;
`;

export const MessageButtonCta = styled.button`
  cursor: pointer;
  background: var(--chpy-button-active);
  color: var(--chpy-button-active-text);
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  border-radius: 16px;
  letter-spacing: 0.02em;
  font-size: 9px;
  line-height: 12px;
  display: flex;
  align-items: center;
  padding: 1px 10px;
  padding-right: 5px;

  &:hover {
    color: var(--chpy-button-active-text);
    background: var(--chpy-button-hover);
  }

  &.selected {
    background: var(--chpy-button-active);
    color: var(--chpy-button-active-text);
  }

  &.selected:hover {
    background: var(--chpy-button-hover);
  }
`;

export const MessageButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50px;
  color: var(--chpy-color-text);
  opacity: 0.2;
  align-items: center;
  display: flex;
  justify-content: center;
  border: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;

  &.active {
    background: var(--chpy-button-active);
    color: var(--chpy-button-active-text);
    opacity: 1;
  }

  &.active.flipped {
    background: var(--chpy-button-active-text);
    color: var(--chpy-button-active);
  }

  :hover {
    background: var(--chpy-button-hover);
    opacity: 1;
  }

  &.flipped:hover {
    opacity: 0.75;
    background: var(--chpy-button-active-text);
  }

  svg {
    margin-left: 3px;
  }

  &.active path {
    cursor: pointer;
    /* fill: var(--chpy-button-active-text); */
  }
`;

export const CopyToClipboardButton = styled.button`
  color: var(--chpy-color-text);
  margin-top: 10px !important;
  background: none;
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid transparent;
  padding: 2px;
  &:hover {
    border: 1px solid var(--chpy-button-inactive);
  }
`;

export const PromptText = styled.div`
  padding: var(--chpy-spacing);
  max-width: 200px;
`;

export const PromptOptionsWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

export const PromptButton = styled.button`
  color: var(--chpy-color-bg-secondary);
  border: 1px solid var(--chpy-button-border);
  background-color: transparent;
  border-radius: 22px;
  gap: 8px;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 8px 8px 8px 24px;
  cursor: pointer;
  font-weight: 900;
  line-height: unset;
  text-align: left;
  position: relative;
  text-transform: uppercase;
  &:before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: var(--chpy-color-bg-secondary);
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
    background: var(--chpy-color-bg-secondary);
    color: var(--chpy-color-text);
  }

  &.selected::before {
    background: var(--chpy-color-text);
  }
`;

export const PromptCloseButton = styled.button`
  border: 0;
  background: transparent;
  color: var(--chpy-color-bg-secondary);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 0;
  cursor: pointer;
  position: absolute;
  right: 8px;
  top: 8px;
  &:hover {
    background-color: var(--chpy-button-border);
  }
`;

export const PromptMessageContainer = styled.div`
  align-items: end;
  display: flex;
  flex-direction: column;
  padding-right: 8px;
`;

export const PromptWrapper = styled.div`
  background: var(--chpy-prompt-bg, var(--chpy-color-text));
  border-radius: 16px;
  padding: 8px;
  color: var(--chpy-prompt-color, var(--chpy-color-bg-secondary));
  margin-top: var(--chpy-spacing);
  position: relative;
  z-index: 50;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 85%;
  margin-bottom: 120px;

  .message-arrow {
    position: absolute;
    color: var(--chpy-checkbox-color-active, var(--chpy-color-text));
    bottom: -8px;
    right: 55px;
  }

  .chippy-character {
    position: absolute;
    color: var(--chpy-color-text);
    bottom: -100px;
    right: 20px;
  }

  .chippy-character:has(.window98-character) {
    right: 0px;
  }

  .chippy-character img:not(.window98-character) {
    width: 76px;
  }

  /* &.prompt--window98 {
    color: var(--chpy-color-text);
    background: var(--chpy-color-bg-secondary);
  } */

  &.prompt--window98 ${PromptButton} {
    color: var(--chpy-button-active);
    &:hover {
      color: var(--chpy-prompt-bg);
      background: var(--chpy-button-active);
    }
    &:before {
      background: var(--chpy-button-active);
    }
    &:hover:before {
      background: var(--chpy-prompt-bg);
    }
  }

  &.prompt--window98 ${PromptButton}.selected {
    color: var(--chpy-color-bg-secondary);
    background: var(--chpy-button-active);
  }

  &.prompt--window98 ${PromptButton}.selected:before {
    background: var(--chpy-color-bg-secondary);
  }

  &.prompt--window98 ${PromptCloseButton} {
    color: var(--chpy-color-text);
  }

  &.prompt--window98 .message-arrow {
    color: #ffffe1;
  }

  &.prompt--window98 .chippy-character {
    bottom: -120px;
  }
`;

export const FreePlanPromptContainer = styled.div`
  position: relative;
  cursor: pointer;

  ${MessageBoxContainer} {
    position: absolute;
    bottom: -70px;
    right: 0;
    min-width: 250px;
    display: none;
  }

  &:hover ${MessageBoxContainer} {
    display: block;
  }

  &:hover ${MessageButtonCta} {
    color: var(--chpy-button-active-text);
    background: var(--chpy-button-active);
  }

  ${MessageButtonCta} {
    padding: 8px;
    cursor: pointer;
    color: var(--chpy-free-tier-text, var(--chpy-button-inactive-text));
    background: transparent;
    border: 1px solid var(--chpy-color-bg-border);
  }

  ${PromptButton} {
    font-size: 9px;
  }

  .options-text:not(:last-child) {
    margin-bottom: var(--chpy-spacing);
  }

  .text-bg {
    color: var(--chpy-prompt-highlight);
    font-weight: bold;
  }
`;

export const FooterActivationText = styled.span`
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 9px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
  line-height: 0;
`;

export const SelectComponent = ({ value, onSelect, lists }) => {
  return (
    <List.Wrapper>
      {lists.map((list, index) => (
        <div key={list}>
          <List.Item onClick={() => onSelect(list)}>
            {list} {list === value && <CheckmarkIcon />}
          </List.Item>
          {index < lists.length - 1 && <Divider />}
        </div>
      ))}
    </List.Wrapper>
  );
};
