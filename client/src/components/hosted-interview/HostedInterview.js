import React, { useEffect } from 'react';
import { isLoggedIn } from '../../utils/isLoggedIn';
import { useHistory } from 'react-router-dom';
import Header from '../home/Header';
import styles from './styles/hostedinterview.module.css';
import MeetingDetail from './MeetingDetail';
import { fetchHostedLinks } from '../../actions/interview-link';
import { useDispatch, useSelector } from 'react-redux';

const HostedInterview = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const links = useSelector(state => state.interviewLink.hostedLinks);

  useEffect(() => {
    if (!isLoggedIn()) {
      history.push('/');
    } else {
      fetchLinks();
    }
  }, []);

  const fetchLinks = async () => {
    const res = await fetchHostedLinks();
    dispatch(res);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        {links.length > 0 ? (
          <ul>
            <li>
              <div className={styles.rowDate}>
                <span className={styles.title}>Hosted Interview(s)</span>
              </div>
            </li>

            {links.map((link, index) => (
              <MeetingDetail key={index} link={link} />
            ))}
          </ul>
        ) : (
          <p style={{ alignSelf: 'center' }}>No active interview links</p>
        )}
      </div>
    </>
  );
};

export default HostedInterview;
