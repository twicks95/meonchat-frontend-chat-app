import React from "react";
import styles from "./TopBarChat.module.css";

import { connect } from "react-redux";

import Default from "../../assets/images/default.jpg";

function TopBarChat(props) {
  const { room } = props.roomChat;
  const { userOnline } = props;
  console.log(room);
  return (
    <div className={`d-flex align-items-center ${styles.topBarChat}`}>
      <div className={``}>
        <img
          src={
            room.length > 0 && room[0].user_image
              ? `${process.env.REACT_APP_API_IMG_URL}${room[0].user_image}`
              : Default
          }
          alt="avatar"
          className={`${styles.avatar}`}
        />
      </div>
      <div className={`mx-3 w-100`}>
        <h1 className="m-0">{room.length > 0 && room[0].user_name}</h1>
        <span>
          {userOnline.includes(room[0].user_id) ? "Online" : "Offline"}
        </span>
      </div>
      <div>
        <div
          className={`${styles.diceMenu}`}
          onClick={() => props.handleShowInfo(room[0].user_id)}
        >
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ roomChat: state.roomChat });
export default connect(mapStateToProps, null)(TopBarChat);
