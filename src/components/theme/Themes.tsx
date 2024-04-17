import React from 'react';
import { Divider } from '~components/common/Divider';
import { List } from '~components/common/List/List';
import SidebarSkeleton from '~components/common/sidebar/SidebarSkeleton';
import CheckmarkIcon from '~components/svgs/CheckmarkIcon';
import { useTheme } from '~providers/ThemeProvider';
import { ThemesTypes } from '~utils/types';

const Themes = () => {
  const { toggleTheme, theme } = useTheme();
  return (
    <SidebarSkeleton>
      <div className='themes'>
        <List.Wrapper>
          <List.Item onClick={() => toggleTheme(ThemesTypes.light)}>
            <span>Light Mode</span>
            {theme === ThemesTypes.light && <CheckmarkIcon />}
          </List.Item>
          <Divider />
          <List.Item onClick={() => toggleTheme(ThemesTypes.dark)}>
            <span>Dark Mode</span>
            {theme === ThemesTypes.dark && <CheckmarkIcon />}
          </List.Item>
          <Divider />
          <List.Item onClick={() => toggleTheme(ThemesTypes.window98)}>
            <span>Windows 98</span>
            {theme === ThemesTypes.window98 && <CheckmarkIcon />}
          </List.Item>
          <Divider />
          <List.Item onClick={() => toggleTheme(ThemesTypes.glossy)}>
            <span>Glossy</span>
            {theme === ThemesTypes.glossy && <CheckmarkIcon />}
          </List.Item>
          <Divider />
        </List.Wrapper>
      </div>
    </SidebarSkeleton>
  );
};

export default Themes;
