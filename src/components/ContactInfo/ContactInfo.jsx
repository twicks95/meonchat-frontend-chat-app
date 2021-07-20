import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./ContactInfo.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Default from "../../assets/images/default.jpg";
import Chat from "../../assets/icons/Chat.svg";

import { connect } from "react-redux";

import Img1 from "../../assets/images/img1.jpg";
import Img2 from "../../assets/images/img2.jpg";
import Img3 from "../../assets/images/img3.jpg";
import Img4 from "../../assets/images/img4.jpg";
import Img5 from "../../assets/images/img5.jpg";
import Img6 from "../../assets/images/img6.jpg";
import Img7 from "../../assets/images/img7.jpg";
import Img8 from "../../assets/images/img8.jpg";
import Img9 from "../../assets/images/img9.jpg";
import Img10 from "../../assets/images/img10.jpg";

function ContactInfo(props) {
  const [location, setLocation] = useState(false);
  const [image, setImage] = useState(true);
  const [documents, setDocuments] = useState(false);

  const handleLocation = () => {
    setLocation(true);
    setImage(false);
    setDocuments(false);
  };
  const handleImage = () => {
    setLocation(false);
    setImage(true);
    setDocuments(false);
  };
  const handleDocuments = () => {
    setLocation(false);
    setImage(false);
    setDocuments(true);
  };

  const { contactInfo } = props.contact;

  return (
    <div
      className={`${props.showInfo ? "" : styles.hide} ${styles.barContainer}`}
    >
      <div
        className={`d-flex align-items-center justify-content-center ${styles.headBar}`}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className={`${styles.chevronRight} ${styles.textColorPrimary}`}
          onClick={props.handleShowInfo}
        />
        <h2 className={`m-0 ${styles.textColorPrimary}`}>
          {contactInfo.length > 0 && contactInfo[0].user_username}
        </h2>
      </div>
      <div
        className={`d-flex flex-column align-items-center ${styles.profileContainer}`}
      >
        <img
          src={
            contactInfo.length > 0 && contactInfo[0].user_image
              ? `${process.env.REACT_APP_API_BASE_URL}${contactInfo[0].user_image}`
              : Default
          }
          alt="avatar"
          className={styles.avatar}
        />
        <div className="w-100">
          <Row className={styles.detailInfo}>
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-between mb-4"
            >
              <div>
                <h3 className={`m-0 ${styles.name}`}>
                  {contactInfo.length > 0 && contactInfo[0].user_name}
                </h3>
                <span>online</span>
              </div>
              <img src={Chat} alt="chat" className={`${styles.IChat}`} />
            </Col>
            <Col xs={12}>
              <h3 className={`m-0 mb-2 ${styles.phone}`}>Phone number</h3>
              <span>{contactInfo.length > 0 && contactInfo[0].user_phone}</span>
            </Col>
          </Row>
        </div>
        <div className={`w-100`}>
          <div className={`${styles.navigation}`}>
            <ul
              className={`d-flex align-items-center justify-content-between m-0`}
            >
              <li
                className={`${location ? styles.active : ""}`}
                onClick={handleLocation}
              >
                Location
              </li>
              <li
                className={`${image ? styles.active : ""}`}
                onClick={handleImage}
              >
                Image
              </li>
              <li
                className={`${documents ? styles.active : ""}`}
                onClick={handleDocuments}
              >
                Documents
              </li>
            </ul>
          </div>
          <div className={`${styles.tabulate} mt-4 mb-4`}>
            <Row xs={3} className="gy-2 gx-0">
              <Col>
                <img src={Img1} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img2} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img3} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img4} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img5} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img6} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img7} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img8} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img9} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img10} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img6} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img7} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img8} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img1} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img2} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img3} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img7} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img8} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img9} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img10} alt="img" className={`${styles.image}`} />
              </Col>
              <Col>
                <img src={Img6} alt="img" className={`${styles.image}`} />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ contact: state.contact });
export default connect(mapStateToProps, null)(ContactInfo);
