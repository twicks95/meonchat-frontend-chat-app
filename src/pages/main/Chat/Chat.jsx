/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import styles from "./Chat.module.css";
import Leftbar from "../../../components/Leftbar/Leftbar";
import ContactInfo from "../../../components/ContactInfo/ContactInfo";
import { Col, Container, Row, Spinner, Toast } from "react-bootstrap";
import { connect } from "react-redux";
import { getContacts, getContactInfo } from "../../../redux/action/contact";
import { createChat, getChat } from "../../../redux/action/chat";
import { getRoom, getRooms, clearRoom } from "../../../redux/action/roomChat";
import TopBarChat from "../../../components/TopBarChat/TopBarChat";
import BottomBarChat from "../../../components/BottomBarChat/BottomBarChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faInfo } from "@fortawesome/free-solid-svg-icons";

function Chat(props) {
  const [showInfo, setShowInfo] = useState(false);
  const [room, setRoom] = useState({ new: "", old: "" });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userOnline, setUserOnline] = useState([]);
  const [notif, setNotif] = useState({ show: false });
  const [typing, setTyping] = useState({ typing: false });

  useEffect(() => {
    props.getContacts(props.auth.data.user_id);
    props.getRooms(props.auth.data.user_id);
    props.clearRoom();
    setMessages([]);
  }, []);

  useEffect(() => {
    if (props.socket) {
      connect();
    }
  }, [props.socket, messages]);

  const connect = () => {
    props.socket.emit("connectServer", { userId: props.auth.data.user_id });
    props.socket.on("listUserOnline", (list) => {
      setUserOnline(list);
    });
    props.socket.on("message", (dataMessage) => {
      setMessages([...messages, dataMessage]);
    });
    props.socket.on("notifMessage", (data) => {
      setNotif(data);
    });
    props.socket.on("typing", (data) => {
      setTyping(data);
    });
  };

  const handleShowInfo = (userId) => {
    if (!showInfo) {
      props.getContactInfo(userId);
    }
    showInfo ? setShowInfo(false) : setShowInfo(true);
  };

  const changeText = (e) => {
    setMessage(e.target.value);
    props.socket.emit("typing", {
      room: room.new,
      typing: true,
    });
  };

  const handleSelectRoom = ({ roomChat, userId }) => {
    props.getRoom(roomChat, userId);
    props.getChat(roomChat).then((res) => {
      setMessages(res.action.payload.data.data);
    });
    props.socket.emit("joinRoom", {
      room: roomChat,
      oldRoom: room.old,
    });
    setRoom({ ...room, new: roomChat, old: roomChat });
  };

  const handleSendMessage = () => {
    if (message !== "") {
      const setData = {
        roomChat: room.new,
        senderId: props.auth.data.user_id,
        userName: props.auth.data.user_name,
        receiverId: props.roomChat.room[0].friend_id,
        message,
        show: true,
      };
      props.socket.emit("sendMessage", setData);
      props.socket.emit("notifMessage", setData);
      props.socket.emit("typing", {
        room: room.new,
        typing: false,
      });
      // Insert chat data to database
      props.createChat(setData);
    }
    setMessage("");
  };

  console.log(messages);

  return (
    <Container
      fluid
      className={`d-flex flex-column flex-md-row p-0 ${styles.mainContainer}`}
    >
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 10,
          zIndex: 100,
        }}
      >
        <Toast
          onClose={() => setNotif({ ...notif, show: false })}
          show={notif.show}
          delay={5000}
          autohide
          className={styles.toast}
          style={{ backgroundColor: "white", width: "350px" }}
        >
          <Toast.Header closeButton={false}>
            <FontAwesomeIcon icon={faInfo} className="me-2" />
            <strong className="me-auto">
              From: <span>{notif.userName}</span>
            </strong>
            <small>Meonchat</small>
          </Toast.Header>
          <Toast.Body className="text-start">{notif.message}</Toast.Body>
        </Toast>
      </div>
      <Leftbar
        userOnline={userOnline}
        setMessages={setMessages}
        handleSelectRoom={handleSelectRoom}
        socket={props.socket}
      />
      <Container
        fluid
        className={`position-relative p-0 ${styles.chatContainer}`}
      >
        {props.roomChat.room.length === 0 ? (
          <div
            className={`d-flex flex-column align-items-center justify-content-center h-100 ${styles.emptyChat}`}
          >
            <FontAwesomeIcon icon={faComments} size="2x" className="mb-2" />
            <p>Please select a chat to start messaging</p>
          </div>
        ) : (
          <>
            <TopBarChat
              userOnline={userOnline}
              showInfo={showInfo}
              handleShowInfo={handleShowInfo}
            />
            <div className={`d-flex flex-column ${styles.chatContents}`}>
              <Row xs={1}>
                {messages.map((item, index) => (
                  <Col
                    key={index}
                    className={`d-flex gy-4 ${
                      item.sender_id === props.auth.data.user_id ||
                      item.senderId === props.auth.data.user_id
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`d-flex align-items-center ${
                        styles.chatTxtContainer
                      } ${
                        item.sender_id === props.auth.data.user_id ||
                        item.senderId === props.auth.data.user_id
                          ? styles.receiver
                          : styles.sender
                      }`}
                    >
                      <p className="m-0">{item.message}</p>
                    </div>
                  </Col>
                ))}
                {typing.typing && (
                  <Col className="justify-content-start">
                    <div
                      className={`d-flex align-items-center mt-2 ${styles.chatTxtContainer} ${styles.sender}`}
                    >
                      <p className="m-0">
                        <Spinner animation="grow" size="sm" className="me-2" />
                        Typing...
                      </p>
                    </div>
                  </Col>
                )}
              </Row>
            </div>
            <BottomBarChat
              message={message}
              changeText={changeText}
              handleSendMessage={handleSendMessage}
            />
          </>
        )}
      </Container>
      <ContactInfo showInfo={showInfo} handleShowInfo={handleShowInfo} />
    </Container>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
  roomChat: state.roomChat,
});
const mapDispatchToProps = {
  getContactInfo,
  getRoom,
  getRooms,
  getChat,
  getContacts,
  createChat,
  clearRoom,
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
