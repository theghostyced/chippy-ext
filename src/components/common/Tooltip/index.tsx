import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { Bottom } from '~components/svgs/Tooltip';

const TooltipInside = styled.div`
  // display: none;
  position: absolute;
  height: 33px;
  width: 69px;
  bottom: -36px;
  opacity: 0;
  transition: opacity .25s ease-in-out;
  align-items: center;
  justify-content: center;
  display: flex;
  z-index: 10;
  svg {
    position: absolute;
    top: 0;
  }
`;

const TooltipWrapper = styled.div`
  position: relative;
  color: white;
  align-items: center;
  justify-content: center;
  display: flex;
  &:hover ${TooltipInside} {
    opacity: 1;
  }
`;

const TooltipText = styled.span`
  color: white;
  position: absolute;
  z-index: 10;
`;

function TooltipBottom({
  text,
  children,
}: { text: string; children: ReactNode }) {
  return (
    <TooltipWrapper>
      {children}
      <TooltipInside>
        <Bottom />
        <TooltipText>{text}</TooltipText>
      </TooltipInside>
    </TooltipWrapper>
  );
}

const Tooltip = {
  Bottom: TooltipBottom,
};

export default Tooltip;
