import { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import styles from "./ResetPassword.module.css";

import { connect } from "react-redux";
import { login } from "../../../redux/action/auth";

function Login(props) {
  const [email, setEmail] = useState("");
  const [emptyEmail, setEmptyEmail] = useState(false);

  const handleSend = (event) => {
    event.preventDefault();

    if (!email) {
      setEmptyEmail(true);
    } else {
      setEmptyEmail(false);
      // props.login(form).then(() => {
      //   localStorage.setItem("token", props.auth.data.data.token);
      //   props.history.push("/chat");
      // });
    }
  };

  const changeText = (event) => {
    setEmail(event.target.value);
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
              <h1 className={`m-0 ${styles.textColorPrimary}`}>
                Reset Password
              </h1>
            </div>
            <span>You’ll get a message soon on your e-mail</span>
            <Form className={`${styles.loginForm}`} onSubmit={handleSend}>
              <Form.Group controlId="email" className="mb-5">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="meonchat@mail.com"
                  name="email"
                  value={email}
                  onChange={(event) => changeText(event)}
                  className={`shadow-none ${styles.input}`}
                />
                {emptyEmail ? (
                  <p className={`mt-2 ${styles.inputAlert}`}>
                    Please input your email
                  </p>
                ) : (
                  <></>
                )}
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className={`${styles.btnLogin}`}
              >
                Send
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

const mapDispatchToProps = { login };

export default connect(null, mapDispatchToProps)(Login);
