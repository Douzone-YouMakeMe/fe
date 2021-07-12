import axios from 'axios';
import { serverUrl } from '../util';

const memberAPI = {
  getMembers: async (param) => {
    let res;
    try {
      res = await axios.get(`${serverUrl}/member/?projectId=${param}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
        },
      });
    } catch (e) {
      return e.response;
    }
    return res;
  },
  getMemberAll: async (param) => {
    let res;
    try {
      res = await axios.get(`${serverUrl}/member/all/?projectId=${param}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
        },
      });
    } catch (e) {
      return e.response;
    }
    return res;
  },
  dropMember: async (param) => {
    let res;
    try {
      res = await axios.delete(`${serverUrl}/member/${param}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
        },
      });
    } catch (e) {
      return e.response;
    }
    return res;
  },
  apporovedMember: async (param) => {
    let res;
    try {
      res = await axios.patch(
        `${serverUrl}/member/${param.id}`,
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
    return res;
  },
};
export default memberAPI;
