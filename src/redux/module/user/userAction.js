import Constant from "../../actionType";
import { batch } from "react-redux";
import { userAPI } from "../../../api";
export const actionCreators = {
  login: (param) => async (dispatch) => {
    batch(() => {
      dispatch({
        type: Constant.SIGN_IN,
        payload: { user_id: "test", uesr_nm: "test" },
      });
      dispatch({
        type: Constant.SUCCESS,
        payload: {
          isLogined: true,
        },
      });
    });
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
