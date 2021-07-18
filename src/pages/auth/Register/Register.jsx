import { useState } from "react";
import { Button, Container, Form, Card, Alert, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faEye,
  faEyeSlash,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Register.module.css";
import { connect } from "react-redux";
import { register } from "../../../redux/action/auth";

function Register(props) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  const handleRegister = (event, data) => {
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
    } else {
      setEmptyName(false);
      setEmptyEmail(false);
      setEmptyPassword(false);
      props
        .register(data)
        .then(() => {
          props.history.push("/login");
        })
        .catch(() => {
          setRegisterError(true);
        });
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
            <Form
              className={`${styles.registerForm}`}
              onSubmit={(e) => handleRegister(e, form)}
            >
              {registerError && (
                <Alert variant="danger">{props.auth.message}</Alert>
              )}
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Meonchat App"
                  name="name"
                  value={form.name}
                  onChange={(event) => changeText(event)}
                  className={`shadow-none ${styles.input}`}
                />
                {emptyName && (
                  <p className={`mt-2 ${styles.inputAlert}`}>
                    Please input your name
                  </p>
                )}
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="meonchat@mail.com"
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
              <Form.Group controlId="password" className="mb-5">
                <Form.Label>Password</Form.Label>
                <div className={`${styles.inputPassword}`}>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
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
              {props.auth.loading ? (
                <Button
                  variant="primary"
                  className={`${styles.btnRegister}`}
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
                  className={`${styles.btnRegister}`}
                >
                  Register
                </Button>
              )}
            </Form>
            <span className={`${styles.registerWith}`}>Register with</span>
            <Button
              variant="outline-primary"
              type="submit"
              className={`${styles.btnRegister}`}
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

const mapStateToProps = (state) => ({ auth: state.auth });

const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
