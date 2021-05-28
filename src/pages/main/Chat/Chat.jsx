// import { useEffect, useState } from "react";
import styles from "./Chat.module.css";
import Leftbar from "../../../components/Leftbar/Leftbar";
import ContactInfo from "../../../components/ContactInfo/ContactInfo";
import { Container } from "react-bootstrap";

function Chat(props) {
  return (
    <Container fluid className="d-flex p-0">
      <Leftbar />
      <Container fluid className={`${styles.emptyChat}`}>
        Please select a chat to start messaging
      </Container>
      <ContactInfo />
    </Container>
  );
}

export default Chat;
