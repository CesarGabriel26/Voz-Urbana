import React from 'react';
import { ThemeProvider } from './App/utils/ThemeContext';
import TabNavigation from './App/components/TabNavigation';

export default function App() {
  // Usa o tema do contexto
  return (
    <ThemeProvider>
      <TabNavigation />
    </ThemeProvider>
  );
}
