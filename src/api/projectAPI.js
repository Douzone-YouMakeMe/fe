import axios from 'axios';
import { serverUrl } from '../util';

const ProjectApi = {
  getMyProject: async (param) => {
    let result;
    try {
      result = await axios.get(`${serverUrl}/project/user/${param}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
        },
      });
    } catch (e) {
      return e.response;
    }
    return result;
  },
  getCurrentProject: async (param) => {
    let result;
    try {
      result = await axios.get(`${serverUrl}/project/${param}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
        },
      });
    } catch (e) {
      return e.response;
    }
    return result;
  },
  postProject: async (param) => {
    let result;
    
    try {
      result = await axios.post(`${serverUrl}/project`,  param ,{
        headers: {
          Accept: '*/*',
        'Content-Type': 'multipart/form-data; boundary=——WebKitFormBoundaryqTqJIxvkWFYqvP5s',
        'Access-Control-Allow-Origin': '*',
        'cache-control': 'no-cache',
      },
      });
    } catch (e) {
      console.error(e.response);
      return e.response;
    }
    console.log(result);
    return result;
  },


};
export default ProjectApi;
