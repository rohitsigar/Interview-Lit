import React from 'react';
import Footer from '../code-editor/Footer';
import styles from './styles/header.module.css';

const Header = () => {
  return (
    <>
      <div className={styles.header_container}>
        <button className={styles.header_button}>Login</button>
      </div>
      <Footer />
    </>
  );
};

export default Header;
