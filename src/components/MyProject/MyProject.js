import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectAction } from '../../redux/module/project/projectAction';

const MyProject = (props) => {
  const user = useSelector((state) => {
    return state.user;
  });
  const list = useSelector((state) => {
    return state.project;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    initProjectList();
    return () => {};
  }, []);
  const initProjectList = async () => {
    await dispatch(projectAction.getMyProject(user.userInfo.id));
  };
  return <div>33223</div>;
};
export default MyProject;
