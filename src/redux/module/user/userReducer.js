import Constant from '../../actionType';

const initData = {
  isLogined: false,
  userInfo: JSON.parse(localStorage.getItem('userInfo')),
  message: '',
  wsCleint: null,
  chatHistory: null,
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
    case Constant.INITSOCKET:
      return { ...state, wsCleint: action.payload };
    case Constant.SET_CHAT_HISTORY:
      return {
        ...state,
        chatHistory: action.payload,
      };
    case Constant.ADD_CHAT_HISTORY:
      return { ...state, chatHistory: [...state.chatHistory, action.payload] };
    case Constant.LEAVE_CHAT:
      return { ...state, chatHistory: null };
    default:
      return state;
  }
};
export default user;
