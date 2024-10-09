import React, { createContext, useContext, useState, useEffect } from 'react';
import { Colors, getColorScheme, setColorScheme as updateColorScheme } from '../styles/Colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(Colors.MainTheme);

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
