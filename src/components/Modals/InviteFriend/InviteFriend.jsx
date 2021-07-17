import React, { useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { getFriend } from "../../../redux/action/user";
import { getContacts } from "../../../redux/action/contact";
import {
  createContact,
  getContactByUserAndFriendId,
} from "../../../redux/action/contact";
import styles from "./InviteFriend.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Default from "../../../assets/images/default.jpg";

function InviteFriend(props) {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [addedAsFriend, setAddedAsFriend] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const changeText = (e) => {
    setEmail(e.target.value);
  };

  const handleSearchFriend = (e, email) => {
    e.preventDefault();
    props
      .getFriend(null, email)
      .then((result) => {
        setNotFound(false);
        setData(result.action.payload.data.data);
        props
          .getContactByUserAndFriendId(
            props.auth.data.user_id,
            result.action.payload.data.data[0].user_id
          )
          .then(() => {
            setAddedAsFriend(true);
          })
          .catch(() => {
            setAddedAsFriend(false);
          });
      })
      .catch(() => {
        setNotFound(true);
        setData([]);
      });
  };

  const handleAddFriend = (userId, friendId) => {
    props.createContact(userId, friendId).then(() => {
      setAddedAsFriend(true);
      props.getContacts(props.auth.data.user_id);
    });
  };

  const handleClearResult = () => {
    setData([]);
    setEmail("");
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        style={{ scrollbarWidth: "none" }}
      >
        <Modal.Header>
          <Modal.Title>Invite Friend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSearchFriend(e, email)}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Friend Email</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter your friend's email address"
                  className="me-2"
                  onChange={(e) => changeText(e)}
                />
                <Button variant="outline-primary" type="submit">
                  Find
                </Button>
              </div>
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-center mt-5">
            {notFound && <p>User not found</p>}
            {data ? (
              data.map((item, index) => (
                <Card key={index} className={`w-50 text-center ${styles.card}`}>
                  <Card.Img
                    variant="top"
                    src={
                      item.user_image
                        ? `http://localhost:3003/api/${item.user_image}`
                        : Default
                    }
                  />
                  <Card.Body>
                    <Card.Title>{item.user_name}</Card.Title>
                    <Card.Text>{item.user_bio}</Card.Text>
                    {addedAsFriend ? (
                      <Button variant="light" disabled>
                        Added
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        className="w-100"
                        onClick={() =>
                          handleAddFriend(props.auth.data.user_id, item.user_id)
                        }
                      >
                        Add Friend
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              ))
            ) : (
              <></>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          {data.length > 0 && (
            <Button
              variant="light"
              className="d-flex align-items-center"
              onClick={handleClearResult}
            >
              <FontAwesomeIcon
                icon={faTrashAlt}
                className={`me-2 ${styles.trashIcon}`}
              />
              Clear result
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  contact: state.contact,
});

const mapDispatchToProps = {
  getFriend,
  getContacts,
  createContact,
  getContactByUserAndFriendId,
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriend);
