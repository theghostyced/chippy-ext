import styled from '@emotion/styled';

export const Wrapper = styled.ul`
  a {
    text-decoration: none;
    color: var(--chpy-color-text);
  }
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0 var(--chpy-spacing);
  align-items: center;
  cursor: pointer;
  min-height: 40px;

  &:hover {
    background-color: var(--chpy-color-bg-hover);
  }

  p {
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
    letter-spacing: 0.02em;
  }
`;

export const List = {
  Item,
  Wrapper,
};
