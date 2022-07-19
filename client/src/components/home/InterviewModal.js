import React, { useEffect, useRef } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import styles from "./styles/interview.module.css";
import { X, Copy, Link, CornerDownRight } from "react-feather";
import { generateInterviewLink } from "../../actions/interview-link";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const InterviewModal = ({ open, handleClose }) => {
  const textareaRef = useRef(null);
  const history = useHistory();
  const link = useSelector((state) => state.interviewLink);

  const interviewLink = () => {
    return `${window.location.href}interview/${link.generatedLinkAsInterviewer}`;
  };

  const onCopyLink = (e) => {
    navigator.clipboard.writeText(interviewLink());
  };

  const onVisitLink = () => {
    history.push(`/interview/${link.generatedLinkAsInterviewer}`);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
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
            <p className={styles.title}>Here is your link to the interview</p>
            <X onClick={handleClose} />
          </div>
          {link.loading ? (
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={50}
              width={50}
              className={styles.loader}
            />
          ) : (
            <div className={styles.link_container}>
              <div className={styles.link}>
                <p ref={textareaRef}>{interviewLink()}</p>
              </div>
              <div className={styles.copy} onClick={onCopyLink}>
                <Copy color={"gainsboro"} className={styles.icon} />
              </div>
              <div className={styles.copy} onClick={onVisitLink}>
                <CornerDownRight color={"gainsboro"} className={styles.icon} />
              </div>
            </div>
          )}
        </div>
      </Fade>
    </Modal>
  );
};

export default InterviewModal;
