import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CodeEditorIndex from "./components/code-editor/CodeEditorIndex";
import CollabEditorIndex from "./components/code-editor/CollabEditorIndex";
import styles from "./App.module.css";
import Home from "./components/home/Home";
import setAuthToken from "./utils/setAuthToken";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HostedInterview from "./components/hosted-interview/HostedInterview";
import { fetchUser } from "./actions/user";
import { useDispatch } from "react-redux";
import Login from "./components/login/Login";

if (localStorage.getItem("codex_token")) {
  setAuthToken(localStorage.getItem("codex_token"));
}

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchUserUtil();
  }, []);

  const fetchUserUtil = async () => {
    const res = await fetchUser();
    dispatch(res);
  };
  return (
    <Router>
      <div className={styles.App}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path={["/ide"]} component={CodeEditorIndex} />
          <Route
            exact
            path={["/interview/:id"]}
            render={(props) => <CollabEditorIndex {...props} />}
          />
          <Route path="/hosted-interviews" component={HostedInterview} />
          <Route path="/login" component={Login} />
        </Switch>
        <ToastContainer position={"bottom-right"} />
      </div>
    </Router>
  );
};

export default App;
