import React from "react";
import styles from "./TopBarChat.module.css";

import Avatar from "../../assets/images/user5.png";

function TopBarChat(props) {
  return (
    <div className={`d-flex align-items-center ${styles.topBarChat}`}>
      <div className={``}>
        <img src={Avatar} alt="avatar" className={`${styles.avatar}`} />
      </div>
      <div className={`mx-3 w-100`}>
        <h1 className="m-0">Mother</h1>
        <span>Online</span>
      </div>
      <div>
        <div className={`${styles.diceMenu}`} onClick={props.handleShowInfo}>
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>
      </div>
    </div>
  );
}

export default TopBarChat;
