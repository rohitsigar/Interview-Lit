import React from "react";
import ToggleTheme from "./ToggleTheme";
import styles from "./styles/headerStyles.module.css";
import { Code } from "react-feather";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div className={styles.header}>
      <p className={styles.brand}>
        <Code className={styles.icon} />
        {/* <Link to="/login" style={{ textDecoration: "none", color: "white" }}> */}
        {/* <div> */}
        Code<span className={styles.letter}>X</span>
        {/* </div> */}
        {/* </Link> */}
      </p>
      <ToggleTheme {...props} />
    </div>
  );
};

export default Header;
