const initialState = {
  data: [],
  loading: false,
  error: false,
  loadingUpdatePassword: false,
  errorUpdatePassword: false,
  loadingUpdateImage: false,
  errorUpdateImage: false,
  message: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_PENDING":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "GET_USER_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        loading: false,
        error: false,
        message: action.payload.data.msg,
      };
    case "GET_USER_REJECTED":
      return {
        ...state,
        data: [],
        loading: false,
        error: true,
        message: action.payload.response.data.msg,
      };
    case "UPDATE_PASSWORD_PENDING":
      return {
        ...state,
        loadingUpdatePassword: true,
        errorUpdatePassword: false,
      };
    case "UPDATE_PASSWORD_FULFILLED":
      return {
        ...state,
        loadingUpdatePassword: false,
        errorUpdatePassword: false,
        message: action.payload.data.msg,
      };
    case "UPDATE_PASSWORD_REJECTED":
      return {
        ...state,
        loadingUpdatePassword: false,
        errorUpdatePassword: true,
        message: action.payload.response.data.msg,
      };
    case "UPDATE_IMAGE_PENDING":
      return {
        ...state,
        loadingUpdateImage: true,
        errorUpdateImage: false,
      };
    case "UPDATE_IMAGE_FULFILLED":
      return {
        ...state,
        loadingUpdateImage: false,
        errorUpdateImage: false,
        message: action.payload.data.msg,
      };
    case "UPDATE_IMAGE_REJECTED":
      return {
        ...state,
        loadingUpdateImage: false,
        errorUpdateImage: true,
        message: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default user;
