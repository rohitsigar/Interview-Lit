import {
  SET_INTERVIEW_LINK_LOADING_TRUE,
  INTERVIEW_LINK_GENERATION_SUCCESS,
  FETCH_HOSTED_LINKS_SUCCESS,
  FETCH_COLLAB_SUCCESS
} from '../actions/type';

const initialState = {
  loading: false,
  generatedLinkAsInterviewer: '',
  hostedLinks: [],
  collaborators: []
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
    case FETCH_HOSTED_LINKS_SUCCESS:
      return {
        ...state,
        hostedLinks: action.payload
      };
    case FETCH_COLLAB_SUCCESS:
      // console.log(payload);
      return {
        ...state,
        collaborators: payload
      };
    default:
      return state;
  }
}
