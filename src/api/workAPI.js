import axios from 'axios';
import { serverUrl } from '../util';

const workAPI = {
  getWorkList: async (param) => {
    let data = null;
    try {
      data = await axios.get(`${serverUrl}/work/from-project/${param}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
        },
      });
    } catch (e) {
      console.log(e);
      return e.response;
    }
    return data;
  },
  addWorkList: async (param) => {
    let data = null;
    try {
      data = await axios.post(`${serverUrl}/work`, param, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: '*/*',
      });
    } catch (e) {
      return e.response;
    }
    return data;
  },
};
export default workAPI;
