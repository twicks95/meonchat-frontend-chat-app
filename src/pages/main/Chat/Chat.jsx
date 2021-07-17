/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import styles from "./Chat.module.css";
import Leftbar from "../../../components/Leftbar/Leftbar";
import ContactInfo from "../../../components/ContactInfo/ContactInfo";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { getContacts, getContactInfo } from "../../../redux/action/contact";
import { createChat, getChat } from "../../../redux/action/chat";
import { getRoom, getRooms, clearRoom } from "../../../redux/action/roomChat";
import TopBarChat from "../../../components/TopBarChat/TopBarChat";
import BottomBarChat from "../../../components/BottomBarChat/BottomBarChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

function Chat(props) {
  const [showInfo, setShowInfo] = useState(false);
  // const [room, setRoom] = useState({ new: "", old: "" });
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    props.getContacts(props.auth.data.user_id);
    props.getRooms(props.auth.data.user_id);
    props.clearRoom();
    setMessages([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.socket) {
      props.socket.on("message", (dataMessage) => {
        setMessages([...messages, dataMessage]);
      });
    }
  }, [messages]);

  // useEffect(() => {
  //   props.getChat(room).then(() => {
  //     setMessages(props.chat.data);
  //   });
  // }, [room]);

  const handleShowInfo = (userId) => {
    if (!showInfo) {
      props.getContactInfo(userId);
    }
    showInfo ? setShowInfo(false) : setShowInfo(true);
  };

  const changeText = (e) => {
    setMessage(e.target.value);
  };

  const handleSelectRoom = ({ roomChat, userId }) => {
    props.socket.emit("joinRoom", {
      room,
      username: props.auth.data.user_username,
    });
    setRoom(roomChat);
    props.getRoom(roomChat, userId);
    props.getChat(roomChat).then((res) => {
      setMessages(res.action.payload.data.data);
    });
  };

  const handleSendMessage = () => {
    const setData = {
      roomChat: room,
      senderId: props.auth.data.user_id,
      receiverId: props.roomChat.room[0].friend_id,
      message,
    };
    props.socket.emit("roomMessage", setData);

    // Insert chat data to database
    props.createChat(setData).then((res) => {
      console.log(res);
    });
    setMessage("");
  };

  console.log(messages);

  return (
    <Container
      fluid
      className={`d-flex flex-column flex-md-row p-0 ${styles.mainContainer}`}
    >
      <Leftbar setMessages={setMessages} handleSelectRoom={handleSelectRoom} />
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
            <TopBarChat showInfo={showInfo} handleShowInfo={handleShowInfo} />
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
                      <span>{item.username}</span>
                      <p className="m-0">{item.message}</p>
                    </div>
                  </Col>
                ))}
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
