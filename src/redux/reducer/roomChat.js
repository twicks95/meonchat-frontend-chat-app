const initialState = {
  data: [],
  loading: false,
  error: false,
  createLoading: false,
  createError: false,
  message: "",
};

const roomChat = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_ROOM_PENDING":
      return {
        ...state,
        createLoading: true,
        createError: false,
      };
    case "CREATE_ROOM_FULFILLED":
      return {
        ...state,
        createLoading: false,
        createError: false,
        message: action.payload.data.msg,
      };
    case "CREATE_ROOM_REJECTED":
      return {
        ...state,
        createLoading: false,
        createError: true,
        message: action.payload.response.data.msg,
      };
    case "GET_ROOMS_PENDING":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "GET_ROOMS_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        loading: false,
        error: false,
        message: action.payload.data.msg,
      };
    case "GET_ROOMS_REJECTED":
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

export default roomChat;
