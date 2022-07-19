import React, { useState } from 'react';
import ToggleTheme from './ToggleTheme';
import styles from './styles/headerStyles.module.css';
import { Code } from 'react-feather';
import { Link } from 'react-router-dom';
import { UserPlus } from 'react-feather';
import CollabModal from '../collab-modal/CollabModal';
import { deleteLink } from '../../actions/interview-link';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const HeaderCollab = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [openCollab, setOpenCollab] = useState(false);

  const toggleCollab = () => {
    setOpenCollab(!openCollab);
  };

  const onDeleteLink = async () => {
    const res = await deleteLink(props.link);
    dispatch(res);
    history.push('/');
  };

  return (
    <>
      <div className={styles.header}>
        <p className={styles.brand}>
          <Code className={styles.icon} />
          Code<span className={styles.letter}>X</span>
        </p>
        <div className={styles.row}>
          <div className={styles.end_meet} onClick={onDeleteLink}>
            <p>End Meet</p>
          </div>
          <div className={styles.share} onClick={toggleCollab}>
            <p>Share</p>
            <UserPlus color={'black'} />
          </div>
          <ToggleTheme {...props} />
        </div>
      </div>
      <CollabModal
        open={openCollab}
        handleClose={toggleCollab}
        link={props.link}
      />
    </>
  );
};

export default HeaderCollab;
