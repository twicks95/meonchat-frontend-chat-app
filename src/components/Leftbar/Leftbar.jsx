import styles from "./Leftbar.module.css";
import { useState } from "react";
import { connect } from "react-redux";
import ChatList from "./ChatList/ChatList";
import SettingBar from "../SettingBar/SettingBar";
import ISetting from "../../assets/icons/Settings.svg";
import IUser from "../../assets/icons/Contacts.svg";
import IAddUser from "../../assets/icons/Invite friends.svg";
import IFaq from "../../assets/icons/FAQ.svg";
import { Col, Row, Spinner } from "react-bootstrap";
import Search from "../../assets/icons/Search.svg";
import Plus from "../../assets/icons/Plus.svg";
import Default from "../../assets/images/default.jpg";
import InviteFriendModal from "../Modals/InviteFriend/InviteFriend.jsx";
import ContactsModal from "../Modals/Contacts/Contacts.jsx";

function Leftbar(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  // State edit password modal
  const [showContacts, setShowContacts] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const handleContacts = () =>
    showContacts ? setShowContacts(false) : setShowContacts(true);
  const handleInvite = () =>
    showInvite ? setShowInvite(false) : setShowInvite(true);
  // ========================

  const handleClickMenu = () => {
    showMenu ? setShowMenu(false) : setShowMenu(true);
  };
  const handleClickSetting = () => {
    setShowMenu(false);
    showSetting ? setShowSetting(false) : setShowSetting(true);
  };

  return (
    <>
      {showSetting ? (
        <SettingBar
          socket={props.socket}
          handleClickSetting={handleClickSetting}
        />
      ) : (
        <div className={`${styles.barContainer}`}>
          <div
            className={`d-flex align-items-center justify-content-between ${styles.headBar}`}
          >
            <h1 className={`m-0 ${styles.textColorPrimary}`}>meonchat</h1>
            <div>
              <div className={styles.friesMenu} onClick={handleClickMenu}>
                <div className={styles.fries1} />
                <div className={styles.fries2} />
                <div className={styles.fries1} />
              </div>
            </div>
            <div
              className={`${showMenu ? styles.show : ""} ${
                styles.collapseMenu
              }`}
            >
              <Row
                className={`d-flex align-items-center ${styles.menu}`}
                onClick={handleClickSetting}
              >
                <Col xs={4} className="d-flex justify-content-center">
                  <img src={ISetting} alt="icon" className={styles.mIcon} />
                </Col>
                <Col className="p-0">Settings</Col>
              </Row>
              <Row
                className={`d-flex align-items-center ${styles.menu}`}
                onClick={handleContacts}
              >
                <Col xs={4} className="d-flex justify-content-center">
                  <img src={IUser} alt="icon" className={styles.mIcon} />
                </Col>
                <Col className="p-0">Contacts</Col>
              </Row>
              <Row
                className={`d-flex align-items-center ${styles.menu}`}
                onClick={handleInvite}
              >
                <Col xs={4} className="d-flex justify-content-center">
                  <img src={IAddUser} alt="icon" className={styles.mIconS} />
                </Col>
                <Col className="p-0">Invite Friends</Col>
              </Row>
              <Row className={`d-flex align-items-center ${styles.menu}`}>
                <Col xs={4} className="d-flex justify-content-center">
                  <img src={IFaq} alt="icon" className={styles.mIcon} />
                </Col>
                <Col className="p-0">Meonchat FAQ</Col>
              </Row>
            </div>
          </div>
          <div className={`d-flex align-items-center ${styles.searchBar}`}>
            <img src={Search} alt="search" className={`${styles.searchIcon}`} />
            <input type="text" placeholder="Type your message..." />
            <img
              src={Plus}
              alt="add"
              className={`${styles.plusIcon}`}
              onClick={handleContacts}
            />
          </div>
          <div className={`${styles.chatList}`}>
            {props.roomChat.loading ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <Spinner animation="grow" variant="primary" />
              </div>
            ) : (
              props.roomChat.rooms.map((item, index) => (
                <ChatList
                  key={index}
                  avatar={
                    item.user_image
                      ? `http://localhost:3003/api/${item.user_image}`
                      : Default
                  }
                  name={item.user_name}
                  lastChat=""
                  lastTime="15:20"
                  unreadMessage="2"
                  userId={item.friend_id}
                  userOnline={props.userOnline}
                  handleClickList={() => {
                    props.handleSelectRoom({
                      roomChat: item.room_chat,
                      userId: props.auth.data.user_id,
                    });
                  }}
                />
              ))
            )}
          </div>
          <InviteFriendModal show={showInvite} handleClose={handleInvite} />
          <ContactsModal show={showContacts} handleClose={handleContacts} />
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  roomChat: state.roomChat,
});

export default connect(mapStateToProps, null)(Leftbar);
