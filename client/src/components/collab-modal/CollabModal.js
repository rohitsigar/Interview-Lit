import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles/collabmodal.module.css';
import { X, Send, Trash } from 'react-feather';
import {
  addCollab,
  fetchCollab,
  deleteCollab
} from '../../actions/interview-link';
import { useDispatch, useSelector } from 'react-redux';

const CollabModal = ({ open, handleClose, link }) => {
  const dispatch = useDispatch();
  const interviewee = useSelector(state => state.interviewLink.collaborators);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollaborators();
  }, [open]);

  const fetchCollaborators = async () => {
    const res = await fetchCollab(link);
    dispatch(res);
  };

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const onSendCollabRequest = async () => {
    const res = await addCollab(link, email);
    dispatch(res);
    setEmail('');
  };

  const onDeleteEmail = async emailIntervieww => {
    const res = await deleteCollab(link, emailIntervieww);
    dispatch(res);
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      className={styles.modal_container}
    >
      <Fade in={open}>
        <div className={styles.modal}>
          <div className={styles.row}>
            <p className={styles.title}>Invite Interviewee/Collaborator</p>
            <X onClick={handleClose} />
          </div>
          <div className={styles.input}>
            <input
              type='text'
              placeholder={'Enter Email'}
              onChange={onChangeEmail}
              value={email}
            />
            <Send onClick={onSendCollabRequest} />
          </div>
          <div className={styles.collaborator_list}>
            <ul>
              {interviewee &&
                interviewee.map((inter,index) => (
                  <li key={index}>
                    {inter}
                    <Trash
                      onClick={() => {
                        onDeleteEmail(inter);
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default CollabModal;
