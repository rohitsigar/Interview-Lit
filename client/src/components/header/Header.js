import React from "react";
import ToggleTheme from "./ToggleTheme";
import styles from "./headerStyles.module.css";
import { Code } from "react-feather";

const Header = (props) => {
  return (
    <div className={styles.header}>
      <p className={styles.brand}>
        <Code className={styles.icon} />
        Code<span className={styles.letter}>X</span>
      </p>
      <ToggleTheme {...props} />
    </div>
  );
};

export default Header;
