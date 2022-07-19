import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import styles from "./styles/input.module.css";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:3000";
const socket = io(ENDPOINT);

const Div = styled.div`
  height: 100%;
  // flex: 1;
  box-sizing: border-box;
  margin: 20;
  color: ${(props) => props.error && "red"};
  background-color: "#eeeeee";
  overflow: scroll;
  outline: none;
`;

const TextInput = styled.textarea`
  color: ${(props) => (props.theme === "dark" ? "white" : "black")};
  background-color: ${(props) =>
    props.theme === "dark" ? "#1e1e1e" : "white"};
  width: 100%;
  height: 100%;
  padding: 20px;
  outline: none;
  resize: none;
  border: none;
  border-radius: 0;
  font-size: 1.2em;
`;

const Input = ({ input, setInput, roomId, theme }) => {
  // let output = useSelector((state) => state.code.output);
  // let error = useSelector((state) => state.code.error);

  // useEffect(() => {
  //   console.log(output);
  // }, [output]);
  return (
    <Div className={styles.input_field}>
      <TextInput
        theme={theme}
        value={input}
        onChange={(e) => {
          // console.log(e.target.value);
          socket.emit("getInput", roomId, e.target.value);
          setInput(e.target.value);
        }}
        className={styles.textarea_input}
        placeholder="Give input here..."
      />
    </Div>
  );
};

export default Input;
