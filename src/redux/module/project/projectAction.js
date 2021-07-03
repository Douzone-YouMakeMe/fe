import Constant from '../../actionType';
import { batch } from 'react-redux';
import { projectAPI } from '../../../api';

export const projectAction = {
  getMyProject: (param) => async (dispatch) => {
    const res = await projectAPI.getMyProject(param);
    if (res.data === null) {
      dispatch({ type: 'GET_PROJECT_FAIL', payload: null });
    } else {
      dispatch({ type: Constant.GET_MYPROJECTS, payload: res.data });
    }
  },
};
