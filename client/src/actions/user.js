import axios from 'axios';
import { SET_AUTH_FAILURE, SET_AUTH_SUCCESS } from './type';

export const auth = async data => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify(data);
    const res = await axios.post('http://localhost:3000/login/', body, config);
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
