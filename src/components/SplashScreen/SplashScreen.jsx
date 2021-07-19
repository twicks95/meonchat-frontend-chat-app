import React from "react";
import SplashIcon from "../../assets/icons/splash-icon.svg";
import styles from "./SplashScreen.module.css";

const Splashscreen = ({ splashOn }) => {
  return (
    <div
      className={`${styles.splashBackground} ${
        !splashOn && styles.splashBackgroundOff
      }`}
    >
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-center">
        <img
          src={SplashIcon}
          alt="splash icon"
          className={`mb-2 mb-md-0 ${styles.spinnerIcon}`}
        />
        <span className={styles.splashText}>Welcome to Meonchat App...</span>
      </div>
    </div>
  );
};

export default Splashscreen;
