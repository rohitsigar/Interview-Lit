import axios from 'axios';
import {
  INTERVIEW_LINK_GENERATION_FAILURE,
  INTERVIEW_LINK_GENERATION_SUCCESS,
  SET_INTERVIEW_LINK_LOADING_TRUE
} from './type';
import { api_route } from './route';
import { alert } from './alert';

export const generateInterviewLink = async () => {
  try {
    const res = await axios.post(`${api_route}/link/generate`);
    if (res) alert('success', 'Link generated successfully');
    return {
      type: INTERVIEW_LINK_GENERATION_SUCCESS,
      payload: res.data.link
    };
  } catch (err) {
    alert('error', err.message || 'Something went wrong');
    return {
      type: INTERVIEW_LINK_GENERATION_FAILURE
    };
  }
};

export const setLoadingTrue = () => {
  return {
    type: SET_INTERVIEW_LINK_LOADING_TRUE
  };
};
