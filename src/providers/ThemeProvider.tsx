import React, { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { updateTheme } from '~features/settings/settingsSlice';
import { useAppSelector } from '~store';
import type { ThemeMode } from '~utils/types';

interface ThemeContextProps {
  theme: ThemeMode;
  toggleTheme: (v: ThemeMode) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextProps>(null);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = useAppSelector((state) => state.settings.theme);
  const dispatch = useDispatch();

  const toggleTheme = (newTheme: ThemeMode) => {
    dispatch(updateTheme({ theme: newTheme }));
    injectThemeClass(newTheme);
  };

  const injectThemeClass = (newTheme: ThemeMode) => {
    const baseClassname = 'chpy-theme';
    const htmlElement = document.querySelector('html');
    htmlElement.classList.remove(`${baseClassname}-${theme}`);
    htmlElement.classList.add(`${baseClassname}-${newTheme}`);
  };

  React.useEffect(() => {
    toggleTheme(theme);
  }, [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
