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
      return e.response;
    }
    return data;
  },
  addWorkList: async (param) => {
    let data = null;
    try {
      data = await axios.post(
        `${serverUrl}/work`,
        { ...param },
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
        },
      );
    } catch (e) {
      return e.response;
    }
    return data;
  },
  modifyWorkList: async (param) => {
    let data = null;
    try {
      data = await axios.put(
        `${serverUrl}/work/${param.id}`,
        { ...param },
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
        },
      );
    } catch (e) {
      return e.response;
    }
    return data;
  },
  moveWorkList: async (id, status) => {
    let data = null;
    try {
      data = await axios.patch(
        `${serverUrl}/work/status`,
        [{ id: id, status: status }],
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
        },
      );
    } catch (e) {
      return e.response;
    }
    return data;
  },
  deleteWorkList: async (id) => {
    let data = null;
    try {
      data = await axios.delete(`${serverUrl}/work/${id}`, {
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
