import React, { useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { getFriend } from "../../../redux/action/user";
import {
  createContact,
  getContactByUserAndFriendId,
} from "../../../redux/action/contact";
import styles from "./InviteFriend.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Default from "../../../assets/images/default.jpg";

function InviteFriend(props) {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [addedAsFriend, setAddedAsFriend] = useState(false);

  const changeText = (e) => {
    setEmail(e.target.value);
  };

  const handleSearchFriend = (e, email) => {
    e.preventDefault();
    props.getFriend(null, email).then((result) => {
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
    });
  };

  const handleAddFriend = (userId, friendId) => {
    props.createContact(userId, friendId).then(() => {
      setAddedAsFriend(true);
    });
  };

  const handleClearResult = () => {
    setData([]);
  };
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
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
            {data ? (
              data.map(
                (item, index) => (
                  <Card key={index} className="w-50 text-center">
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
                            handleAddFriend(
                              props.auth.data.user_id,
                              item.user_id
                            )
                          }
                        >
                          Add Friend
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                )
                // console.log(item)
              )
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
                icon={faTimes}
                className={`me-2 ${styles.closeIcon}`}
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
  createContact,
  getContactByUserAndFriendId,
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriend);
