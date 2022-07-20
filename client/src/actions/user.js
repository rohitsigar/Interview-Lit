import axios from 'axios';
import {
  SET_AUTH_FAILURE,
  SET_AUTH_SUCCESS,
  FETCH_USER_SUCCESS,
  LOGOUT
} from './type';
import { api_route, hosted_api_route } from './route';

export const auth = async data => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ ...data, dp: data.image });
    const res = await axios.post(`${api_route}/login/`, body, config);
    return {
      type: SET_AUTH_SUCCESS,
      payload: data,
      token: res.data.token
    };
  } catch (err) {
    return {
      type: SET_AUTH_FAILURE
    };
  }
};

export const fetchUser = async () => {
  try {
    const res = await axios.get(`${api_route}/login/`);
    return {
      type: FETCH_USER_SUCCESS,
      payload: res.data.user
    };
  } catch (err) {
    return {
      type: SET_AUTH_FAILURE
    };
  }
};

export const logoutUser = () => {
  return {
    type: LOGOUT
  };
};
