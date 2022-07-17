import React from "react";
import ToggleTheme from "./ToggleTheme";
import styles from "./headerStyles.module.css";

const Header = (props) => {
  return (
    <div className={styles.header}>
      <p className={styles.brand}>
        Code<span className={styles.letter}>X</span>
      </p>
      <ToggleTheme {...props} />
    </div>
  );
};

export default Header;
