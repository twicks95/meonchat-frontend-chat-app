import { useState } from "react";
import { Button, Container, Form, Card, Alert, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../../redux/action/auth";
import { getUser } from "../../../redux/action/user";

function Login(props) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (event, data) => {
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
    } else {
      setEmptyEmail(false);
      setEmptyPassword(false);
      props
        .login(data)
        .then((result) => {
          localStorage.setItem("token", result.action.payload.data.data.token);
          props.getUser(result.action.payload.data.data.user_id);
          props.history.push("/chat");
        })
        .catch(() => {
          setLoginError(true);
        });
    }
  };

  const changeText = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleShowHidePassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  // console.log(props);

  return (
    <>
      <Container fluid className={`${styles.container}`}>
        <Card className={`${styles.loginCard}`}>
          <Card.Body className={`${styles.cardBody}`}>
            <h1 className={`${styles.cardTitle} ${styles.textColorPrimary}`}>
              Login
            </h1>
            <span>Hi, Welcome back!</span>
            <Form
              className={`${styles.loginForm}`}
              onSubmit={(event) => handleLogin(event, form)}
            >
              {loginError && (
                <Alert variant="danger">{props.auth.message}</Alert>
              )}
              <Form.Group controlId="email" className="mb-3">
                <Form.Label for="email">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={(event) => changeText(event)}
                  className={`shadow-none ${styles.input}`}
                />
                {emptyEmail && (
                  <p className={`mt-2 ${styles.inputAlert}`}>
                    Please input your email
                  </p>
                )}
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label for="password">Password</Form.Label>
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
                {emptyPassword && (
                  <p className={`mt-2 ${styles.inputAlert}`}>
                    Please input your password
                  </p>
                )}
              </Form.Group>
              <Link
                to="/password/reset"
                className={`${styles.forgotPassword} ${styles.textColorPrimary}`}
              >
                Forgot password?
              </Link>
              {props.auth.loading ? (
                <Button
                  variant="primary"
                  className={`${styles.btnLogin}`}
                  disabled
                >
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Loading...</span>
                </Button>
              ) : (
                <Button
                  variant="primary"
                  type="submit"
                  className={`${styles.btnLogin}`}
                >
                  Login
                </Button>
              )}
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

const mapStateToProps = (state) => ({ auth: state.auth });

const mapDispatchToProps = { login, getUser };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
