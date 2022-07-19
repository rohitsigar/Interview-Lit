import React, { useEffect, useState } from 'react';
import Footer from '../code-editor/Footer';
import styles from './styles/header.module.css';
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../reducers/actions';
import { FcGoogle } from 'react-icons/fc';
import Modal from './Modal';
import { auth } from '../../actions/user';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [clicked, setClicked] = useState(false);

  const responseGoogle = res => {
    if (res.error) {
      console.log(res.error);
      return;
    }
    console.log(res);
    const user = {
      email: res.profileObj.email,
      name: res.profileObj.name,
      image: res.profileObj.imageUrl
    };
    authorize(user);
    //dispatch(setUser(user));
  };

  const authorize = async user => {
    const res = await auth(user);
    dispatch(res);
  };

  const logout = () => {
    console.log('User logged Out');
    const user = {
      email: '',
      name: '',
      image: ''
    };
    dispatch(setUser(user));
    setClicked(false);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <div className={styles.header_container}>
        {user.name == '' ? (
          <GoogleLogin
            clientId='356951841595-6v3gpur9sleddtq4l350j62gf8dp8mfj.apps.googleusercontent.com'
            buttonText='Google Login'
            render={renderProps => (
              <div className={styles.loginButton}>
                <FcGoogle style={{ marginRight: 10, fontSize: '1.5em' }} />
                <span
                  className={styles.login}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Login with Google
                </span>
              </div>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            isSignedIn={true}
            cookiePolicy={'single_host_origin'}
          />
        ) : (
          <>
            <div className={styles.profileImage}>
              <img
                onClick={handleClick}
                src={user.image}
                className={styles.image}
              />
              {clicked ? (
                <Modal
                  user={user}
                  logout={logout}
                  unclick={() => setClicked(false)}
                />
              ) : null}
            </div>
          </>
        )}

        {/* <button className={styles.header_button}>Login</button> */}
      </div>
      <Footer />
    </>
  );
};

export default Header;
