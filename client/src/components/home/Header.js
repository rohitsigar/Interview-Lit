import React, { useEffect, useState } from "react";
import styles from "./styles/header.module.css";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../code-editor/Footer";
import { setUser } from "../../reducers/actions";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modal";
import { auth, fetchUser, logoutUser } from "../../actions/user";
import { Menu } from "react-feather";
import MenuDrawer from "./Menu";
import { isLoggedIn } from "../../utils/isLoggedIn";
import { useHistory } from "react-router-dom";
import { Code } from "react-feather";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [openMenu, setOpenMenu] = useState(false);
  const [clicked, setClicked] = useState(false);

  const responseGoogle = (res) => {
    if (res.error) {
      console.log(res.error);
      return;
    }
    console.log(res);
    const user = {
      email: res.profileObj.email,
      name: res.profileObj.name,
      image: res.profileObj.imageUrl,
    };
    authorize(user);
    //dispatch(setUser(user));
  };

  const authorize = async (user) => {
    if (localStorage.getItem("codex_token")) {
      const res = await fetchUser();
      dispatch(res);
    } else {
      const res = await auth(user);
      dispatch(res);
    }
  };

  const logout = () => {
    dispatch(logoutUser());
    history.push("/");
    setClicked(false);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <div className={styles.header_container}>
        {isLoggedIn() && (
          <Menu size={50} color={"#ffffff"} onClick={toggleMenu} />
        )}
        {/* <p className={styles.brand}>
          <Code className={styles.icon} />
          Code<span className={styles.letter}>X</span>
        </p> */}

        {user.name == "" ? (
          <GoogleLogin
            clientId="356951841595-6v3gpur9sleddtq4l350j62gf8dp8mfj.apps.googleusercontent.com"
            buttonText="Google Login"
            render={(renderProps) => (
              <div className={styles.loginButton}>
                <FcGoogle style={{ marginRight: 10, fontSize: "1.5em" }} />
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
            cookiePolicy={"single_host_origin"}
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
      </div>
      <Footer />
      <MenuDrawer open={openMenu} handleClose={toggleMenu} />
    </>
  );
};

export default Header;
