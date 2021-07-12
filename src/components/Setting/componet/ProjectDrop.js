import { Row, Col, Button, Input } from 'antd';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { memberAPI, projectAPI, userAPI } from '../../../api';
import { projectAction } from '../../../redux/module/project/projectAction';
const ProjectDrop = (props) => {
  const [check, setCheck] = useState(true);
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  useEffect(() => {
    handleInit();
  }, []);
  const handleInit = async () => {
    dispatch(projectAction.getProjectMembers(props.match.params.id));
    dispatch(projectAction.getCurrentProject(props.match.params.id));
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
  const handleDrop = async (e) => {
    const result = await memberAPI.dropMember(project.currentMember.id);
    if (result.status !== 200) {
      alert('실패 햇습니다.');
    } else {
      props.history.push('/app/myProject');
    }
  };
  return (
    <Row>
      <Col>프로젝트를 탈퇴하시겠습니까?</Col>
      <Col>비밀번호 입력</Col>
      <Col>
        <Input value={password} onChange={handlePassword}></Input>
        <Button onClick={checkPassword}> check</Button>
      </Col>
      <Col>
        <Button onClick={handleDrop} disabled={check}>
          탈퇴하기
        </Button>
      </Col>
    </Row>
  );
};
export default ProjectDrop;
