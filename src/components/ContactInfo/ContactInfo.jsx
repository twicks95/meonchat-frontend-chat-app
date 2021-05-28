// import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./ContactInfo.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import Avatar5 from "../../assets/images/user5.png";
import Chat from "../../assets/icons/Chat.svg";

function ContactInfo(props) {
  // const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.barContainer}`}>
      <div
        className={`d-flex align-items-center justify-content-center ${styles.headBar}`}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={`${styles.chevronLeft} ${styles.textColorPrimary}`}
        />
        <h2 className={`m-0 ${styles.textColorPrimary}`}>@mmldolg</h2>
      </div>
      <div
        className={`border d-flex flex-column align-items-center ${styles.profileContainer}`}
      >
        <img src={Avatar5} alt="avatar" className={styles.avatar} />
        <div className="border border-danger w-100">
          <Row className={styles.detailInfo}>
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-between mb-4"
            >
              <div>
                <h3 className={`m-0 ${styles.name}`}>Mother</h3>
                <span>online</span>
              </div>
              <img src={Chat} alt="chat" className={`${styles.IChat}`} />
            </Col>
            <Col xs={12}>
              <h3 className={`m-0 mb-2 ${styles.phone}`}>Phone number</h3>
              <span>+375(29)9239003</span>
            </Col>
          </Row>
        </div>
        <div className={`border border-success w-100`}>
          <div className={`${styles.navigation}`}>
            <ul
              className={`d-flex align-items-center justify-content-between m-0`}
            >
              <li>Location</li>
              <li className={`${styles.active}`}>Image</li>
              <li>Documents</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
