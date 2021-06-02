import axiosApiInstances from "../../utils/axios.js";

export const getRooms = (userId) => {
  return {
    type: "GET_ROOMS",
    payload: axiosApiInstances.get(`/room/${userId}`),
  };
};
export const getRoom = (room, userId) => {
  return {
    type: "GET_ROOM",
    payload: axiosApiInstances.get(`/room?room=${room}&userId=${userId}`),
  };
};
export const createRoom = (roomChat, userId, friendId) => {
  return {
    type: "CREATE_ROOM",
    payload: axiosApiInstances.post(
      `/room/?roomChat=${roomChat}&userId=${userId}&friendId=${friendId}`
    ),
  };
};
export const clearRoom = () => {
  return {
    type: "CLEAR_ROOM",
  };
};
