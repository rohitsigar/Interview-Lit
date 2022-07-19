import React from "react";
import styles from "./styles/bottomFooter.module.css";
import { Code } from "react-feather";
import { FaGooglePlusG, FaLinkedinIn, FaGithub } from "react-icons/fa";

function BottomFooter() {
  return (
    <div className={styles.container}>
      <div className={styles.minContainer}>
        <div className={styles.headBox}>
          <p className={styles.brand}>
            Code<span className={styles.letter}>X</span>
          </p>
          <p className={styles.slogan}>
            You do the coding, we will take care of the rest. Take interview in
            real-time with video interaction.
          </p>
        </div>
        <div className={styles.dev}>
          <div className={styles.devHead}>Developers</div>
          <h4>Tushar Neogi</h4>
          <h4>Shweta Chaurasia</h4>
          <h4>Ritika Tomar</h4>
        </div>
        <div className={styles.break}></div>
      </div>
      <div className={styles.icons}>
        <div className={styles.icon}>
          <FaGithub></FaGithub>
        </div>
        <div className={styles.icon}>
          <FaGooglePlusG></FaGooglePlusG>
        </div>
        <div className={styles.icon}>
          <FaLinkedinIn></FaLinkedinIn>
        </div>
      </div>
      <p className={styles.copyright}> &copy; CodeX. All Rights reserved.</p>
    </div>
  );
}

export default BottomFooter;
