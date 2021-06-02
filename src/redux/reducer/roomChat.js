const initialState = {
  rooms: [],
  room: [],
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
        rooms: action.payload.data.data,
        loading: false,
        error: false,
        message: action.payload.data.msg,
      };
    case "GET_ROOMS_REJECTED":
      return {
        ...state,
        rooms: [],
        loading: false,
        error: true,
        message: action.payload.response.data.msg,
      };
    case "GET_ROOM_PENDING":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "GET_ROOM_FULFILLED":
      return {
        ...state,
        room: action.payload.data.data,
        loading: false,
        error: false,
        message: action.payload.data.msg,
      };
    case "GET_ROOM_REJECTED":
      return {
        ...state,
        room: [],
        loading: false,
        error: true,
        message: action.payload.response.data.msg,
      };
    case "CLEAR_ROOM":
      return {
        ...state,
        room: [],
      };
    default:
      return state;
  }
};

export default roomChat;
