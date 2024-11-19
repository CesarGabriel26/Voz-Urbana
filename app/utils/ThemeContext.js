import React, { createContext, useContext, useState, useEffect } from 'react';
import { Colors, getColorScheme, setColorScheme as updateColorScheme } from '../styles/Colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(Colors.Light);

  const loadColorScheme = async () => {
    try {
      const scheme = await getColorScheme();
     
      if (scheme) {
        setColorScheme(scheme);
      
      } else {

        await AsyncStorage.setItem('colorSchema', 'Light');
        scheme = await getColorScheme();
        setColorScheme(scheme);

      }

    } catch (error) {
      console.error("Erro ao carregar esquema de cores:", error);
      setColorScheme(Colors.MainTheme);
    }
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
