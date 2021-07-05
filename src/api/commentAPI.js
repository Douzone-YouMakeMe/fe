import axios from 'axios';
import { serverUrl } from '../util';

const commentAPI = {
  insertComment: async (param) => {
    let data = null;
    try {
      data = await axios.post(
        `${serverUrl}/comment`,
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
  getComment: async (param) => {
    let data = null;
    try {
      data = await axios.get(`${serverUrl}/comment/from-work?id=${param}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
        },
      });
    } catch (e) {
      return e.response;
    }
    return data;
  },
};
export default commentAPI;
