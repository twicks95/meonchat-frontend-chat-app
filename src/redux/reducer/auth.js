const initialState = {
  data: {},
  loading: false,
  error: false,
  message: "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_PENDING":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "LOGIN_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        loading: false,
        error: false,
        message: action.payload.data.msg,
      };
    case "LOGIN_REJECTED":
      return {
        ...state,
        data: {},
        loading: false,
        error: true,
        message: action.payload.response.data.msg,
      };
    case "REGISTER_PENDING":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "REGISTER_FULFILLED":
      return {
        ...state,
        loading: false,
        error: false,
        message: action.payload.data.msg,
      };
    case "REGISTER_REJECTED":
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default auth;
