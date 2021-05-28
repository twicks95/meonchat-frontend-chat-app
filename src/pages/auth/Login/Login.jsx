import { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import styles from "./Login.module.css";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { login } from "../../../redux/action/auth";

// import SplashScreen from "../../../components/SplashScreen/SplashScreen";

function Login(props) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();

    if (!form.email && !form.password) {
      setEmptyEmail(true);
      setEmptyPassword(true);
    } else if (form.email && !form.password) {
      setEmptyEmail(false);
      setEmptyPassword(true);
    } else if (form.password && !form.email) {
      setEmptyEmail(true);
      setEmptyPassword(false);
    } else if (!form.email) {
      setEmptyEmail(true);
    } else if (!form.password) {
      setEmptyPassword(true);
    } else {
      setEmptyEmail(false);
      setEmptyPassword(false);
      // props.login(form).then(() => {
      //   localStorage.setItem("token", props.auth.data.data.token);
      //   props.history.push("/chat");
      // });
    }
  };

  const changeText = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleShowHidePassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  console.log(form, emptyEmail, emptyPassword);

  return (
    <>
      {/* <SplashScreen /> */}
      <Container fluid className={`${styles.container}`}>
        <Card className={`${styles.loginCard}`}>
          <Card.Body className={`${styles.cardBody}`}>
            <h1 className={`${styles.cardTitle} ${styles.textColorPrimary}`}>
              Login
            </h1>
            <span>Hi, Welcome back!</span>
            <Form className={`${styles.loginForm}`} onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                {emptyEmail ? (
                  <p className={`mb-2 ${styles.inputAlert}`}>
                    Please input your email
                  </p>
                ) : (
                  <></>
                )}

                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={(event) => changeText(event)}
                  className={`shadow-none ${styles.input}`}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                {emptyPassword ? (
                  <p className={`mt-4 mb-2 ${styles.inputAlert}`}>
                    Please input your password
                  </p>
                ) : (
                  <></>
                )}
                <Form.Label>Password</Form.Label>
                <div className={`${styles.inputPassword}`}>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={form.password}
                    onChange={(event) => changeText(event)}
                    className={`shadow-none ${styles.input}`}
                  />
                  <div
                    className={styles.showHidePassword}
                    onClick={handleShowHidePassword}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className={styles.eyeIcon}
                    />
                  </div>
                </div>
              </Form.Group>
              <Link
                to="/password/reset"
                className={`${styles.forgotPassword} ${styles.textColorPrimary}`}
              >
                Forgot password?
              </Link>
              <Button
                variant="primary"
                type="submit"
                className={`${styles.btnLogin}`}
              >
                Login
              </Button>
            </Form>
            <span className={`${styles.loginWith}`}>Login with</span>
            <Button
              variant="outline-primary"
              type="submit"
              className={`${styles.btnLogin}`}
            >
              <FontAwesomeIcon icon={faGoogle} />
              <span className={`${styles.google}`}>Google</span>
            </Button>
            <span className={`${styles.dontHaveAccount}`}>
              Don’t have an account?{" "}
              <Link to="/register" className={styles.textColorPrimary}>
                Sign Up
              </Link>
            </span>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

const mapDispatchToProps = { login };

export default connect(null, mapDispatchToProps)(Login);
