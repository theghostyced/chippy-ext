import React from 'react';

const ArrowRight = ({ color = 'white' }: { color?: string }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>Arrow Right</title>
      <path d='M10 8L14 12L10 16' stroke={color} strokeWidth='1.2' />
    </svg>
  );
};

export default ArrowRight;
