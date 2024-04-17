const SidebarMenuBackground = () => {
  return (
    <svg
      width='165'
      height='173'
      viewBox='0 0 165 173'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='sidebar__menu__bg'
    >
      <title>Menu Background</title>
      <g filter='url(#filter0_i_464_2121)'>
        <path
          d='M0 8C0 3.58172 3.58172 0 8 0H157C161.418 0 165 3.58172 165 8V164V171.416C165 172.3 163.899 172.705 163.327 172.031C158.996 166.936 152.646 164 145.959 164H145H8C3.58173 164 0 160.418 0 156V8Z'
          fill='#232323'
        />
      </g>
      <path
        d='M0.5 8C0.5 3.85787 3.85786 0.5 8 0.5H157C161.142 0.5 164.5 3.85786 164.5 8V164V171.416C164.5 171.835 163.979 172.026 163.708 171.708C159.282 166.501 152.793 163.5 145.959 163.5H145H8C3.85787 163.5 0.5 160.142 0.5 156V8Z'
        stroke='black'
      />
      <defs>
        <filter
          id='filter0_i_464_2121'
          x='0'
          y='0'
          width='165'
          height='172.368'
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
          <feOffset dy='2' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0'
          />
          <feBlend
            mode='normal'
            in2='shape'
            result='effect1_innerShadow_464_2121'
          />
        </filter>
      </defs>
    </svg>
  );
};

export default SidebarMenuBackground;
