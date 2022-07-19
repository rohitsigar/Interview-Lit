import React from 'react';
import ToggleTheme from './ToggleTheme';
import styles from './styles/headerStyles.module.css';
import { Code } from 'react-feather';
import { Link } from 'react-router-dom';
import { UserPlus } from 'react-feather';

const HeaderCollab = props => {
  return (
    <div className={styles.header}>
      <p className={styles.brand}>
        <Code className={styles.icon} />
        Code<span className={styles.letter}>X</span>
      </p>
      <div className={styles.row}>
        <div className={styles.share}>
          <p>Share</p>
          <UserPlus color={'black'} />
        </div>
        <ToggleTheme {...props} />
      </div>
    </div>
  );
};

export default HeaderCollab;
