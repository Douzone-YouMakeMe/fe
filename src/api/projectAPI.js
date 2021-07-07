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
<<<<<<< HEAD
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


=======

  getMainProject: async (param) => {
    let result;
    try {
      result = await axios.get(`${serverUrl}/project`, {
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
  getProjectOne: async (param) => {
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
  getAppliedCount: async (param) => {
    let result;
    try {
      result = await axios.get(`${serverUrl}/member/project?id=${param}`, {
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
  //프로젝트 지원하기_API(멀티파트 폼) 화면경로 : /page/project/ProjectApply.js
  postApplyP: async (param) => {
    let result;
    let fromData = new FormData();
    try {
      result = await axios.post(`${serverUrl}/member/${param}`, {
        headers: {
          Accept: '*/*',
          'Content-Type':
            'multipart/form-data; boundary=——WebKitFormBoundaryqTqJIxvkWFYqvP5s',
          'Access-Control-Allow-Origin': '*',
          'cache-control': 'no-cache',
        },
      });
    } catch (e) {
      return e.response;
    }
    return result;
  },
>>>>>>> 7f596047c2634677548fd6e016a0d4b2f5167342
};
export default ProjectApi;
