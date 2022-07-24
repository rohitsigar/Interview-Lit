import React from "react";
import ToggleTheme from "./ToggleTheme";
import styles from "./styles/headerStyles.module.css";
import { Code } from "react-feather";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div className={styles.header}>
      <Link to="/">
        <p className={styles.brand}>
          <Code className={styles.icon} />
          Interview<span className={styles.letter}>Lit</span>
        </p>
      </Link>

      <ToggleTheme {...props} />
    </div>
  );
};

export default Header;
