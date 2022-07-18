<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CodeEditorIndex from './components/code-editor/CodeEditorIndex';
import styles from './App.module.css';
import Home from './components/home/Home';

const App = () => {
  return (
    <Router>
      <div className={styles.App}>
        <Switch>
          <Route exact path='/ide' component={CodeEditorIndex} />
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    </Router>
=======
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
>>>>>>> b022e447a1e67370f6ab6778e16e5f17cc001d88
  );
};

export default App;
