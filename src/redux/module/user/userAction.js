import Constant from "../../actionType";
import { batch } from "react-redux";
import { userAPI } from "../../../api";

export const actionCreators = {
  login: (param) => async (dispatch) => {
    const res = await userAPI.login(param);
    console.log(res);
    if (res !== undefined) {
      dispatch({ type: Constant.LOGIN_FAIL, isLogined: false });
    } else {
      const data = res.data[0];
      localStorage.setItem("userInfo", data);
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
