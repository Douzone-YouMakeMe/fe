import Constant from '../../actionType';
import { batch } from 'react-redux';
import { projectAPI, memberAPI, workAPI, commentAPI } from '../../../api';

export const projectAction = {
  getMyProject: (param) => async (dispatch) => {
    const res = await projectAPI.getMyProject(param);
    if (res.data === null) {
      dispatch({ type: 'GET_PROJECT_FAIL', payload: null });
    } else {
      dispatch({ type: Constant.GET_MYPROJECTS, payload: res.data });
    }
  },
  getProjectMembers: (param) => async (dispatch) => {
    const res = await memberAPI.getMembers(param);
    const user = await JSON.parse(localStorage.getItem('userInfo'));

    if (res.data === null) {
      dispatch({ type: Constant.PROJECT_GET_FAIL });
    } else {
      let memberInfo = res.data.filter((value) => {
        return value.userId === user.id;
      });
      dispatch({ type: Constant.GET_CURRENT_MEMBER, payload: memberInfo[0] });
      dispatch({ type: Constant.GET_MEMBERS, payload: res.data });
    }
  },
  getCurrentProject: (param) => async (dispatch) => {
    const res = await projectAPI.getCurrentProject(param);

    if (res.data === null) {
      dispatch({ type: 'GET_PROJECT_FAIL', payload: null });
    } else {
      dispatch({ type: Constant.GETCURRENT, payload: res.data[0] });
    }
  },
  getProjectWork: (param) => async (dispatch) => {
    const res = await workAPI.getWorkList(param);

    if (res.data === null) {
      dispatch({ type: 'GET_PROJECT_FAIL', payload: null });
    } else {
      dispatch({ type: Constant.GET_WORKLIST, payload: res.data });
      dispatch({ type: Constant.SET_TEMP, payload: res.data });
    }
  },
  insertComment: (param) => async (dispatch) => {
    const res = await commentAPI.insertComment(param);
    if (res.status !== 200) {
      dispatch({ type: Constant.SET_MESSAGE, payLoad: res.data });
    } else {
      const subRes = await commentAPI.getComment(param.workId);
      dispatch({ type: Constant.GET_CURRENT_COMMENT, payload: subRes.data });
    }
  },
  getCurrentComment: (param) => async (dispatch) => {
    const res = await commentAPI.getComment(param);
    if (res.status !== 200) {
      dispatch({ type: Constant.GET_CURRENT_COMMENT, payload: [] });
    } else {
      dispatch({ type: Constant.GET_CURRENT_COMMENT, payload: res.data });
    }
  },
};
