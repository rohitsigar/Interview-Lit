import React from "react";
import styles from "./styles/home.module.css";
import Header from "./Header";
import Terminal from "./Terminal";
import { motion } from "framer-motion";
import Typist from "react-typist";
import Footer from "../code-editor/Footer";
import BottomFooter from "./BottomFooter";

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.minContainer}>
          <div className={styles.left}>
            <motion.h1
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
            >
              Code
              <span>X</span>
            </motion.h1>
            <Typist startDelay={2} avgTypingDelay={120}>
              Fast, Lighter and Best IDE for you Noobs...
            </Typist>

            {/* <div className={styles.options_tab}>
              <div className={styles.options_tab_overlay}></div>
              <ul>
                <li>IDE</li>
                <li>Host an Interview</li>
                <li>Enter an Interview</li>
              </ul>
            </div> */}
          </div>
          <div className={styles.right}>
            {/* <img
              src={
                'https://next-cdn.codementor.io/images/pair-programming/pair-programming-laptop.png'
              }
            /> */}
            <Terminal />
          </div>
        </div>
        <BottomFooter />
      </div>
    </>
  );
};

export default Home;
