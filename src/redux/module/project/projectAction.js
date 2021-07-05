import Constant from '../../actionType';
import { batch } from 'react-redux';
import { projectAPI, memberAPI } from '../../../api';

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
    if (res.data === null) {
      dispatch({ type: Constant.PROJECT_GET_FAIL });
    } else {
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
};
