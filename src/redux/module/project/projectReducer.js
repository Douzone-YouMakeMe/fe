import Constant from '../../actionType';
const initData = {
  currentProject: null,
  myProjectList: null,
  memberList: null,
  workList: null,
  currentMember: null,
  message: '',
  currentComment: [],
};

const project = (state = initData, action) => {
  switch (action.type) {
    case Constant.GET_MYPROJECTS:
      return { ...state, myProjectList: [...action.payload] };
    case 'PROJECT_GET_FAIL':
      return state;
    case Constant.GET_MEMBERS:
      return { ...state, memberList: action.payload };
    case Constant.GET_CURRENT_MEMBER:
      return { ...state, currentMember: action.payload };
    case Constant.GETCURRENT:
      return { ...state, currentProject: { ...action.payload } };
    case Constant.SET_MESSAGE:
      return { ...state, message: action.payload };
    case Constant.SUCCESS_INSERT_COMMENT:
      return {
        ...state,
        currentComment: [...state.currentComment, action.payload],
      };
    case Constant.GET_WORKLIST:
      return { ...state, workList: action.payload };
    case Constant.GET_CURRENT_COMMENT:
      return { ...state, currentComment: action.payload };
    default:
      return state;
  }
};
export default project;
