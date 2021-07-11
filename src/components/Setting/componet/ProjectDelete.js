import { Row, Col, Button } from 'antd';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { projectAPI } from '../../../api';
import { projectAction } from '../../../redux/module/project/projectAction';
const ProjectDelete = (props) => {
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const handleInit = () => {
    dispatch(projectAction.getCurrentProject(props.match.params.id));
  };
  useEffect(() => {
    checkProject();
  }, [project.currentProject]);
  const checkProject = () => {
    if (project.currentProject !== null) {
      if (project.currentProject.userId !== user.userInfo.id) {
        alert('권한이 없습니다.');
        props.history.push(`/app/setting/${props.match.params.id}/user`);
      }
    }
  };
  const handleDelete = async () => {
    const result = await projectAPI.deleteProject(props.match.params.id);
    if (result.status !== 200) {
      alert('프로젝트 삭제 실패');
    } else {
      props.history.push('/app/myProject');
    }
  };
  useEffect(() => {}, [user]);
  return (
    <div>
      333222
      <Row>
        <Col span={4}>프로젝트를 삭제 하시겠습니까?</Col>
        <Col span={4}>
          <Button
            onClick={() => {
              handleDelete();
            }}
          >
            삭제
          </Button>
        </Col>
      </Row>
    </div>
  );
};
export default ProjectDelete;
