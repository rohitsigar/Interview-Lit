import axios from 'axios';
import {
  INTERVIEW_LINK_GENERATION_FAILURE,
  INTERVIEW_LINK_GENERATION_SUCCESS,
  SET_INTERVIEW_LINK_LOADING_TRUE,
  FETCH_HOSTED_LINKS_FAILURE,
  FETCH_HOSTED_LINKS_SUCCESS,
  DELETE_LINK_FAILURE,
  DELETE_LINK_SUCCESS,
  ADD_COLLAB_FAILURE,
  ADD_COLLAB_SUCCESS,
  FETCH_COLLAB_SUCCESS,
  FETCH_COLLAB_FAILURE,
  FETCH_LINK_DETAIL
} from './type';
import { api_route, hosted_api_route } from './route';
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

export const fetchHostedLinks = async () => {
  try {
    const res = await axios.get(`${api_route}/link/fetchHostedLinks`);
    return {
      type: FETCH_HOSTED_LINKS_SUCCESS,
      payload: res.data.links
    };
  } catch (err) {
    alert('error', err.message || 'Something went wrong');
    return {
      type: FETCH_HOSTED_LINKS_FAILURE
    };
  }
};

export const deleteLink = async link => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ link });
    const res = await axios.post(`${api_route}/link/delete`, body, config);
    if (res) {
      const links = await axios.get(`${api_route}/link/fetchHostedLinks`);
      alert('success', 'Link deleted successfully');
      return {
        type: FETCH_HOSTED_LINKS_SUCCESS,
        payload: links.data.links
      };
    }
  } catch (err) {
    alert('error', err.message || 'Something went wrong');
    return {
      type: DELETE_LINK_FAILURE
    };
  }
};

export const addCollab = async (link, email) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ link, email });
    const res = await axios.put(`${api_route}/link/addEmail`, body, config);
    const res_interviewee = await axios.get(
      `${api_route}/link/fetchInterviewee?link=${link}`
    );
    alert('success', `${email} added as collaborator`);
    return {
      type: FETCH_COLLAB_SUCCESS,
      payload: res_interviewee.data.interviewee
    };
  } catch (error) {
    alert('error', error.message || 'Something went wrong');
    return {
      type: ADD_COLLAB_FAILURE
    };
  }
};

export const deleteCollab = async (link, email) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ link, email });
    const res = await axios.put(`${api_route}/link/removeEmail`, body, config);
    const res_interviewee = await axios.get(
      `${api_route}/link/fetchInterviewee?link=${link}`
    );
    alert('success', `${email} removed from collaborators`);
    return {
      type: FETCH_COLLAB_SUCCESS,
      payload: res_interviewee.data.interviewee
    };
  } catch (error) {
    alert('error', error.message || 'Something went wrong');
    return {
      type: ADD_COLLAB_FAILURE
    };
  }
};

export const fetchCollab = async link => {
  try {
    const res = await axios.get(
      `${api_route}/link/fetchInterviewee?link=${link}`
    );
    return {
      type: FETCH_COLLAB_SUCCESS,
      payload: res.data.interviewee
    };
  } catch (err) {
    return {
      type: FETCH_COLLAB_FAILURE
    };
  }
};

export const checkAccess = async link => {
  try {
    const res = await axios.get(`${api_route}/link/checkaccess?link=${link}`);
    if (res.data.access) {
      // alert('success', res.data.message);
      return true;
    } else {
      console.log('hereup');
      alert('error', res.data.message);
      return false;
    }
    //return res.data.access;
  } catch (error) {
    console.log('here');
    alert('error', error.message);
    return false;
  }
};

export const setLoadingTrue = () => {
  return {
    type: SET_INTERVIEW_LINK_LOADING_TRUE
  };
};
