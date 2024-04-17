import React from 'react';

const UserIcon = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>User Icon</title>
      <g clipPath='url(#clip0_3_1654)'>
        <rect width='24' height='24' rx='3' fill='#D9D9D9' />
        <rect
          width='24'
          height='24'
          rx='3'
          fill='url(#paint0_linear_3_1654)'
          fillOpacity='0.25'
        />
        <g filter='url(#filter0_i_3_1654)'>
          <rect width='24' height='24' rx='3' fill='#E1E1E1' />
          <rect
            width='24'
            height='24'
            rx='3'
            fill='url(#paint1_linear_3_1654)'
            fillOpacity='0.25'
          />
        </g>
        <path
          d='M17 17C16.1121 15.2263 14.2069 14 12 14C9.79305 14 7.88792 15.2263 7 17'
          stroke='#434343'
          strokeWidth='1.2'
        />
        <circle cx='12' cy='9' r='2.4' stroke='#434343' strokeWidth='1.2' />
      </g>
      <rect
        x='0.3'
        y='0.3'
        width='23.4'
        height='23.4'
        rx='2.7'
        stroke='#C6C6C6'
        strokeWidth='0.6'
      />
      <defs>
        <filter
          id='filter0_i_3_1654'
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
            values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'
          />
          <feBlend
            mode='normal'
            in2='shape'
            result='effect1_innerShadow_3_1654'
          />
        </filter>
        <linearGradient
          id='paint0_linear_3_1654'
          x1='12'
          y1='0'
          x2='12'
          y2='24'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='white' />
          <stop offset='1' stopColor='white' stopOpacity='0' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_3_1654'
          x1='12'
          y1='0'
          x2='12'
          y2='24'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='white' />
          <stop offset='1' stopColor='white' stopOpacity='0' />
        </linearGradient>
        <clipPath id='clip0_3_1654'>
          <rect width='24' height='24' rx='3' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default UserIcon;
