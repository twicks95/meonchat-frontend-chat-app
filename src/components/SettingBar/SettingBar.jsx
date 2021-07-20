import { useState } from "react";
import { Alert, Button, Col, Form, Modal, Row, Toast } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import styles from "./SettingBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faEdit,
  faSave,
  faLock,
  faSignOutAlt,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {
  getUser,
  updateUserName,
  updateUserUsername,
  updateUserPhone,
  updateUserBio,
  updateUserPassword,
  updateUserImage,
} from "../../redux/action/user";
import NoPict from "../../assets/images/default.jpg";

function Settingbar(props) {
  const { user_id } = props.auth.data;
  const { user_name, user_username, user_phone, user_bio, user_image } =
    props.user.data[0];

  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState(user_phone);
  const [name, setName] = useState(user_name);
  const [username, setUsername] = useState(user_username);
  const [bio, setBio] = useState(user_bio);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editPhone, setEditPhone] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [imageSuccess, setImageSuccess] = useState(false);
  const [imageError, setImageError] = useState(false);

  // State for modal
  const [smShow, setSmShow] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setPasswordSuccess(false);
    setPasswordError(false);
  };
  // ========================

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setSmShow(true);
  };
  const handleUploadImage = (id, data) => {
    const formData = new FormData();
    for (const field in data) {
      formData.append(field, data[field]);
    }
    props
      .updateUserImage(id, formData)
      .then(() => {
        props.getUser(id);
        setSmShow(false);
        setImageSuccess(true);
        setImage(null);
      })
      .catch(() => {
        setImageError(true);
      });
  };

  const changeText = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    } else {
      setBio(e.target.value);
    }
  };

  const handleUpdatePassword = (id, data) => {
    props
      .updateUserPassword(id, data)
      .then(() => {
        setPasswordSuccess(true);
      })
      .catch(() => {
        setPasswordError(true);
      });
  };

  const handleEditName = () => {
    editName ? setEditName(false) : setEditName(true);
  };
  const handleEditPhone = () => {
    editPhone ? setEditPhone(false) : setEditPhone(true);
  };
  const handleEditUsername = () => {
    editUsername ? setEditUsername(false) : setEditUsername(true);
  };
  const handleEditBio = () => {
    editBio ? setEditBio(false) : setEditBio(true);
  };

  const handleSaveName = (id, data) => {
    setEditName(false);
    props.updateUserName(id, data).then(() => {
      props.getUser(id);
    });
  };
  const handleSavePhone = (id, data) => {
    setEditPhone(false);
    props.updateUserPhone(id, data).then(() => {
      props.getUser(id);
    });
  };
  const handleSaveUsername = (id, data) => {
    setEditUsername(false);
    props.updateUserUsername(id, data).then(() => {
      props.getUser(id);
    });
  };
  const handleSaveBio = (id, data) => {
    setEditBio(false);
    props.updateUserBio(id, data).then(() => {
      props.getUser(id);
    });
  };

  const handleLogout = () => {
    const userId = user_id;
    props.socket.emit("disconnectServer", { userId });
    localStorage.clear();
    props.history.push("/login");
  };

  return (
    <div className={`${styles.barContainer}`}>
      <Toast
        onClose={() => setImageSuccess(false)}
        show={imageSuccess}
        delay={5000}
        className={styles.imageToast}
        autohide
      >
        <Toast.Header closeButton={false}>
          <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
          <strong className="mr-auto">Image upload</strong>
        </Toast.Header>
        <Toast.Body>
          Good Pose! Your profile picture just updated successfully...
        </Toast.Body>
      </Toast>

      {/* Modal */}
      <div>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {passwordError ? (
              <Alert variant="danger">{props.user.message}</Alert>
            ) : passwordSuccess ? (
              <Alert variant="success">{props.user.message}</Alert>
            ) : (
              <></>
            )}

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                placeholder="Password"
                onChange={changeText}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={changeText}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                handleUpdatePassword(user_id, { newPassword, confirmPassword })
              }
            >
              Change my password
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          size="sm"
          show={smShow}
          onHide={() => {
            setSmShow(false);
            setImage(null);
            setImageError(false);
          }}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header>
            <Modal.Title id="example-modal-sizes-title-sm">
              Change Picture
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Sure want to change your profile picture?
            {imageError && (
              <Alert variant="danger" className="mt-4">
                {props.user.message}
              </Alert>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setSmShow(false);
                setImage(null);
                setImageError(false);
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => handleUploadImage(user_id, { image })}
            >
              Change
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* =================== */}
      <div
        className={`d-flex align-items-center justify-content-center ${styles.textColorPrimary} ${styles.headBar}`}
      >
        <h1 className={`m-0`}>meonchat</h1>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={`${styles.chevronLeft}`}
          onClick={props.handleClickSetting}
        />
      </div>
      <div
        className={`d-flex flex-column align-items-center ${styles.settingContainer}`}
      >
        <div
          className={`d-flex flex-column align-items-center ${styles.topContainer}`}
        >
          <div className={`mb-3 ${styles.avaContainer}`}>
            <label htmlFor="upload">
              <img
                src={
                  user_image
                    ? `${process.env.REACT_APP_API_BASE_URL}${user_image}`
                    : NoPict
                }
                alt="avatar"
                className={styles.avatar}
              />
            </label>
            <input
              type="file"
              id="upload"
              className="d-none"
              onChange={(e) => handleImage(e)}
            />
          </div>
          <div
            className={`d-flex justify-content-center position-relative w-100 ${styles.row}`}
          >
            {!editName ? (
              <h1
                className={`text-center position-relative m-0 ${styles.detail}`}
              >
                {user_name}
              </h1>
            ) : (
              <>
                <label htmlFor="name" className={styles.inputLabel} />
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={name}
                  className={`${editName ? "" : styles.hide} ${
                    styles.inputName
                  }`}
                  onChange={(e) => changeText(e)}
                />
              </>
            )}
            <FontAwesomeIcon
              icon={editName ? faSave : faEdit}
              className={`${styles.editIconName}`}
              onClick={
                editName
                  ? () => handleSaveName(user_id, { name })
                  : handleEditName
              }
            />
          </div>
          <span>{user_username ? user_username : "@username"}</span>
        </div>
        <div className="mt-5 w-100">
          <h2 className={`m-0 ${styles.label}`}>Account</h2>
          <Row className={`mt-4 ${styles.detailInfo}`}>
            <Col xs={12} className={`${styles.row}`}>
              <div
                className={`d-flex align-items-center justify-content-between mb-1`}
              >
                {!editPhone ? (
                  <h3 className={`m-0 ${styles.detail}`}>
                    {user_phone ? user_phone : "Set your phone number"}
                  </h3>
                ) : (
                  <>
                    <label htmlFor="phone" className={styles.inputLabel} />
                    <input
                      id="phone"
                      type="text"
                      name="phone"
                      value={phone}
                      className={`${editPhone ? "" : styles.hide}`}
                      onChange={(e) => changeText(e)}
                    />
                  </>
                )}

                <FontAwesomeIcon
                  icon={editPhone ? faSave : faEdit}
                  className={`${styles.editIcon}`}
                  onClick={
                    editPhone
                      ? () => handleSavePhone(user_id, { phone })
                      : handleEditPhone
                  }
                />
              </div>
              <span>Phone number</span>
            </Col>
            <hr className="my-4" />
            <Col xs={12} className={`${styles.row}`}>
              <div
                className={`d-flex align-items-center justify-content-between mb-1`}
              >
                {!editUsername ? (
                  <h3 className={`m-0 ${styles.detail}`}>
                    {user_username ? user_username : "Set your username"}
                  </h3>
                ) : (
                  <>
                    <label htmlFor="username" className={styles.inputLabel} />
                    <input
                      id="username"
                      type="text"
                      name="username"
                      value={username}
                      className={`${editUsername ? "" : styles.hide}`}
                      onChange={(e) => changeText(e)}
                    />
                  </>
                )}

                <FontAwesomeIcon
                  icon={editUsername ? faSave : faEdit}
                  className={`${styles.editIcon}`}
                  onClick={
                    editUsername
                      ? () => handleSaveUsername(user_id, { username })
                      : handleEditUsername
                  }
                />
              </div>
              <span>Username</span>
            </Col>
            <hr className="my-4" />
            <Col xs={12} className={`${styles.row}`}>
              <div
                className={`d-flex align-items-center justify-content-between mb-1`}
              >
                {!editBio ? (
                  <h3 className={`m-0 ${styles.detail}`}>
                    {user_bio ? user_bio : "Create your short bio"}
                  </h3>
                ) : (
                  <>
                    <label htmlFor="bio" className={styles.inputLabel} />
                    <textarea
                      id="bio"
                      type="text"
                      name="bio"
                      value={bio}
                      className={`${editBio ? "" : styles.hide}`}
                      onChange={(e) => changeText(e)}
                    />
                  </>
                )}

                <FontAwesomeIcon
                  icon={editBio ? faSave : faEdit}
                  className={`${styles.editIcon}`}
                  onClick={
                    editBio
                      ? () => handleSaveBio(user_id, { bio })
                      : handleEditBio
                  }
                />
              </div>
              <span>Bio</span>
            </Col>
          </Row>
          <h2 className={`mt-5 mb-3 ${styles.label}`}>Settings</h2>
          <div>
            <div
              className={`d-flex align-items-center ${styles.settingActionBtn}`}
              onClick={handleShow}
            >
              <FontAwesomeIcon
                icon={faLock}
                className={`me-4 ${styles.Lock}`}
              />
              <span>Change Password</span>
            </div>
            <div
              className={`d-flex align-items-center ${styles.settingActionBtn}`}
              onClick={handleLogout}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className={`me-4 ${styles.Logout}`}
              />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ auth: state.auth, user: state.user });

const mapDispatchToProps = {
  getUser,
  updateUserName,
  updateUserUsername,
  updateUserPhone,
  updateUserBio,
  updateUserPassword,
  updateUserImage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Settingbar));
