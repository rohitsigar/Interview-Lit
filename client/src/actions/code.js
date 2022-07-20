import axios from 'axios';
import { SET_ERROR, SET_OUTPUT, SET_LOADING_TRUE } from './type';
import { api_route, hosted_api_route } from './route';

export const executeCode = async (code, lang, input) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Going to send req');
      const config = { headers: { 'Content-Type': 'application/json' } };
      const body = JSON.stringify({ code, lang, input });
      const res = await axios.post(
        `${api_route}/code?lang=${lang}`,
        body,
        config
      );
      // resolve(res);
      if (res.data.output === '') {
        reject(res.data.misc);
      } else {
        resolve(res.data);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const setLoadingTrue = () => {
  return {
    type: SET_LOADING_TRUE
  };
};
