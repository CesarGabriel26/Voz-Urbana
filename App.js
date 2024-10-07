import React from 'react';
import { ThemeProvider } from './App/utils/ThemeContext';
import Navigation from './App/components/Navigation';
import { View } from 'react-native';

export default function App() {
  // Usa o tema do contexto
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}

