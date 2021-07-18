import React from "react";
import styles from "./ChatList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";

function ChatList(props) {
  return (
    <div
      className={`${styles.chatListContainer}`}
      onClick={props.handleClickList}
    >
      <Row>
        <Col
          xs={10}
          md={9}
          className={`d-flex align-items-center ${styles.avatarContainer}`}
        >
          <div style={{ position: "relative" }}>
            <img src={props.avatar} alt="avatar" className={styles.avatar} />
            {props.userOnline.includes(props.userId) ? (
              <FontAwesomeIcon
                icon={faCircle}
                style={{ width: "50%" }}
                className={`${styles.onlineSign}`}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="ms-3">
            <h5>{props.name}</h5>
            <p title={props.lastChat} className="m-0">
              {props.lastChat}
            </p>
          </div>
        </Col>
        <Col
          xs={2}
          md={3}
          className="d-flex flex-column align-items-end justify-content-between"
        >
          <span className={`${styles.time}`}>{props.lastTime}</span>
          <div
            className={`d-flex align-items-center justify-content-center ${styles.unreadChatCount}`}
          >
            {props.unreadMessage}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ChatList;
