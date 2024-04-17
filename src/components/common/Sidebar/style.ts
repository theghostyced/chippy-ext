import styled from '@emotion/styled';

export const SidebarTop = styled.div`
  position: sticky;
  top: 0;
  background: var(--chpy-navbar-bg);
  z-index: 10;
  border-top-left-radius: calc(var(--chpy-sidebar-radius) - 1px);
  border-top-right-radius: calc(var(--chpy-sidebar-radius) - 1px);
  height: var(--chpy-navbar-height);
`;

export const UpgradeAlertMessage = styled.div`
  padding: 10px;
  color: var(--chpy-prompt-color, var(--chpy-color-bg-secondary));
`;

export const UpgradeButton = styled.div`
  cursor: pointer;
  font-weight: bold;
  color: var(--chpy-button-active-text);
  background-color: var(--chpy-button-active);
  border: none;
  border-radius: 16px;
  letter-spacing: 0.02em;
  font-size: 14px;
  line-height: 12px;
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
  margin: 0 10px;

  &:hover {
    background-color: var(--chpy-button-inactive-text);
  }
`;

interface SidebarContainerProps {
  height: number;
}

export const SidebarContainer = styled.div<SidebarContainerProps>`
  margin-top: ${(props) => props.height}px;
`;
