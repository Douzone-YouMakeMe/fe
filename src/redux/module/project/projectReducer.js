import Constant from '../../actionType';
const initData = {
  currentProject: null,
  myProjectList: null,
};

const project = (state = initData, action) => {
  switch (action.type) {
    case Constant.GET_MYPROJECTS:
      return { ...state, myProjectList: [...action.payload] };
    case 'PROJECT_GET_FAIL':
      return { ...state };
    default:
      return state;
  }
};
export default project;
