import React from 'react';

const AssistantIcon = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>Assistant</title>
      <g clipPath='url(#clip0_3_432)'>
        <rect width='24' height='24' rx='3' fill='#6D6D6D' />
        <g filter='url(#filter0_i_3_432)'>
          <rect width='24' height='24' rx='3' fill='#434343' />
          <rect
            width='24'
            height='24'
            rx='3'
            fill='url(#paint0_linear_3_432)'
            fillOpacity='0.1'
          />
        </g>
        <path
          d='M15.6 8.40503L15.6 11.85C15.6 13.8382 13.9882 15.45 12 15.45V15.45C10.0118 15.45 8.4 13.8382 8.4 11.85L8.4 6.60001C8.4 6.26864 8.66863 6.00002 9 6.00002L17.5385 6.00002C17.7934 6.00002 18 6.20665 18 6.46155L18 12C18 15.3137 15.3137 18 12 18V18C8.68629 18 6 15.3137 6 12L6 8.40503'
          stroke='white'
          strokeWidth='1.05'
          strokeLinecap='square'
        />
        <circle
          cx='10.8751'
          cy='8.47499'
          r='0.675'
          transform='rotate(-90 10.8751 8.47499)'
          fill='white'
        />
        <circle
          cx='13.1251'
          cy='8.47499'
          r='0.675'
          transform='rotate(-90 13.1251 8.47499)'
          fill='white'
        />
      </g>
      <rect
        x='0.3'
        y='0.3'
        width='23.4'
        height='23.4'
        rx='2.7'
        stroke='#4E4E4E'
        strokeWidth='0.6'
      />
      <defs>
        <filter
          id='filter0_i_3_432'
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
          <feOffset dy='0.9' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'
          />
          <feBlend
            mode='normal'
            in2='shape'
            result='effect1_innerShadow_3_432'
          />
        </filter>
        <linearGradient
          id='paint0_linear_3_432'
          x1='12'
          y1='0'
          x2='12'
          y2='24'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='white' />
          <stop offset='1' stopColor='white' stopOpacity='0' />
        </linearGradient>
        <clipPath id='clip0_3_432'>
          <rect width='24' height='24' rx='3' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AssistantIcon;
