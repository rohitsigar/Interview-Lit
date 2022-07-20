import React, { useRef, useState, useEffect, use } from "react";
import { useHistory } from "react-router-dom";
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
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";

const ENDPOINT = "http://localhost:3000";

const socket = io(ENDPOINT);

// const mypeer = new Peer(localStorage.getItem("codex_token").split(".")[0]);
let mypeer;

const OutputWindow = styled.div`
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  flex: 1;
  max-height: 60vh;
  color: ${(props) => (props.error ? "red" : "black")};
`;

const CodeEditor = ({ theme, roomId }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const user = useSelector((state) => state.user);
  const [language, setLanguage] = useState("java");
  const [input, setInput] = useState("");
  const [token, setToken] = useState(null);
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const valueGetter = useRef();
  const history = useHistory();
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [stat, setStats] = useState("");
  const [loading, setLoading] = useState(false);
  // let output = useSelector((state) => state.code.output);
  // const loading = useSelector((state) => state.code.isFetching);
  // let error = useSelector((state) => state.code.error);

  useEffect(() => {
    if (!token) {
      mypeer = new Peer();
      console.log("peer connected");
    }
    if (token) {
      socket.on("userConnected", (vdid, socketId, name) => {
        getMedia().then((media) => {
          console.log("vdid", vdid);
          const call = mypeer.call(vdid, media);
          call.on("stream", (stream) => {
            addVideoStream(stream, vdid, false, name);
          });
          call.on("close", () => {
            const video = document.querySelector(`.${vdid}`);
            video.remove();
          });
          console.log("userConnected", vdid);
          socket.emit("sendNewUser", token, socketId, user.name);
        });
      });
    }
  }, [token]);

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  useEffect(() => {
    socket.on("setLanguage", (data) => {
      console.log("setLanguage", data);
      setLanguage(data);
    });

    socket.on("setInput", (data) => {
      setInput(data);
    });
    socket.on("setOutput", (data) => {
      setOutput(data);
    });
    socket.on("setError", (data) => {
      setError(data);
    });
    socket.on("setCodeExec", (data) => {
      setCode(data);
    });
  }, []);

  useEffect(() => {
    mypeer.on("error", (err) => {
      if ((err.type = "unavailable-id")) {
        notify("Client already exists");
        history.push("/");
      }
      return;
    });

    mypeer.on("open", async (vdid) => {
      console.log("id ", vdid);
      setToken(vdid);
      const media = await getMedia();
      if (media == null) {
        console.log(media);
        notify("Camera Permission is required for meeting");
        history.push("/");
        return;
      }
      // console.log(user);
      addVideoStream(media, vdid, true, user.name);
      socket.emit("joinRoom", roomId, vdid, user.name);
    });

    socket.on("userDisconnected", (userToken) => {
      console.log("userDisconnected ", userToken);
      const vidElement = document.getElementsByClassName(`${userToken}`);
      vidElement[0].remove();
      vidElement[0].remove();
    });
    socket.on("fromOldUser", (token, name) => {
      console.log("fromOldUser ", token, name);
      mypeer.on("call", (call) => {
        console.log("call from peer");
        getMedia().then((media) => call.answer(media));
        call.on("stream", (stream) => {
          console.log("stream ", token);
          addVideoStream(stream, token, false, name);
        });
      });
    });

    return () => {};
  }, []);

  const notify = (message) => {
    return toast.error(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const updateWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    // setWindowHeight(window.innerHeight);
  };

  const handleEditorDidMount = (_valueGetter) => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  const addVideoStream = (media, id, isMuted, userName) => {
    console.log(userName);
    const myVideo = document.createElement("video");
    const exist = document.getElementsByClassName(`${id}`);
    const nameDiv = document.createElement("div");
    nameDiv.innerHTML = userName;
    nameDiv.classList.add("name");
    nameDiv.classList.add(id);
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
    VideoGrid.append(nameDiv);
    VideoGrid.append(myVideo);
  };

  const getMedia = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: { frameRate: { ideal: 10, max: 15 } },
        audio: { noiseSuppression: true, echoCancellation: true },
      });
      return media;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const onChangeCode = (newValue, e) => {
    // console.log("onChange" + e);
    socket.emit("getCodeExec", roomId, e);
    //setCodeLocalStorage(e);
    setCode(e);
  };

  const SubmitCode = async () => {
    try {
      setLoading(true);
      const res = await executeCode(code, language, input);
      socket.emit("getOutput", roomId, res.output);
      socket.emit("getError", roomId, "");
      setOutput((prev) => res.output);
      setStats(res.misc);
      setError("");
      console.log(res);
    } catch (error) {
      console.log(error);
      socket.emit("getError", roomId, error);
      socket.emit("getOutput", roomId, "");
      setOutput("");
      setStats("");
      setError((prevVal) => error);
    }
    setLoading(false);
  };

  const changeLanguage = (e) => {
    // setLanguageLocalStorage(e.target.value);
    // setCode(getDefaultCode(e.target.value));
    // setCodeLocalStorage(getDefaultCode(e.target.value));
    socket.emit("getLanguage", roomId, e.target.value);
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
                    <div style={{ fontSize: "0.75em", fontWeight: 500 }}>
                      {stat}
                    </div>
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
                  <Input
                    input={input}
                    setInput={setInput}
                    roomId={roomId}
                    theme={theme}
                  />
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
                style={{ margin: 5, cursor: "pointer" }}
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
