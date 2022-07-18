import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CodeEditorIndex from "./components/code-editor/CodeEditorIndex";
// import Interview from './components/interview/CodeEditorIndex';
import CollabEditorIndex from "./components/code-editor/CollabEditorIndex";
import styles from "./App.module.css";
import Home from "./components/home/Home";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.getItem("codex_token")) {
  setAuthToken(localStorage.getItem("codex_token"));
}

const App = () => {
  return (
    <Router>
      <div className={styles.App}>
        <Switch>
          <Route exact path={["/ide"]} component={CodeEditorIndex} />
          <Route
            exact
            path={["/interview/:id"]}
            render={(props) => <CollabEditorIndex {...props} />}
          />
          <Route exact path="/" component={Home} />
          {/* <Route path='/interview/123' component={CollabEditorIndex} /> */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
