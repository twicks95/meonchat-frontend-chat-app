import React from "react";
import styles from "./ChatList.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import { Col, Row } from "react-bootstrap";

function ChatList(props) {
  return (
    <div className={`${styles.chatListContainer}`}>
      <Row>
        <Col
          xs={3}
          className={`d-flex align-items-center ${styles.avatarContainer}`}
        >
          <img src={props.avatar} alt="avatar" className={styles.avatar} />
          {props.online ? (
            <FontAwesomeIcon
              icon={faCircle}
              style={{ width: "50%" }}
              className={`${styles.onlineSign}`}
            />
          ) : (
            <></>
          )}
        </Col>
        <Col xs={6} className="d-flex align-items-center">
          <div>
            <h5>{props.name}</h5>
            <p title={props.lastChat} className="m-0">
              {props.lastChat}
            </p>
          </div>
        </Col>
        <Col
          xs={3}
          className="d-flex flex-column align-items-end justify-content-between"
        >
          <span className={`mt-2 ${styles.time}`}>{props.lastTime}</span>
          <div
            className={`d-flex align-items-center justify-content-center mb-2 ${styles.unreadChatCount}`}
          >
            {props.unreadMessage}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ChatList;
