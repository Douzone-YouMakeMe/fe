import { Row, Col, Button, Card, Typography, Input } from 'antd';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { projectAPI, userAPI } from '../../../api';
import { projectAction } from '../../../redux/module/project/projectAction';
const ProjectDelete = (props) => {
  const [check, setCheck] = useState(true);
  const [password, setPassword] = useState('');
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
        props.history.push(`/app/myProject`);
      }
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const checkPassword = async (e) => {
    const result = await userAPI.login({
      email: user.userInfo.email,
      password: password,
    });
    if (result.status !== 200) {
      alert('비밀번호가 다릅니다.');
      setCheck(true);
    } else {
      setCheck(false);
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
      {project.currentProject !== null && (
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
              프로젝트명 :{project.currentProject.name}
            </Title>
          </Row>
          <Row justify="center" align="middle">
            <Text
              style={{
                color: '#708090',
                fontSize: '20px',
                marginTop: '10PX',
              }}
            >
              프로젝트를 삭제 하시겠습니까?
            </Text>
          </Row>
          <Row justify="center" align="middle" style={{ marginTop: '15px' }}>
            <Col>
              <Input
                value={password}
                onChange={handlePassword}
                placeholder="비밀번호를 입력 해주세요"
                style={{ width: '190px' }}
              ></Input>
            </Col>
            <Col>
              <Button
                onClick={checkPassword}
                style={{
                  marginLeft: '10px',
                  fontWeight: 'bold',
                  color: '#708090',
                }}
              >
                check
              </Button>
            </Col>
          </Row>
          <Row justify="center" align="middle">
            <Button
              style={{
                marginTop: '5%',
                width: '100px',
                height: '50px',
                borderRadius: '12px',
                backgroundColor: '#ff0000',
                border: '3px soild',
                borderColor: '',
                fontSize: '25px',
                color: '#FFFF',
                fontWeight: 'bold',
              }}
              onClick={handleDelete}
              disabled={check}
            >
              삭제
            </Button>
          </Row>
        </Card>
      )}
    </div>
  );
};
export default ProjectDelete;

/*
#708090
 border-radius: 12px;
*/
