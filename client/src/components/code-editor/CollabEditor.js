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
import io from "socket.io-client";
import { Play } from "react-feather";
import Peer from "peerjs";
import Draggable from "react-draggable";
import { BiLinkExternal } from "react-icons/bi";
import { MdDragHandle, MdAirplay } from "react-icons/md";
import {
  getDefaultCode,
  setLanguageLocalStorage,
  getLanguageLocalStorage,
  setCodeLocalStorage,
  getCodeLocalStorage,
} from "./utils/code-settings";

const ENDPOINT = "http://localhost:3000";

const socket = io(ENDPOINT);

const mypeer = new Peer(undefined, {
  host: "/",
  port: "3001",
});

const OutputWindow = styled.div`
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  flex: 1;
  max-height : 60vh;
  color: ${(props) => (props.error ? "red" : "black")};
`;

const CodeEditor = ({ theme, roomId }) => {
  const loading = useSelector((state) => state.code.isFetching);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [language, setLanguage] = useState("java");
  const [input, setInput] = useState("");
  const [token, setToken] = useState(null);
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const valueGetter = useRef();
  let output = useSelector((state) => state.code.output);

  let error = useSelector((state) => state.code.error);

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

  useEffect(() => {
    console.log("socket: browser says ping (1)");
    socket.on("setLanguage", function (data) {
      // console.log(data);
      setLanguageLocalStorage(data);
      setCode(getDefaultCode(data));
      setCodeLocalStorage(getDefaultCode(data));
      setLanguage(data);
    });
    socket.on("setInput", (data) => {
      setInput(data);
    });
    socket.on("setOutput", (data) => {
      dispatch(data);
    });
    socket.on("setCodeExec", (data) => {
      setCodeLocalStorage(data);
      setCode(data);
    });
  }, []);

  useEffect(() => {
    mypeer.on("open", (vdid) => {
      console.log("id ", vdid);
      setToken(vdid);
      getMedia().then((media) => addVideoStream(media, vdid, true));
      socket.emit("joinRoom", roomId, vdid);
    });

    socket.on("userDisconnected", (userToken) => {
      console.log("userDisconnected ", userToken);
      const vidElement = document.getElementsByClassName(`${userToken}`);
      vidElement[0].remove();
    });
    socket.on("fromOldUser", (token) => {
      console.log("fromOldUser ", token);
      mypeer.on("call", (call) => {
        console.log("call from peer");
        getMedia().then((media) => call.answer(media));
        call.on("stream", (stream) => {
          console.log("stream ", token);
          addVideoStream(stream, token, false);
        });
      });
    });
  }, [roomId]);

  useEffect(() => {
    if (token) {
      socket.on("userConnected", (vdid, socketId) => {
        getMedia().then((media) => {
          console.log("vdid", vdid);
          const call = mypeer.call(vdid, media);
          call.on("stream", (stream) => {
            addVideoStream(stream, vdid, false);
          });
          call.on("close", () => {
            const video = document.querySelector(`.${vdid}`);
            video.remove();
          });
          console.log("userConnected", vdid);
          socket.emit("sendNewUser", token, socketId);
        });
      });
    }
  }, [token]);

  const updateWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    // setWindowHeight(window.innerHeight);
  };

  const handleEditorDidMount = (_valueGetter) => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  const addVideoStream = (media, id, isMuted) => {
    const myVideo = document.createElement("video");
    const exist = document.getElementsByClassName(`${id}`);
    console.log(exist.length);
    if (exist.length) return;
    myVideo.classList.add(id);
    const VideoGrid = document.querySelector(".videoBox");
    myVideo.muted = isMuted;
    myVideo.controls = true;
    myVideo.disablePictureInPicture = true;
    myVideo.srcObject = media;
    myVideo.addEventListener("loadedmetadata", () => {
      myVideo.play();
    });
    VideoGrid.append(myVideo);
  };

  const getMedia = async () => {
    return await navigator.mediaDevices.getUserMedia({
      video: { frameRate: { ideal: 10, max: 15 } },
      audio: { noiseSuppression: true, echoCancellation: true },
    });
  };

  const onChangeCode = (newValue, e) => {
    // console.log("onChange" + e);
    socket.emit("getCodeExec", e);
    setCodeLocalStorage(e);
    setCode(e);
  };

  const SubmitCode = async () => {
    dispatch(setLoadingTrue());
    const res = await executeCode(code, language, input);
    dispatch(res);
    // getOutput();
    socket.emit("getOutput", res);
  };

  const changeLanguage = (e) => {
    setLanguageLocalStorage(e.target.value);
    setCode(getDefaultCode(e.target.value));
    setCodeLocalStorage(getDefaultCode(e.target.value));
    socket.emit("getLanguage", e.target.value);
    setLanguage(e.target.value);
  };

  const HideVideo = () => {
    const VidGrid = document.querySelector(".videogrid");
    VidGrid.classList.add("hide");
  };

  const ShowVideo = () => {
    const VidGrid = document.querySelector(".videogrid");
    VidGrid.classList.remove("hide");
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
                {loading ? "Loading.." : "Run Code"}
                <Play style={{ paddingLeft: 10, fontSize: "1em" }} />
              </div>
            </div>
            <ControlledEditor
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
                    <div>Output</div>
                    <div className={styles.showVid} onClick={() => ShowVideo()}>
                      <MdAirplay />
                    </div>
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
        <Draggable handle={".dragHead"} bounds="parent">
          <div className="videogrid">
            <div className="dragHead">
              <MdDragHandle className="dragger" />
              <BiLinkExternal
                style={{ margin: 5 }}
                onClick={() => {
                  HideVideo();
                }}
              />
            </div>
            <div className="videoBox"></div>
          </div>
        </Draggable>
      </div>
    </>
  );
};

export default CodeEditor;
