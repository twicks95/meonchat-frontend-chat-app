import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Splashscreen from "../../../components/SplashScreen/SplashScreen";
import styles from "./Home.module.css";

function Home(props) {
  const [splashOn, setSplashOn] = useState(true);

  const handleLogin = () => {
    props.history.push("/login");
  };

  const handleRegister = () => {
    props.history.push("/register");
  };

  useEffect(() => {
    setTimeout(() => {
      setSplashOn(false);
    }, 5000);
  }, []);

  return (
    <div className={`${styles.container}`}>
      <Splashscreen splashOn={splashOn} />
      <div className="d-flex flex-column justify-content-center">
        <h1>Meonchat</h1>
        <p>Share your feeling with friends</p>
        <div className="d-flex mt-5">
          <Button variant="primary" className="me-2" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="outline-primary" onClick={handleRegister}>
            Create account
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
