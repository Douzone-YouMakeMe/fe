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
  getProjectMemberAll: (param) => async (dispatch) => {
    const res = await memberAPI.getMemberAll(param);
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
  getDetailMembers: (param) => async (dispatch) => {
    const res = await memberAPI.getMembers(param);
    if (res.data === null) {
      dispatch({ type: Constant.PROJECT_GET_FAIL });
    } else {
      dispatch({ type: Constant.GET_MEMBERS, payload: res.data });
    }
  },
  getCurrentProject: (param) => async (dispatch) => {
    const res = await projectAPI.getCurrentProject(param);
    const user = await JSON.parse(localStorage.getItem('userInfo'));
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
  getProjectOne: (param) => async (dispatch) => {
    const res = await projectAPI.getProjectOne(param);
    if (res.data === null) {
      dispatch({ type: 'GET_PROJECT_FAIL', payload: null });
    } else {
      dispatch({ type: Constant.GETCURRENT, payload: res.data[0] });
    }
  },
  getProjectCount: (param) => async (dispatch) => {
    const res = await projectAPI.getAppliedCount(param);
    if (res.status !== 200) {
      dispatch({ type: 'GET_PROJECT_FAIL', payload: null });
    } else {
      dispatch({ type: Constant.GET_COUNT, payload: res.data.length });
    }
  },
  //유저가 프로젝트에 대한 지원한 정보 / 승인 상태 / 프로젝트 아이디 : id , 유저아이디 :userId

  getAppplyListMe: (param) => async (dispatch) => {
    const res = await projectAPI.getAppplyListMe(param);
    if (res.status !== 200) {
      dispatch({ type: 'GET_PROJECT_FAIL', payload: null });
    } else {
      dispatch({ type: Constant.GET_MEMBERS, payload: res.data });
    }
  },
  addWorkList: (param) => async (dispatch) => {
    const res = await workAPI.addWorkList(param);
    if (res.status !== 200) {
      dispatch({ type: 'GET_PROJECT_FAIL', payload: null });
    } else {
      const newRes = await workAPI.getWorkList(param.projectId);
      dispatch({ type: Constant.GET_WORKLIST, payload: newRes.data });
      dispatch({ type: Constant.SET_TEMP, payload: newRes.data });
    }
  },
  modifyWorkList: (param) => async (dispatch) => {
    const res = await workAPI.modifyWorkList(param);
    if (res.status !== 200) {
      dispatch({ type: 'GET_PROJECT_FAIL', payload: null });
    } else {
      const newRes = await workAPI.getWorkList(param.projectId);
      dispatch({ type: Constant.SET_TEMP, payload: newRes.data });
    }
  },
  moveWorkList: (param) => async (dispatch) => {
    const res = await workAPI.moveWorkList(param.id, param.status);
    if (res.status !== 200) {
      dispatch({ type: 'GET_PROJECT_FAIL', payload: null });
    } else {
      const newRes = await workAPI.getWorkList(param.projectId);
      dispatch({ type: Constant.SET_TEMP, payload: newRes.data });
    }
  },
  deleteWork: (param) => async (dispatch) => {
    const res = await workAPI.deleteWorkList(param.id);
    console.log(res);
    if (res.status !== 200) {
      dispatch({ type: 'GET_PROJECT_FAIL', payload: null });
    } else {
      const newRes = await workAPI.getWorkList(param.projectId);
      dispatch({ type: Constant.SET_TEMP, payload: newRes.data });
    }
  },
  // 프로젝트 PATCH 메소드용
  updateProject: (param) => async (dispatch) => {
    const res = await projectAPI.patchProject(param);
    if (res.status !== 200) {
      dispatch({ type: 'GET_PROJECT_FAIL', payload: null });
    } else {
      dispatch({ type: Constant.UPDATE_PROJECT, payload: param });
    }
  },
  approvedMember: (param) => async (dispatch) => {
    const res = await memberAPI.apporovedMember(param);
    if (res.status !== 201) {
      alert('승인에 실패하였습니다.');
    } else {
      return res;
    }
  },
  modifyMember: (param) => async (dispatch) => {
    const res = await projectAPI.modifyApplyProject(param);
    if (res.status !== 201) {
      alert('수정에 실패하였습니다.');
    } else {
      let temp = await projectAPI.getAppplyListMe(param.get('userId'));
      dispatch({ type: Constant.GET_MEMBERS, payload: temp.data });
    }
    return res;
  },
  dropMember: (param) => async (dispatch) => {
    const res = await memberAPI.dropMember(param.id);
    if (res.status !== 200) {
      alert(res.data);
    } else {
      try {
        console.log(param.userId);
        let temp = await projectAPI.getAppplyListMe(param.userId);
        dispatch({ type: Constant.GET_MEMBERS, payload: temp.data });
      } catch (error) {}
    }
    return res;
  },
};
