// import { SET_OUTPUT, SET_ERROR, SET_LOADING_TRUE } from '../actions/type';

const initialState = {
  name: "",
  email: "",
  image: "",
};

export default function (state = initialState, action) {
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
    default:
      return state;
  }
}
