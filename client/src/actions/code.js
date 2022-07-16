import axios from 'axios';
import { SET_ERROR, SET_OUTPUT, SET_LOADING_TRUE } from './type';

export const executeCode = async (code, lang, input) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ code, lang, input });

    const res = await axios.post(
      `http://localhost:3000/code?lang=${lang}`,
      body,
      config
    );

    if (res.data.status == '500') {
      return {
        type: SET_ERROR,
        payload: res.data.message
      };
    } else {
      return {
        type: SET_OUTPUT,
        payload: res.data
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const setLoadingTrue = () => {
  return {
    type: SET_LOADING_TRUE
  };
};
