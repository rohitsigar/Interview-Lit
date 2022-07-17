import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { executeCode, setLoadingTrue } from "../../actions/code";
import { useDispatch, useSelector } from "react-redux";
import InputOutput from "../output/InputOutput";
import Submit from "./Submit";
import Split from "react-split";
import styled from "styled-components";
import styles from "./style.module.css";
import "./style.css";
import { Play } from "react-feather";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000/interview/12345";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  // background: blue;
`;

const OutputWindow = styled.div`
  // height: 100%;
  // margin: 20px;
  // border: 2px solid #eeeeee;
  border-radius: 5px;
  padding: 0 20px;
  box-sizing: border-box;
  color: ${(props) => (props.error ? "red" : "black")};
`;

const CodeEditor = ({ theme }) => {
  const loading = useSelector((state) => state.code.isFetching);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [language, setLanguage] = useState("c");
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const valueGetter = useRef();
  let output = useSelector((state) => state.code.output);
  let error = useSelector((state) => state.code.error);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    // (1): Send a ping event with
    // some data to the server
    console.log("socket: browser says ping (1)");
    socket.emit("ping", { some: "data" });

    // (4): When the browser receives a pong event
    // console log a message and the events data
    socket.on("pong", function (data) {
      console.log("socket: browser receives pong (4)", data);
    });
  }, []);

  const handleEditorDidMount = (_valueGetter) => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  const SubmitCode = async () => {
    dispatch(setLoadingTrue());
    const res = await executeCode(valueGetter.current(), language, input);
    console.log(res);
    dispatch(res);
  };

  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <>
      <Row>
        <Split
          sizes={[50, 50]}
          minSize={100}
          expandToMin={false}
          gutterSize={10}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="ew-resize"
          class={styles.splitHor}
        >
          <div className={styles.left}>
            <div className={styles.runCode}>
              <Submit language={language} changeLanguage={changeLanguage} />
              <div
                className={styles.submitButton}
                onClick={SubmitCode}
                disabled={!isEditorReady}
              >
                {loading ? "Loading.." : "Run Code"}
                <Play style={{ paddingLeft: 10, fontSize: "1em" }} />
              </div>
            </div>
            <Editor
              className="editor"
              language={language}
              theme={theme === "dark" ? "vs-dark" : "light"}
              editorDidMount={handleEditorDidMount}
            />
          </div>
          <div className={styles.right}>
            <Split
              sizes={[75, 25]}
              minSize={[25, 25]}
              expandToMin={false}
              gutterSize={10}
              gutterAlign="center"
              snapOffset={30}
              dragInterval={1}
              direction="vertical"
              cursor="ew-resize"
              class={styles.splitVer}
            >
              <div className={styles.output}>
                <div className={styles.outputHead}>Output</div>
                <OutputWindow error={error === "" ? false : true}>
                  {output ? console.log(output) : null}
                  <pre style={{ width: "100%" }}>
                    {output === "" ? error : output}
                  </pre>
                </OutputWindow>
              </div>
              <div className={styles.input}>
                <InputOutput input={input} setInput={setInput} theme={theme} />
              </div>
            </Split>
          </div>
        </Split>
      </Row>
    </>
  );
};

export default CodeEditor;
