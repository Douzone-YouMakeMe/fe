import Constant from '../../actionType';
import produce from 'immer';

const initData = {
  currentProject: null,
  myProjectList: null,
  memberList: null,
  workList: null,
  currentMember: null,
  message: '',
  currentComment: [],
  tempWorkList: null,
  count: 0,
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
    case Constant.SET_TEMP:
      return { ...state, tempWorkList: action.payload };
    case Constant.GET_COUNT:
      return { ...state, count: action.payload };
    case Constant.SUCCESS_INSERT_COMMENT:
      return {
        ...state,
        currentComment: [...state.currentComment, action.payload],
      };
    case Constant.LEAVE_WORK:
      return { ...state, workList: action.payload };
    case Constant.GET_WORKLIST:
      return { ...state, workList: action.payload };
    case Constant.GET_CURRENT_COMMENT:
      return { ...state, currentComment: action.payload };
    case Constant.ADD_TEMP:
      return {
        ...state,
        tempWorkList: [...state.tempWorkList, action.payload],
      };
    case Constant.UPDATE_TEMP:
      return produce(state, (draft) => {
        const data = draft.tempWorkList;
        data.splice(action.payload.idx, 1, action.payload.value);
      });
    case Constant.SET_UPDATE:
      return {
        ...state,
        tempWorkList: produce(state.tempWorkList, (draft) => {
          let data = draft.find((value) => {
            return value.id === action.payload.value.id;
          });
          data.name = action.payload.value.name;
          data.status = action.payload.value.status;
        }),
      };
    //프로젝트 내역 PATCH
    case Constant.UPDATE_PROJECT:
      return {
        ...state,
        currentProject: produce(state.currentProject, (draft) => {
          const data = draft;
          data = action.payload;
        }),
      };
    case Constant.LEAVE_PROJECT:
      return { workList: null };
    default:
      return state;
  }
};
export default project;
