import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

import styles from "./BottomBarChat.module.css";

import IPlus from "../../assets/icons/Plus.svg";
import IEmoji from "../../assets/icons/emoji.svg";
import IDice from "../../assets/icons/dice.svg";
import IImage from "../../assets/icons/image.svg";
import IDocuments from "../../assets/icons/documents.svg";
import IUser from "../../assets/icons/Contacts.svg";
import ILocation from "../../assets/icons/Location.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function BottomBarChat(props) {
  const [showAdd, setShowAdd] = useState(false);

  const handleClickAdd = () => {
    showAdd ? setShowAdd(false) : setShowAdd(true);
  };

  return (
    <div
      className={`d-flex align-items-center justify-content-between w-100 ${styles.typingChatBar}`}
    >
      <div className={`d-flex align-items-center ${styles.messageInput}`}>
        <input
          name="message"
          value={props.message}
          placeholder="Type your message..."
          autoComplete="off"
          onChange={(e) => props.changeText(e)}
        />
        <FontAwesomeIcon
          icon={faPaperPlane}
          className={styles.paperPlane}
          onClick={props.handleSendMessage}
        />
      </div>
      <div className={`${styles.actionTyping}`}>
        <div className={`${showAdd ? styles.show : ""} ${styles.collapseMenu}`}>
          <Row className={`d-flex align-items-center ${styles.menu}`}>
            <Col xs={4} className="d-flex justify-content-center">
              <img src={IImage} alt="icon" className={styles.mIcon} />
            </Col>
            <Col className="p-0">Image</Col>
          </Row>
          <Row className={`d-flex align-items-center ${styles.menu}`}>
            <Col xs={4} className="d-flex justify-content-center">
              <img src={IDocuments} alt="icon" className={styles.mIcon} />
            </Col>
            <Col className="p-0">Documents</Col>
          </Row>
          <Row className={`d-flex align-items-center ${styles.menu}`}>
            <Col xs={4} className="d-flex justify-content-center">
              <img src={IUser} alt="icon" className={styles.mIcon} />
            </Col>
            <Col className="p-0">Contacts</Col>
          </Row>
          <Row className={`d-flex align-items-center ${styles.menu}`}>
            <Col xs={4} className="d-flex justify-content-center">
              <img src={ILocation} alt="icon" className={styles.mIconS} />
            </Col>
            <Col className="p-0">Location</Col>
          </Row>
        </div>
        <div className="d-flex justify-content-evenly">
          <img
            src={IPlus}
            alt="add"
            className={styles.icon}
            onClick={handleClickAdd}
          />
          <img src={IEmoji} alt="emoji" className={styles.icon} />
          <img src={IDice} alt="dice" className={styles.icon} />
        </div>
      </div>
    </div>
  );
}

export default BottomBarChat;
