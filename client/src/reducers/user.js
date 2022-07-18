import { SET_AUTH_SUCCESS, SET_AUTH_FAILURE, LOGOUT } from "../actions/type";

const initialState = {
  name: "",
  email: "",
  image: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "SET_IMAGE":
      return {
        ...state,
        image: action.payload,
      };
    case "SET_USER":
      return { ...state, ...action.payload };
    case SET_AUTH_SUCCESS:
      localStorage.setItem("codex_token", action.token);
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
    case (SET_AUTH_FAILURE, LOGOUT):
      localStorage.removeItem("codex_token");
      return {
        name: "",
        email: "",
        image: "",
      };
    default:
      return state;
  }
};

export default userReducer;
