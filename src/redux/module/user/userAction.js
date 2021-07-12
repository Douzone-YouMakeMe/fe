import Constant from '../../actionType';
import { batch } from 'react-redux';
import { userAPI } from '../../../api';
// const retriveUserData = (store) => (data) => {
//   store.dispatch({
//     type: 'SET_WS_GROUPS',
//     payload: data.groupSet,
//   });
// };
let userQueueReplySubscribe;
let topicNotificationSubscribe;
let topicCallReplySubscribe;
let appGroupGetSubscribe;
let topicGroupSubscribe;
export const userAction = {
  login: (param) => async (dispatch) => {
    const res = await userAPI.login(param);

    if (res.status === 200) {
      const data = res.data[0];
      localStorage.setItem('userInfo', JSON.stringify(data));
      console.log(data);
      batch(() => {
        dispatch({
          type: Constant.LOGIN,
          payload: { userInfo: data },
        });
        dispatch({
          type: Constant.LOGIN_SUCCESS,
          payload: {
            isLogined: true,
          },
        });
      });
    } else {
      dispatch({
        type: Constant.LOGIN_FAIL,
        payload: { isLogined: false, message: res.data },
      });
    }
  },
  logout: () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: Constant.LOGOUT, payload: null });
  },
  modifyUser: (param) => async (dispatch) => {
    const res = await userAPI.modifyUser(param);
    if (res.status !== 200) {
      alert('수정 성공');
      console.log(res);
      localStorage.setItem('userInfo', JSON.stringify(res.data[0]));
      dispatch({ type: Constant.LOGIN, payload: { userInfo: res.data[0] } });
    }

    return res;
  },
};

// const login = param => {
//     const action = (dispatch) => {
//         return ~~;
//     }

//     action
//     --
//     --

//     return ~~~;

// }
