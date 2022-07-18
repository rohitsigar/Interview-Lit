import c from './languages/c';
import cpp from './languages/cpp';
import python from './languages/python';
import javascript from './languages/javascript';
import java from './languages/java';

export const getDefaultCode = language => {
  switch (language) {
    case 'c':
      return c;
    case 'cpp':
      return cpp;
    case 'python':
      return python;
    case 'javascript':
      return javascript;
    case 'java':
      return java;
    default:
      return 'Choose Language';
  }
};

export const setLanguageLocalStorage = language => {
  localStorage.setItem('lang', language);
};

export const getLanguageLocalStorage = () => {
  return localStorage.getItem('lang');
};

export const setCodeLocalStorage = code => {
  localStorage.setItem('code', code);
};

export const getCodeLocalStorage = () => {
  return localStorage.getItem('code');
};
