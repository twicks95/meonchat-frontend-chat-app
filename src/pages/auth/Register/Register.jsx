import { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faEye,
  faEyeSlash,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Register.module.css";

import { connect } from "react-redux";
import { login } from "../../../redux/action/auth";

function Login(props) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();

    // when name, email and password empty
    if (!form.name && !form.email && !form.password) {
      setEmptyName(true);
      setEmptyEmail(true);
      setEmptyPassword(true);
    }
    // when name ok, email and password empty
    else if (form.name && !form.email && !form.password) {
      setEmptyName(false);
      setEmptyEmail(true);
      setEmptyPassword(true);
    }
    // when email ok, name and password empty
    else if (form.email && !form.name && !form.password) {
      setEmptyName(true);
      setEmptyEmail(false);
      setEmptyPassword(true);
    }
    // when password ok, name and email empty
    else if (form.password && !form.name && !form.email) {
      setEmptyName(true);
      setEmptyEmail(true);
      setEmptyPassword(false);
    }
    // when name and email ok, but password empty
    else if (form.name && form.email && !form.password) {
      setEmptyName(false);
      setEmptyEmail(false);
      setEmptyPassword(true);
    }
    // when name and password ok, but email empty
    else if (form.name && !form.email && form.password) {
      setEmptyName(false);
      setEmptyEmail(true);
      setEmptyPassword(false);
    }
    // when email and password ok, but name empty
    else if (!form.name && form.email && form.password) {
      setEmptyName(true);
      setEmptyEmail(false);
      setEmptyPassword(false);
    } else if (!form.name) {
      setEmptyName(true);
    } else if (!form.email) {
      setEmptyEmail(true);
    } else if (!form.password) {
      setEmptyPassword(true);
    } else {
      setEmptyName(false);
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

  const handleBackToLogin = () => {
    props.history.push("/login");
  };

  console.log(form, emptyEmail, emptyPassword);

  return (
    <>
      <Container fluid className={`${styles.container}`}>
        <Card className={`${styles.loginCard}`}>
          <Card.Body className={`${styles.cardBody}`}>
            <div
              className={`d-flex align-items-center justify-content-center ${styles.cardTitle}`}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className={`${styles.textColorPrimary} ${styles.chevronLeft}`}
                onClick={handleBackToLogin}
              />
              <h1 className={`m-0 ${styles.textColorPrimary}`}>Register</h1>
            </div>
            <span>Let's create your account!</span>
            <Form className={`${styles.loginForm}`} onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                {emptyName ? (
                  <p className={`mb-2 ${styles.inputAlert}`}>
                    Please input your name
                  </p>
                ) : (
                  <></>
                )}

                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Meonchat App"
                  name="name"
                  value={form.name}
                  onChange={(event) => changeText(event)}
                  className={`${styles.input}`}
                />
              </Form.Group>
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
                  placeholder="meonchat@mail.com"
                  name="email"
                  value={form.email}
                  onChange={(event) => changeText(event)}
                  className={`${styles.input}`}
                />
              </Form.Group>
              <Form.Group className="mb-5">
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
                    placeholder="password"
                    name="password"
                    value={form.password}
                    onChange={(event) => changeText(event)}
                    className={`${styles.input}`}
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
              <Button
                variant="primary"
                type="submit"
                className={`${styles.btnLogin}`}
              >
                Register
              </Button>
            </Form>
            <span className={`${styles.loginWith}`}>Register with</span>
            <Button
              variant="outline-primary"
              type="submit"
              className={`${styles.btnLogin}`}
            >
              <FontAwesomeIcon icon={faGoogle} />
              <span className={`${styles.google}`}>Google</span>
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

const mapDispatchToProps = { login };

export default connect(null, mapDispatchToProps)(Login);
