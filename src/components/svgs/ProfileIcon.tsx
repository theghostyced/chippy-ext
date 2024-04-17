import React from 'react';

const ProfileIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <title>Profile Icon</title>
      <rect width='24' height='24' rx='12' fill='var(--chpy-profile-bg)' />
      <path
        d='M17 17C16.1121 15.2263 14.2069 14 12 14C9.79305 14 7.88792 15.2263 7 17'
        stroke='var(--chpy-profile-color)'
        strokeWidth='1.2'
      />
      <circle
        cx='12'
        cy='9'
        r='2.4'
        stroke='var(--chpy-profile-color)'
        strokeWidth='1.2'
      />
    </svg>
  );
};

export default ProfileIcon;
