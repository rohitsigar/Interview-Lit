import {
  SET_INTERVIEW_LINK_LOADING_TRUE,
  INTERVIEW_LINK_GENERATION_SUCCESS
} from '../actions/type';

const initialState = {
  loading: false,
  generatedLinkAsInterviewer: ''
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_INTERVIEW_LINK_LOADING_TRUE:
      return {
        ...state,
        loading: true
      };
    case INTERVIEW_LINK_GENERATION_SUCCESS:
      return {
        ...state,
        loading: false,
        generatedLinkAsInterviewer: payload
      };
    default:
      return state;
  }
}
