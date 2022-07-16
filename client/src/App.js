import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './constants/theme.js';
import { GlobalStyles } from './constants/global.js';
import { useDarkMode } from './utils/useDarkMode';
import Header from './components/header/Header.js';

const App = () => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />;
  }
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div>
        <h1>Remote Code Executor</h1>
      </div>
    </ThemeProvider>
  );
};

export default App;
