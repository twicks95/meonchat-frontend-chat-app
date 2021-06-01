const initialState = {
  data: [],
  loading: false,
  error: false,
  message: "",
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CHAT_PENDING":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "GET_CHAT_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        loading: false,
        error: false,
        message: action.payload.data.msg,
      };
    case "GET_CHAT_REJECTED":
      return {
        ...state,
        data: [],
        loading: false,
        error: true,
        message: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default chat;
