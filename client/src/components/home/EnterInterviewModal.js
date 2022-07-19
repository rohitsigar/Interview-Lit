import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import styles from "../collab-modal/styles/collabmodal.module.css";
import { X, Send, Trash } from "react-feather";
import { checkAccess } from "../../actions/interview-link";
import { useHistory } from "react-router-dom";

const EnterInterviewModal = ({ open, handleClose, link }) => {
  const [code, setCode] = useState("");
  const history = useHistory();

  const onChangeCode = (e) => setCode(e.target.value);

  const onEnterInterviewRequest = async () => {
    const access = await checkAccess(code);
    if (access) history.push(`interview/${code}`);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={styles.modal_container}
    >
      <Fade in={open}>
        <div className={styles.modal}>
          <div className={styles.row}>
            <p className={styles.title}>Enter Interview</p>
            <X onClick={handleClose} />
          </div>
          <div className={styles.input}>
            <input
              type="text"
              placeholder={"Enter Code"}
              onChange={onChangeCode}
              value={code}
            />
            <Send onClick={onEnterInterviewRequest} />
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default EnterInterviewModal;
