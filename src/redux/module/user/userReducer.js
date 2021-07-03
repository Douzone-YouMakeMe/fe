import Constant from '../../actionType';

const initData = {
  isLogined: false,
  userInfo: null,
  message: '',
};
const user = (state = initData, action) => {
  switch (action.type) {
    case Constant.LOGIN:
      return { ...state, ...action.payload };
    case Constant.LOGIN_SUCCESS:
      return { ...state, isLogined: action.payload };
    case Constant.LOGIN_FAIL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default user;
