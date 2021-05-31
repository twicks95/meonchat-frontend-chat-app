import React from "react";
import { Button } from "react-bootstrap";

import styles from "./Home.module.css";

function Home(props) {
  const handleLogin = () => {
    props.history.push("/login");
  };

  const handleRegister = () => {
    props.history.push("/register");
  };

  return (
    <div className={`${styles.container}`}>
      <div className="">
        <h1>Meonchat</h1>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
        <Button variant="outline-primary" onClick={handleRegister}>
          Create account
        </Button>
      </div>
    </div>
  );
}

export default Home;
