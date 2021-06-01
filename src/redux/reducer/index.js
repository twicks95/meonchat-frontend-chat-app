import { combineReducers } from "redux";

import auth from "./auth";
import user from "./user";
import contact from "./contact";
import roomChat from "./roomChat";
import chat from "./chat";

export default combineReducers({
  auth,
  user,
  contact,
  roomChat,
  chat,
});
