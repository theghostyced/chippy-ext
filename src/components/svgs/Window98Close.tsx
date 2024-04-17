import React from 'react';

const Window98Close = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>Close Window 98</title>
      <g filter='url(#filter0_ii_455_3449)'>
        <rect width='24' height='24' rx='12' fill='#252525' />
        <rect width='24' height='24' rx='12' fill='#BDBDBD' />
        <path
          d='M9 15L15 8.99996'
          stroke='black'
          strokeWidth='1.2'
          strokeLinecap='square'
        />
        <path
          d='M9 9L15 15'
          stroke='black'
          strokeWidth='1.2'
          strokeLinecap='square'
        />
      </g>
      <defs>
        <filter
          id='filter0_ii_455_3449'
          x='0'
          y='0'
          width='24'
          height='24'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='1' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'
          />
          <feBlend
            mode='normal'
            in2='shape'
            result='effect1_innerShadow_455_3449'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='-1' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.482353 0 0 0 0 0.482353 0 0 0 0 0.482353 0 0 0 1 0'
          />
          <feBlend
            mode='normal'
            in2='effect1_innerShadow_455_3449'
            result='effect2_innerShadow_455_3449'
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Window98Close;
