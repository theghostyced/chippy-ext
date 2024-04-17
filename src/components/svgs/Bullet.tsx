import { useTheme } from '~providers/ThemeProvider';

export function BulletWin98() {
  return (
    <svg
      width='8'
      height='9'
      viewBox='0 0 8 9'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>Windows 98</title>
      <circle cx='4' cy='4' r='4' fill='#355B7A' />
      <g filter='url(#filter0_di_1433_3939)'>
        <circle cx='4' cy='4' r='4' fill='#003399' />
        <circle
          cx='4'
          cy='4'
          r='4'
          fill='url(#paint0_radial_1433_3939)'
          fillOpacity='0.6'
        />
      </g>
      <defs>
        <filter
          id='filter0_di_1433_3939'
          x='0'
          y='0'
          width='9'
          height='9'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='1' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_1433_3939'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_1433_3939'
            result='shape'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dx='1' dy='1' />
          <feGaussianBlur stdDeviation='1' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'
          />
          <feBlend
            mode='normal'
            in2='shape'
            result='effect2_innerShadow_1433_3939'
          />
        </filter>
        <radialGradient
          id='paint0_radial_1433_3939'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(3 2) rotate(65.556) scale(6.04152)'
        >
          <stop stopColor='white' />
          <stop offset='1' stopColor='white' stopOpacity='0' />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function BulletFlat() {
  return (
    <svg
      width='8'
      height='8'
      viewBox='0 0 8 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>Flat</title>
      <circle cx='4' cy='4' r='4' fill='currentColor' />
    </svg>
  );
}

export function ThemedBullet() {
  const { theme } = useTheme();
  if (theme === 'window98') {
    return <BulletWin98 />;
  }
  return <BulletFlat />;
}
