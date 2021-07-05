import axios from 'axios';
import { serverUrl } from '../util';

const USERAPI = {
  login: async (param) => {
    let data = null;
    try {
      data = await axios.post(
        `${serverUrl}/user/login`,
        { ...param },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Accept: '*/*',
          },
        },
      );
    } catch (e) {
      return e.response;
    }
    return data;
  },
  signUp: async (param) => {
    let data = null;
    try {
      data = await axios.post(
        `${serverUrl}/user/signup`,
        { ...param },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Accept: '*/*',
          },
        },
      );
    } catch (e) {
      return e.response;
    }
    return data;
  },
};
export default USERAPI;
