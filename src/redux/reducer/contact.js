const initialState = {
  data: [],
  loading: false,
  error: false,
  message: "",
};

const contact = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_CONTACT_PENDING":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "CREATE_CONTACT_FULFILLED":
      return {
        ...state,
        loading: false,
        error: false,
      };
    case "CREATE_CONTACT_REJECTED":
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.response.data.msg,
      };
    case "GET_CONTACTS_PENDING":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "GET_CONTACTS_FULFILLED":
      return {
        ...state,
        data: action.payload.data.data,
        loading: false,
        error: false,
        message: action.payload.data.msg,
      };
    case "GET_CONTACTS_REJECTED":
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

export default contact;
