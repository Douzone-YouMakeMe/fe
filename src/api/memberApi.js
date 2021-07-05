import axios from 'axios';
import { serverUrl } from '../util';

const memberAPI = {
  getMembers: async (param) => {
    let res;
    try {
      res = await axios.get(`${serverUrl}/member/project?id=${param}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
        },
      });
    } catch (e) {
      console.log(e);
    }
    return res;
  },
};
export default memberAPI;
