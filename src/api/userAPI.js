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
  modifyUser: async (param) => {
    let data = null;
    try {
      data = await axios.patch(`${serverUrl}/user/${param.id}`, param.data, {
        headers: {
          Accept: '*/*',
          'Content-Type':
            'multipart/form-data; boundary=——WebKitFormBoundaryqTqJIxvkWFYqvP5s',
          'Access-Control-Allow-Origin': '*',
          'cache-control': 'no-cache',
        },
      });
    } catch (error) {
      return error.response;
    }
    return data;
  },
  deleteUser: async (param) => {
    let data = null;
    try {
      data = await axios.delete(`${serverUrl}/user/${param.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
        },
      });
    } catch (error) {
      return error.response;
    }
    return data;
  },
};
export default USERAPI;
