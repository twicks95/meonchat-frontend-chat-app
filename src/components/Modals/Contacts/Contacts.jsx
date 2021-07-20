import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { createRoom } from "../../../redux/action/roomChat.js";
import { getRooms } from "../../../redux/action/roomChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./Contacts.module.css";
import Default from "../../../assets/images/default.jpg";

function Contacts(props) {
  const handleCreateRoom = (userId, friendId) => {
    const date = new Date();
    const roomChat =
      "" + userId + friendId + date.getSeconds() + date.getMonth();

    props.createRoom(parseInt(roomChat), userId, friendId).then(() => {
      props.getRooms(props.auth.data.user_id);
    });
  };

  return (
    <>
      <Modal
        size={"md"}
        show={props.show}
        onHide={props.handleClose}
        className={styles.modal}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            Contact List
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row xs={1} className="gy-2">
            {props.contact.data ? (
              props.contact.data.map((item, index) => (
                <Col key={index}>
                  <div
                    className={`d-flex align-items-center justify-content-between ${styles.list}`}
                  >
                    <img
                      src={
                        item.user_image
                          ? `${process.env.REACT_APP_API_BASE_URL}${item.user_image}`
                          : Default
                      }
                      alt={item.user_name}
                      className={`${styles.listImage}`}
                    />
                    <div className={`${styles.listDetail}`}>
                      <h1>{item.user_name}</h1>
                      <h2 className={`mt-1`}>{item.user_username}</h2>
                    </div>
                    <Button
                      variant="primary"
                      onClick={() =>
                        handleCreateRoom(props.auth.data.user_id, item.user_id)
                      }
                    >
                      Chat
                    </Button>
                  </div>
                </Col>
              ))
            ) : (
              <></>
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="light"
            className="d-flex align-items-center justify-content-center w-100"
            onClick={props.handleClose}
          >
            <FontAwesomeIcon
              icon={faTimes}
              className={`me-2 ${styles.closeIcon}`}
            />
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  contact: state.contact,
});
const mapDispatchToProps = { createRoom, getRooms };
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
