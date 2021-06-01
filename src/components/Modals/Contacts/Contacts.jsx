import React, { useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { getContacts } from "../../../redux/action/contact";
import styles from "./Contacts.module.css";
import Default from "../../../assets/images/default.jpg";

function Contacts(props) {
  useEffect(() => {
    props.getContacts(props.auth.data.user_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                          ? `http://localhost:3003/api/${item.user_image}`
                          : Default
                      }
                      alt={item.user_name}
                      className={`${styles.listImage}`}
                    />
                    <div className={`${styles.listDetail}`}>
                      <h1>{item.user_name}</h1>
                      <h2 className={`mt-1`}>{item.user_username}</h2>
                    </div>
                    <Button variant="primary">Chat</Button>
                  </div>
                </Col>
              ))
            ) : (
              <></>
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" className="w-100" onClick={props.handleClose}>
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
const mapDispatchToProps = { getContacts };
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
