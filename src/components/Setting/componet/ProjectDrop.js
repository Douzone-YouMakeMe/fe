import { Row, Col, Button, Card, Typography, Input } from 'antd';
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
  const { Title, Text } = Typography;
  return (
    //     <div style={{ marginTop: '3%' }}>
    //   <Card
    //     style={{
    //       width: 'auto',
    //       height: '445px',
    //       backgroundColor: 'rgba(0, 191, 255, .7)',
    //       color: '#FFFF',
    //       borderRadius: '30px',
    //       border: '2px solid',
    //       borderColor: '#505050',
    //     }}
    //   >
    //     <Row justify="center" align="middle">
    //       <Title
    //         style={{
    //           color: '#FFFF',
    //           fontSize: '65px',
    //           textShadow:
    //             '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
    //           marginBottom: '1%',
    //         }}
    //       >
    //         프로젝트 삭제
    //       </Title>
    //     </Row>
    //     <hr></hr>
    //     <Row justify="center" align="middle">
    //       <Title
    //         style={{
    //           color: '#FFFF',
    //           fontSize: '40px',
    //           marginTop: '30PX',
    //         }}
    //       >
    //         프로젝트명 : {project.currentProject.name}
    //       </Title>
    //     </Row>
    //     <Row justify="center" align="middle">
    //       <Text
    //         style={{
    //           color: '#708090',
    //           fontSize: '20px',
    //           marginTop: '30PX',
    //         }}
    //       >
    //         프로젝트를 삭제 하시겠습니까?
    //       </Text>
    //     </Row>
    //     <Row justify="center" align="middle">
    //       <Button
    //         style={{
    //           marginTop: '5%',
    //           width: '100px',
    //           height: '50px',
    //           borderRadius: '12px',
    //           backgroundColor: '#FFFF',
    //           border: '3px soild',
    //           borderColor: '#E60A2F',
    //           fontSize: '25px',
    //           color: '#E60A2F',
    //         }}
    //         onClick={() => {
    //           handleDelete();
    //         }}
    //       >
    //         삭제
    //       </Button>
    //     </Row>
    //   </Card>
    // </div>

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
