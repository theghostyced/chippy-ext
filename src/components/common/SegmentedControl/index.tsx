import styled from '@emotion/styled';
import { useTheme } from '~providers/ThemeProvider';

export const SegmentedControlWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SegmentedControlItem = styled.button`
  font-size: 9.3px;
  font-weight: 600;
  padding: 6px 10px;
  background: var(--chpy-button-inactive);
  color: var(--chpy-button-inactive-text);
  border: 0;
  cursor: pointer;
  text-transform: uppercase;
  &.segmented-item--window98 {
    background: color-mix(in srgb, var(--chpy-button-inactive) 50%, transparent);
  }
  &.segmented-item--glossy {
    background: rgba(0,0,0, 0.1);
    color: var(--chpy-navbar-color-text);
  }
  &:first-of-type {
    border-radius: 10px 0 0 10px;
  }
  &:last-of-type {
    border-radius: 0 10px 10px 0;
  }
  &.selected {
    background: var(--chpy-button-active);
    color: var(--chpy-button-active-text);
  }
`;

export function SegmentedControl({
  items,
  selected,
}: {
  items: Array<{
    title: string;
    toolTip: string;
    onClick: () => void;
  }>;
  selected: number;
}) {
  const { theme } = useTheme();
  return (
    <SegmentedControlWrapper className={`segmented--${theme}`}>
      {items.map((item, i) => (
        <SegmentedControlItem
          className={`${selected === i && 'selected'} segmented-item--${theme}`}
          key={item.title}
          type='button'
          title={item.toolTip}
          onClick={item.onClick}
        >
          {item.title}
        </SegmentedControlItem>
      ))}
    </SegmentedControlWrapper>
  );
}
