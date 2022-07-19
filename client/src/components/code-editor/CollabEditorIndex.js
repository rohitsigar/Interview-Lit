import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../constants/theme';
import { GlobalStyles } from '../../constants/global';
import { useDarkMode } from '../../utils/useDarkMode';
import Footer from './Footer.js';
import Editor from './CollabEditor';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from '../../utils/isLoggedIn';
import HeaderCollab from './HeaderCollab';
import { checkAccess } from '../../actions/interview-link';
// import io from 'socket.io-client';
// const ENDPOINT = 'http://localhost:3000';

// const socket = io(ENDPOINT);

const CollabEditorIndex = props => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const history = useHistory();
  const user = useSelector(state => state.user);
  const [users, setUsers] = useState([]);

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    if (!isLoggedIn()) {
      history.push('/');
    } else {
      checkAccessForLink();
    }
  }, []);

  // useEffect(() => {
  //   socket.on('welcome', data => {
  //     console.log('welcome', data);
  //   });
  //   socket.on('end', data => {
  //     console.log(data, 'end');
  //   });
  //   socket.on('setUsersInInterview', data => {
  //     console.log('Users', data);
  //   });
  //   return () => {
  //     socket.emit('endInterview');

  //     socket.off();
  //   };
  // }, []);

  // useEffect(() => {
  //   socket.emit('getUsersInInterview', props.match.params.id);
  // });

  // useEffect(() => {
  //   socket.emit('joinInterview', {
  //     email: user.email,
  //     roomId: props.match.params.id
  //   });

  //   socket.on('log', data => {
  //     console.log('socketData', data);
  //   });
  // }, [props.match.params.id, user]);

  const checkAccessForLink = async () => {
    const access = await checkAccess(props.match.params.id);
    if (!access) history.push('/');
  };

  if (!componentMounted) {
    return <div />;
  }

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <HeaderCollab
        theme={theme}
        toggleTheme={toggleTheme}
        link={props.match.params.id}
      />
      <Footer />
      <Editor theme={theme} roomId={props.match.params.id} />
    </ThemeProvider>
  );
};

export default CollabEditorIndex;
