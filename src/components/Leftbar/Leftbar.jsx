import styles from "./Leftbar.module.css";
import { useState } from "react";

import ChatList from "./ChatList/ChatList";
import SettingBar from "../SettingBar/SettingBar";

import ISetting from "../../assets/icons/Settings.svg";
import IUser from "../../assets/icons/Contacts.svg";
import IAddUser from "../../assets/icons/Invite friends.svg";
import IFaq from "../../assets/icons/FAQ.svg";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

import Search from "../../assets/icons/Search.svg";
import Plus from "../../assets/icons/Plus.svg";
import Avatar1 from "../../assets/images/user1.png";
import Avatar2 from "../../assets/images/user2.png";
import Avatar3 from "../../assets/images/user3.png";

function Leftbar(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  // State edit password modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // ========================

  const handleClickMenu = () => {
    showMenu ? setShowMenu(false) : setShowMenu(true);
  };
  const handleClickSetting = () => {
    setShowMenu(false);
    showSetting ? setShowSetting(false) : setShowSetting(true);
  };

  return (
    <>
      {showSetting ? (
        <SettingBar handleClickSetting={handleClickSetting} />
      ) : (
        <div className={`${styles.barContainer}`}>
          <div
            className={`d-flex align-items-center justify-content-between ${styles.headBar}`}
          >
            <h1 className={`m-0 ${styles.textColorPrimary}`}>meonchat</h1>
            <div>
              <div className={styles.friesMenu} onClick={handleClickMenu}>
                <div className={styles.fries1} />
                <div className={styles.fries2} />
                <div className={styles.fries1} />
              </div>
            </div>
            <div
              className={`${showMenu ? styles.show : ""} ${
                styles.collapseMenu
              }`}
            >
              <Row
                className={`d-flex align-items-center ${styles.menu}`}
                onClick={handleClickSetting}
              >
                <Col xs={4} className="d-flex justify-content-center">
                  <img src={ISetting} alt="icon" className={styles.mIcon} />
                </Col>
                <Col className="p-0">Settings</Col>
              </Row>
              <Row className={`d-flex align-items-center ${styles.menu}`}>
                <Col xs={4} className="d-flex justify-content-center">
                  <img src={IUser} alt="icon" className={styles.mIcon} />
                </Col>
                <Col className="p-0">Contacts</Col>
              </Row>
              <Row
                className={`d-flex align-items-center ${styles.menu}`}
                onClick={handleShow}
              >
                <Col xs={4} className="d-flex justify-content-center">
                  <img src={IAddUser} alt="icon" className={styles.mIconS} />
                </Col>
                <Col className="p-0">Invite Friends</Col>
              </Row>
              <Row className={`d-flex align-items-center ${styles.menu}`}>
                <Col xs={4} className="d-flex justify-content-center">
                  <img src={IFaq} alt="icon" className={styles.mIcon} />
                </Col>
                <Col className="p-0">Telegram FAQ</Col>
              </Row>
            </div>
          </div>
          <div className={`d-flex align-items-center ${styles.searchBar}`}>
            <img src={Search} alt="search" className={`${styles.searchIcon}`} />
            <input type="text" placeholder="Type your message..." />
            <img src={Plus} alt="add" className={`${styles.plusIcon}`} />
          </div>
          <div className={`${styles.chatList}`}>
            <ChatList
              avatar={Avatar1}
              name="Theresa Webb"
              lastChat="Why did you do that?"
              lastTime="15:20"
              unreadMessage="2"
            />
            <ChatList
              avatar={Avatar2}
              name="Calvin Flores"
              lastChat="Hi, bro! Come to my house!"
              lastTime="15:13"
              unreadMessage="1"
              online="true"
            />
            <ChatList
              avatar={Avatar3}
              name="Gregory Bell"
              lastChat="Will you stop ignoring me?"
              lastTime="15:13"
              unreadMessage="164"
            />
            <ChatList
              avatar={Avatar3}
              name="Gregory Bell"
              lastChat="Will you stop ignoring me?"
              lastTime="15:13"
              unreadMessage="164"
            />
          </div>
        </div>
      )}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Invite Friend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Friend Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your friend's email address"
              // onChange={changeText}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Leftbar;
