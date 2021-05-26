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
        data: action.payload,
        loading: false,
        error: false,
        message: action.payload,
      };
    case "LOGIN_REJECTED":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: true,
        message: action.payload,
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
        message: action.payload,
      };
    case "REGISTER_REJECTED":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: true,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
