import { useState, useEffect } from "react";
import styles from "./Chat.module.css";
import Leftbar from "../../../components/Leftbar/Leftbar";
import ContactInfo from "../../../components/ContactInfo/ContactInfo";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { getContactInfo } from "../../../redux/action/contact";
import { createChat } from "../../../redux/action/chat";
import { clearRoom } from "../../../redux/action/roomChat";
import TopBarChat from "../../../components/TopBarChat/TopBarChat";
import BottomBarChat from "../../../components/BottomBarChat/BottomBarChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

function Chat(props) {
  const [showInfo, setShowInfo] = useState(false);
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    props.clearRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.socket) {
      props.socket.on("chatMessage", (dataMessage) => {
        setMessages([...messages, dataMessage]);
      });
    }
  }, [props.socket, messages]);

  const handleShowInfo = (userId) => {
    if (!showInfo) {
      props.getContactInfo(userId);
    }
    showInfo ? setShowInfo(false) : setShowInfo(true);
  };

  const changeText = (e) => {
    setMessage(e.target.value);
  };

  const handleSelectRoom = (roomChat) => {
    setRoom(roomChat);
    props.socket.emit("joinRoom", { room });
    // console.log(room);
  };

  const handleSendMessage = () => {
    const setData = {
      roomChat: room,
      senderId: props.auth.data.user_id,
      receiverId: props.roomChat.room[0].friend_id,
      message,
    };
    props.socket.emit("roomMessage", setData);
    // props.createChat(JSON.stringify(setData));
    // props.createChat(JSON.stringify(setData));
    // console.log(JSON.stringify(setData));
    // console.log(setData, "OK")
    setMessage("");
  };

  console.log(messages);

  return (
    <Container fluid className={`d-flex p-0 ${styles.mainContainer}`}>
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
                        styles.chatText
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
const mapDispatchToProps = { getContactInfo, createChat, clearRoom };
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
