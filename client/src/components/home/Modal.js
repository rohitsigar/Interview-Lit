import React, { useRef, useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import styles from "./styles/header.module.css";

function useOutsideAlerter(ref, unclick) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        unclick();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, unclick]);
}

function Modal({ user, logout, unclick }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, unclick);

  return (
    <div ref={wrapperRef} className={styles.modal}>
      <img
        className={styles.modalImage}
        src={user.image}
        // className={styles.image}
      />
      <h3 className={styles.modalName}>{user.name}</h3>
      <h4 className={styles.modalEmail}>{user.email}</h4>
      <GoogleLogout
        clientId="356951841595-6v3gpur9sleddtq4l350j62gf8dp8mfj.apps.googleusercontent.com"
        buttonText="Logout"
        render={(renderProps) => (
          <div
            className={styles.logout}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Logout
          </div>
        )}
        onLogoutSuccess={logout}
      ></GoogleLogout>
    </div>
  );
}

export default Modal;
