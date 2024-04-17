export default function Checkbox({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title>Checkbox checked</title>
        <rect
          x='0.6'
          y='0.6'
          width='14.8'
          height='14.8'
          rx='3.4'
          fill='currentColor'
          stroke='currentColor'
          strokeWidth='1.2'
        />
        <path
          d='M4 7.69231L6.52632 10L12 5'
          stroke='var(--chpy-color-bg)'
          strokeWidth='1.2'
        />
      </svg>
    );
  }

  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
      <title>Checkbox empty</title>
      <rect
        x='0.6'
        y='0.6'
        width='14.8'
        height='14.8'
        rx='3.4'
        stroke='currentColor'
        strokeWidth='1.2'
      />
    </svg>
  );
}
