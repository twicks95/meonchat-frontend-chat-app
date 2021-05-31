import { useState } from "react";

// import styles from "./Chat.module.css";
import Leftbar from "../../../components/Leftbar/Leftbar";
import ContactInfo from "../../../components/ContactInfo/ContactInfo";
import { Container } from "react-bootstrap";

import TopBarChat from "../../../components/TopBarChat/TopBarChat";
import BottomBarChat from "../../../components/BottomBarChat/BottomBarChat";

function Chat(props) {
  const [showInfo, setShowInfo] = useState(false);

  const handleShowInfo = () => {
    showInfo ? setShowInfo(false) : setShowInfo(true);
    // if()
  };

  return (
    <Container fluid className="d-flex p-0">
      <Leftbar />
      <Container fluid className={`position-relative p-0`}>
        <TopBarChat showInfo={showInfo} handleShowInfo={handleShowInfo} />
        <div>
          <p>Please select a chat to start messaging</p>
        </div>
        <BottomBarChat />
      </Container>
      <ContactInfo showInfo={showInfo} handleShowInfo={handleShowInfo} />
    </Container>
  );
}

export default Chat;
