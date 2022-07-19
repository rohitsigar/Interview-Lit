import React from "react";
import Drawer from "@material-ui/core/Drawer";
import styles from "./styles/menu.module.css";
import { Code, UserCheck, Home } from "react-feather";
import { useHistory } from "react-router-dom";

const Menu = ({ open, handleClose }) => {
  const history = useHistory();
  return (
    <Drawer anchor={"left"} open={open} onClose={handleClose}>
      <div className={styles.menu_container}>
        <ul>
          <li
            onClick={() => {
              history.push("/");
            }}
          >
            <Home style={{ marginRight: 20 }} />
            Home
          </li>
          <li
            onClick={() => {
              history.push("/hosted-interviews");
            }}
          >
            <UserCheck style={{ marginRight: 20 }} />
            Hosted Interviews
          </li>
          {/* <li>
            <Code style={{ marginRight: 20 }} />
            Interviews
          </li> */}
        </ul>
      </div>
    </Drawer>
  );
};

export default Menu;
