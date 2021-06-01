import { useState } from "react";
import styles from "./Chat.module.css";
import Leftbar from "../../../components/Leftbar/Leftbar";
import ContactInfo from "../../../components/ContactInfo/ContactInfo";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import TopBarChat from "../../../components/TopBarChat/TopBarChat";
import BottomBarChat from "../../../components/BottomBarChat/BottomBarChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

function Chat(props) {
  const [showInfo, setShowInfo] = useState(false);

  const handleShowInfo = () => {
    showInfo ? setShowInfo(false) : setShowInfo(true);
  };

  console.log(props.chat.data.length);

  return (
    <Container fluid className={`d-flex p-0 ${styles.mainContainer}`}>
      <Leftbar />
      <Container
        fluid
        className={`position-relative p-0 ${styles.chatContainer}`}
      >
        {props.chat.data.length === 0 ? (
          <div
            className={`d-flex flex-column align-items-center justify-content-center h-100 ${styles.emptyChat}`}
          >
            <FontAwesomeIcon icon={faComments} size="2x" className="mb-2" />
            <p>Please select a chat to start messaging</p>
          </div>
        ) : (
          <>
            <TopBarChat showInfo={showInfo} handleShowInfo={handleShowInfo} />
            <div className={`d-flex flex-column ${styles.chatContents}`}></div>
            <BottomBarChat />
          </>
        )}
      </Container>
      <ContactInfo showInfo={showInfo} handleShowInfo={handleShowInfo} />
    </Container>
  );
}

const mapStateToProps = (state) => ({ chat: state.chat });
export default connect(mapStateToProps, null)(Chat);
