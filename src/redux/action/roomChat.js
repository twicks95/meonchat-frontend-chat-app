import axiosApiInstances from "../../utils/axios.js";

export const getRooms = (userId) => {
  return {
    type: "GET_ROOMS",
    payload: axiosApiInstances.get(`/room/${userId}`),
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
