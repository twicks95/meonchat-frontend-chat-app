import axiosApiInstances from "../../utils/axios";

export const getUserById = (id, email) => {
  return {
    type: "GET_USER",
    payload: axiosApiInstances.get(`/user/?userId=${id}&userEmail=${email}`),
  };
};
export const updateUserName = (id, data) => {
  return {
    type: "UPDATE_NAME",
    payload: axiosApiInstances.patch(`/user/update/name/${id}`, data),
  };
};
export const updateUserUsername = (id, data) => {
  return {
    type: "UPDATE_USERNAME",
    payload: axiosApiInstances.patch(`/user/update/username/${id}`, data),
  };
};
export const updateUserPhone = (id, data) => {
  return {
    type: "UPDATE_PHONE",
    payload: axiosApiInstances.patch(`/user/update/phone/${id}`, data),
  };
};
export const updateUserBio = (id, data) => {
  return {
    type: "UPDATE_BIO",
    payload: axiosApiInstances.patch(`/user/update/bio/${id}`, data),
  };
};
export const updateUserPassword = (id, data) => {
  return {
    type: "UPDATE_PASSWORD",
    payload: axiosApiInstances.patch(`/user/update/password/${id}`, data),
  };
};
export const updateUserImage = (id, data) => {
  return {
    type: "UPDATE_IMAGE",
    payload: axiosApiInstances.patch(`/user/update/image/${id}`, data),
  };
};
