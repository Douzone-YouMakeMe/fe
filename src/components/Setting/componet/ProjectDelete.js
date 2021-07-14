import { Row, Col, Button, Card, Typography } from 'antd';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { projectAPI } from '../../../api';
import { projectAction } from '../../../redux/module/project/projectAction';
const ProjectDelete = (props) => {
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  useEffect(() => {
    handleInit();
  }, []);
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

  const { Title, Text } = Typography;
  return (
    <div style={{ marginTop: '3%' }}>
      <Card
        style={{
          width: 'auto',
          height: '445px',
          backgroundColor: 'rgba(0, 191, 255, .7)',
          color: '#FFFF',
          borderRadius: '30px',
          border: '2px solid',
          borderColor: '#505050',
        }}
      >
        <Row justify="center" align="middle">
          <Title
            style={{
              color: '#FFFF',
              fontSize: '65px',
              textShadow:
                '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
              marginBottom: '1%',
            }}
          >
            프로젝트 삭제
          </Title>
        </Row>
        <hr></hr>
        <Row justify="center" align="middle">
          <Title
            style={{
              color: '#FFFF',
              fontSize: '40px',
              marginTop: '30PX',
            }}
          >
            프로젝트명 : {project.currentProject.name}
          </Title>
        </Row>
        <Row justify="center" align="middle">
          <Text
            style={{
              color: '#708090',
              fontSize: '20px',
              marginTop: '30PX',
            }}
          >
            프로젝트를 삭제 하시겠습니까?
          </Text>
        </Row>
        <Row justify="center" align="middle">
          <Button
            style={{
              marginTop: '5%',
              width: '100px',
              height: '50px',
              borderRadius: '12px',
              backgroundColor: '#FFFF',
              border: '3px soild',
              borderColor: '#E60A2F',
              fontSize: '25px',
              color: '#E60A2F',
            }}
            onClick={() => {
              handleDelete();
            }}
          >
            삭제
          </Button>
        </Row>
      </Card>
    </div>
  );
};
export default ProjectDelete;

/*
#708090
 border-radius: 12px;
*/
