import React, { useState } from "react";
import styles from "./styles/terminal.module.css";
import styled from "styled-components";
import { Settings, User, UserCheck, Code } from "react-feather";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import InterviewModal from "./InterviewModal";
import {
  generateInterviewLink,
  setLoadingTrue,
} from "../../actions/interview-link";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "../../utils/isLoggedIn";
import { alert } from "../../actions/alert";
import EnterInterviewModal from "./EnterInterviewModal";

const color = [
  "#ee7752",
  "#e73c7e",
  "#23a6d5",
  "#23d5ab",
  "#ee7752",
  "#e7c649",
  "#92f25c",
  "#ffffff",
  "#8249e7",
  "#49ebc7",
];
const width = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const Dot = styled.div`
  background-color: ${(props) => props.color};
  height: 15px;
  width: 15px;
  border-radius: 10px;
  margin-right: 5px;
`;

const Body = styled.div`
  height: 15px;
  width: ${(props) => props.width}%;
  margin-left: 10px;
  background-color: ${(props) => props.color};
  border-radius: 15px;
`;

const Terminal = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [openHostInterviewModal, setOpenHostInterviewModal] = useState(false);
  const [openEnterInterview, setOpenEnterInterview] = useState(false);

  const onHostInterview = async () => {
    if (isLoggedIn()) {
      dispatch(setLoadingTrue());
      const res = await generateInterviewLink();
      dispatch(res);
      setOpenHostInterviewModal(!openHostInterviewModal);
    } else {
      alert("error", "Login is required");
    }
  };

  const onEnterInterview = () => {
    if (isLoggedIn()) {
      setOpenEnterInterview(!openEnterInterview);
    } else {
      alert("error", "Login is required");
    }
  };

  const body = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 100 },
  };

  const item = {
    visible: (i) => ({
      opacity: 1,
      backgroundColor: `${color[Math.floor(Math.random() * 10) + 1]}`,
      transition: {
        delay: i * 0.3,
        ease: "easeOut",
        duration: i * 1,
        repeat: "Infinity",
      },
    }),
    hidden: {
      opacity: 0,
    },
  };

  const button = {
    visible: (i) => ({
      scale: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delay: i * 0.1,
      },
    }),
    hidden: {
      scale: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };

  return (
    <>
      <motion.div
        className={styles.terminal_container}
        variants={body}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.terminal_header}>
          <Dot color={"red"} />
          <Dot color={"yellow"} />
          <Dot color={"green"} />
        </div>
        <div className={styles.terminal_body}>
          {Array.from(Array(10), (e, i) => {
            let random_color = Math.floor(Math.random() * 10) + 1;
            let random_width = Math.floor(Math.random() * 10) + 1;
            return (
              <motion.div
                style={{
                  width: `${width[random_width]}%`,
                  height: 15,
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 10,
                  marginBottom: 10,
                  backgroundColor: `${color[random_color]}`,
                  borderRadius: 15,
                }}
                variants={item}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1, repeat: Infinity }}
                custom={i}
              >
                {/* <Body
                color={color[random_color - 1]}
                width={width[random_width - 1]}
              /> */}
              </motion.div>
            );
          })}
          {/* <Body color={color[0]} width={width[0]} />
        <Body color={color[4]} width={width[9]} /> */}
        </div>
        <div className={styles.option_tabs}>
          <motion.button
            className={styles.button1}
            onClick={() => {
              history.push("/ide");
            }}
            whileTap={{ scale: 0.95 }}
            variants={button}
            animate="visible"
            initial="hidden"
            custom={3.5}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            PLAY WITH IDE
            <motion.div
              initial={{ rotate: "0deg" }}
              animate={{ rotate: "360deg" }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{
                display: "flex",
                alignItem: "center",
                justifyContent: "center",
                marginLeft: 10,
              }}
            >
              <Settings style={{ marginLeft: 0 }} size={30} />
            </motion.div>
          </motion.button>
          <motion.button
            className={styles.button2}
            whileTap={{ scale: 0.95 }}
            variants={button}
            animate="visible"
            initial="hidden"
            custom={4}
            onClick={onHostInterview}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>HOST AN INTERVIEW
            <UserCheck style={{ marginLeft: 10 }} size={30} />
          </motion.button>
          <motion.button
            className={styles.button3}
            whileTap={{ scale: 0.95 }}
            variants={button}
            animate="visible"
            initial="hidden"
            custom={4.5}
            onClick={onEnterInterview}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>ENTER INTERVIEW
            <Code style={{ marginLeft: 10 }} size={30} />
          </motion.button>
        </div>
      </motion.div>
      <InterviewModal
        open={openHostInterviewModal}
        handleClose={() => {
          setOpenHostInterviewModal(false);
        }}
      />
      <EnterInterviewModal
        open={openEnterInterview}
        handleClose={onEnterInterview}
      />
    </>
  );
};

export default Terminal;
