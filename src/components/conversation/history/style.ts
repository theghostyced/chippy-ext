import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const HistoryLink = styled(Link)`
  & :hover button {
    visibility: visible;
  }
`;

export const HistoryCTAWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    background: none;
    border: none;
    visibility: hidden;
    cursor: pointer;
    margin-top: 3px;
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
`;
