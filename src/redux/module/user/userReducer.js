import Constant from '../../actionType';

const initData = {
  isLogined: false,
  userInfo: JSON.parse(localStorage.getItem('userInfo')),
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
    case Constant.LOGOUT:
      return { ...state, isLogined: false, userInfo: null };
    default:
      return state;
  }
};
export default user;
