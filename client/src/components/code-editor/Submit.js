<<<<<<< HEAD
import React from 'react';
import styles from './styles/editor.module.css';
=======
import React from "react";
import styles from "./style.module.css";
>>>>>>> b022e447a1e67370f6ab6778e16e5f17cc001d88

const Submit = ({ language, changeLanguage }) => {
  return (
    <div className={styles.sel_lang}>
      <select value={language} onChange={changeLanguage}>
<<<<<<< HEAD
        <option value='c'>C</option>
        <option value='cpp'>C++</option>
        <option value='python'>Python</option>
        <option value='javascript'>Javascript</option>
        <option value='java'>Java</option>
=======
        <option value="c">C</option>
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="javascript">Javascript</option>
        <option value="java">Java</option>
>>>>>>> b022e447a1e67370f6ab6778e16e5f17cc001d88
      </select>
    </div>
  );
};

export default Submit;
