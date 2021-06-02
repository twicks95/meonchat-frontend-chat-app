import axiosApiInstances from "../../utils/axios.js";

export const createContact = (userId, friendId) => {
  return {
    type: "CREATE_CONTACT",
    payload: axiosApiInstances.post(`/contact/${userId}?friendId=${friendId}`),
  };
};
export const getContacts = (userId) => {
  return {
    type: "GET_CONTACTS",
    payload: axiosApiInstances.get(`/contact/${userId}`),
  };
};
export const getContactInfo = (userId) => {
  return {
    type: "GET_CONTACT_INFO",
    payload: axiosApiInstances.get(`/user/?userId=${userId}`),
  };
};
export const getContactByUserAndFriendId = (userId, friendId) => {
  return {
    type: "GET_CONTACT_BY_USER_AND_FRIEND_ID",
    payload: axiosApiInstances.get(
      `/contact/?userId=${userId}&friendId=${friendId}`
    ),
  };
};
