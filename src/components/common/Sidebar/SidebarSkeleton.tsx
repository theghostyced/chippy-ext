import { Divider } from '../Divider';
import React from 'react';
import SidebarHeader from '~components/common/sidebar/SidebarHeader';
import { SidebarTop } from '~components/common/sidebar/style';

const SidebarSkeleton = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarTop>
        <SidebarHeader />
        <Divider />
      </SidebarTop>

      <>{children}</>
    </>
  );
};

export default SidebarSkeleton;
