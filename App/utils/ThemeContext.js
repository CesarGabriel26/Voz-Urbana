import React, { createContext, useContext, useState, useEffect } from 'react';
import { getColorScheme, setColorScheme as updateColorScheme } from '../styles/Colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState({
    textPrimary: '#000000',
    textSecondary: '#FFFFFF',

    title: '#0A62AC',

    background: '#FFFFFF',
    backgroundInverse: '#000000',
    panelBackground: '#0A62AC',

    buttonPrimary: '#0A62AC',
    buttonSecondary: '#FFFFFF',
  });

  const loadColorScheme = async () => {
    const scheme = await getColorScheme();
    setColorScheme(scheme);
  };

  useEffect(() => {
    loadColorScheme();
  }, []);

  const changeTheme = (theme) => {
    updateColorScheme(theme);
    loadColorScheme();
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
