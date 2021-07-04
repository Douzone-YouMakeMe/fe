import Constant from '../../actionType';
const initData = {
  currentProject: null,
  myProjectList: null,
  memberList: null,
};

const project = (state = initData, action) => {
  switch (action.type) {
    case Constant.GET_MYPROJECTS:
      return { ...state, myProjectList: [...action.payload] };
    case 'PROJECT_GET_FAIL':
      return state;
    case Constant.GET_MEMBERS:
      return { ...state, memberList: action.payload };
    case Constant.GETCURRENT:
      return { ...state, currentProject: { ...action.payload } };
    default:
      return state;
  }
};
export default project;
