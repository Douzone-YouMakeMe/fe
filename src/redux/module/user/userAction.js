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
export const actionCreators = {
  login: (param) => async (dispatch) => {
    const res = await userAPI.login(param);

    if (res.status === 401) {
      dispatch({
        type: Constant.LOGIN_FAIL,
        payload: { isLogined: false, message: res.data },
      });
    } else {
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
    }
  },
  logout: () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: Constant.LOGOUT, payload: null });
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
