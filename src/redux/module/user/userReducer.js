import Constant from "../../actionType";

const initData = {
  isLogined: false,
};
const user = (state = initData, action) => {
  switch (action.type) {
    case Constant.SIGN_IN:
      return { ...state, ...action.payload };
    case Constant.SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default user;
