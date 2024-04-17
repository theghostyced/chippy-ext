import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

const LoadingWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  height: auto;
`;

const loadingDots = keyframes`
      0% {
    opacity: 0.2;
  }

  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
`;

const LoadingBall = styled.span`
  animation-name: ${loadingDots};
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--chpy-inlinepromot-msgtext);
  display: inline-block;
  margin: 0 1px;

  &:nth-of-type(2) {
    animation-delay: 0.2s;
  }

  &:nth-of-type(3) {
    animation-delay: 0.4s;
  }
`;

const Loading = () => {
  return (
    <LoadingWrapper>
      <LoadingBall />
      <LoadingBall />
      <LoadingBall />
    </LoadingWrapper>
  );
};

export default Loading;
