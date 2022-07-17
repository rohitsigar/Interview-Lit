import React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./constants/theme.js";
import { GlobalStyles } from "./constants/global.js";
import { useDarkMode } from "./utils/useDarkMode";
import Header from "./components/header/Header.js";
import Footer from "./components/footer/Footer.js";
import CodeEditor from "./components/code-editor/CodeEditor.js";
import InputOutput from "./components/output/InputOutput.js";
import styles from "./App.module.css";

const App = () => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />;
  }
  return (
    <div className={styles.App}>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Footer />
        <CodeEditor theme={theme} />
        {/* <Footer /> */}
      </ThemeProvider>
    </div>
  );
};

export default App;
