import { SET_OUTPUT, SET_ERROR, SET_LOADING_TRUE } from "../actions/type";

const initialState = {
  isFetching: false,
  output: "",
  error: "",
};

const codeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_TRUE:
      return {
        ...state,
        isFetching: true,
      };
    case SET_OUTPUT:
      return {
        ...state,
        isFetching: false,
        output: action.payload.output,
        error: "",
      };
    case SET_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        output: "",
      };
    default:
      return state;
  }
};

export default codeReducer;
