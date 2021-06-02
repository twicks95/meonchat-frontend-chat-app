import axiosApiInstances from "../../utils/axios";

export const getChat = (roomChat) => {
  return {
    type: "GET_CHAT",
    payload: axiosApiInstances.get(`/chat/${roomChat}`),
  };
};
export const createChat = (data) => {
  return {
    type: "CREATE_CHAT",
    payload: axiosApiInstances.post(`/chat`, data),
  };
};
