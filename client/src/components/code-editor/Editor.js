import React, { useRef, useState, useEffect } from "react";
import { ControlledEditor } from "@monaco-editor/react";
import { executeCode, setLoadingTrue } from "../../actions/code";
import { useDispatch, useSelector } from "react-redux";
import Input from "./Input";
import Submit from "./Submit";
import Split from "react-split";
import styled from "styled-components";
import styles from "./styles/editor.module.css";
import "./styles/style.css";
import { Play } from "react-feather";
import Loader from "react-loader-spinner";
import {
  getDefaultCode,
  setLanguageLocalStorage,
  getLanguageLocalStorage,
  setCodeLocalStorage,
  getCodeLocalStorage,
} from "./utils/code-settings";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;

const OutputWindow = styled.div`
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  max-height: 60vh;
  flex: 1;
  color: ${(props) => (props.error ? "red" : "black")};
`;

const CodeEditor = ({ theme }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [language, setLanguage] = useState("java");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [stat, setStats] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const valueGetter = useRef();
  // let output = useSelector((state) => state.code.output);
  // const loading = useSelector((state) => state.code.isFetching);
  // let error = useSelector((state) => state.code.error);

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);

    if (getLanguageLocalStorage()) {
      setLanguage(getLanguageLocalStorage());
      if (getCodeLocalStorage()) {
        setCode(getCodeLocalStorage());
      } else setCode(getDefaultCode(getLanguageLocalStorage()));
    } else {
      setCode(getDefaultCode(language));
    }

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  const updateWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  const handleEditorDidMount = (_valueGetter) => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  const onChangeCode = (newValue, e) => {
    // console.log("onChange" + e);
    setCodeLocalStorage(e);
    setCode(e);
  };

  const SubmitCode = async () => {
    try {
      setLoading(true);
      const res = await executeCode(code, language, input);
      setOutput((prev) => res.output);
      setStats(res.misc);
      setError("");
      console.log(res);
    } catch (error) {
      console.log(error);
      setOutput("");
      setStats("");
      setError((prevVal) => error);
    }
    setLoading(false);
  };

  const changeLanguage = (e) => {
    setLanguageLocalStorage(e.target.value);
    setCode(getDefaultCode(e.target.value));
    setCodeLocalStorage(getDefaultCode(e.target.value));
    setLanguage(e.target.value);
  };
  return (
    <>
      <div className={styles.row}>
        <Split
          direction={windowWidth > 800 ? "horizontal" : "vertical"}
          sizes={[60, 40]}
          minSize={windowWidth > 800 ? 0 : 500}
          snapOffset={windowWidth > 800 ? 200 : 0}
          gutterSize={20}
          gutterAlign="center"
          className={styles.splitHor}
        >
          <div className={styles.left}>
            <div className={styles.runCode}>
              <Submit language={language} changeLanguage={changeLanguage} />
              <div
                className={styles.submitButton}
                onClick={SubmitCode}
                disabled={!isEditorReady}
              >
                {loading ? (
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height={20}
                    width={50}
                    // timeout={3000} //3 secs
                  />
                ) : (
                  <>
                    <span>Run Code</span>
                    <Play style={{ paddingLeft: 10, fontSize: "1em" }} />
                  </>
                )}
              </div>
            </div>
            {/* <Editor
                wrapperClassName="editor"
              language={language}
              theme={theme === "dark" ? "vs-dark" : "light"}
              editorDidMount={handleEditorDidMount}
            /> */}
            <ControlledEditor
              // wrapperClassName="editor"
              className="editor"
              language={language}
              theme={theme === "dark" ? "vs-dark" : "light"}
              editorDidMount={handleEditorDidMount}
              value={code}
              onChange={onChangeCode}
            />
          </div>
          <div className={styles.right}>
            <div className={styles.column}>
              <Split
                direction="vertical"
                sizes={windowWidth > 800 ? [75, 25] : [100, 0]}
                minSize={0}
                snapOffset={windowWidth > 800 ? 100 : 0}
                gutterSize={20}
                gutterAlign="center"
                className={styles.splitVer}
              >
                <div className={styles.output}>
                  <div className={styles.outputHead}>
                    <span>Output</span>
                    <span style={{ fontSize: "0.75em", fontWeight: 500 }}>
                      {stat}
                    </span>
                  </div>
                  <OutputWindow error={error === "" ? false : true}>
                    {output ? console.log(output) : null}
                    <pre style={{ width: "100%" }}>
                      {output === "" ? error : output}
                    </pre>
                  </OutputWindow>
                </div>
                <div className={styles.input}>
                  <Input input={input} setInput={setInput} theme={theme} />
                </div>
              </Split>
            </div>
          </div>
        </Split>
      </div>
    </>
  );
};

export default CodeEditor;
