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
      result = await axios.post(`${serverUrl}/project`, param, {
        headers: {
          Accept: '*/*',
          'Content-Type':
            'multipart/form-data; boundary=——WebKitFormBoundaryqTqJIxvkWFYqvP5s',
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

  patchProject: async (param) => {
    let result;

    try { 
      // 이거 param중에 projectId를 뽑아내야 한다... 
      // withHeader 경로는 path="/app/projectUpdate/:id"
      // ${serverUrl}/project/${param.projectId}  <= 즉 project/:id를 어떻게 사용하지?
      // -> ProjectUpdate.js 에서 param에다 append(projectId) 한다!
      result = await axios.patch(`${serverUrl}/project/${param.get("projectId")}`, param, {
        headers: {
          Accept: '*/*',
          'Content-Type':
            'multipart/form-data; boundary=——WebKitFormBoundaryqTqJIxvkWFYqvP5s',
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
