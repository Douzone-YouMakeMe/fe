import React, { useEffect, useState } from 'react';

import { Button, Avatar, Typography, Col, Row } from 'antd';
import { Card, CardGroup } from 'react-bootstrap';
import { UserOutlined, DownloadOutlined } from '@ant-design/icons';
import { GrView } from 'react-icons/gr';
import { TiDocumentText } from 'react-icons/ti';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { projectAction } from '../../redux/module/project/projectAction';
import { projectAPI } from '../../api';

const { Title, Text, Paragraph } = Typography;
const html =
  '<html lang=en dir=ltr>	<head><meta charset=utf-8><title>하이</title></head>	<body>살아있어 행복 해요 더 자세한 설명은  ck에디터 입력 내용 받아오기</body></html>';

function ProjectDetail(props) {
  const list = useSelector((state) => {
    return state.project;
  });
  //const [변수명,변수값을바꾸는함수]= useState(초기값);
  const [writer, setWriter] = useState(null);
  const [teamMember, setTeamMember] = useState(null);

  // 팀에 현재 소속된 맴버 정보와 아바타

  //프로젝트 작성자
  // 프로젝트 멤버리스트의 값이 변경 될때 값이 바끼는 로직
  const getWriter = () => {
    let temp = null;
    if (list.memberList !== null && list.currentProject !== null) {
      // console.log(list.currentProject.userId);
      temp = list.memberList.find((element) => {
        console.log(element.userId === list.currentProject.userId);
        return element.userId === list.currentProject.userId;
      });
      console.log(temp);
      setWriter(temp);
    }
  };

  // 어떠한 현상이 일어났을때 실행 시킬 훅
  // useEffect  첫번째 들어가는 /실행문
  //2. 값이 사라질때 실행 시키는문 /클린문
  //3. 배열 [] 안 변경되는 값 / 지켜 봐야하는 값
  // 배열의 값이 바끼면 실행문 , 없어지면 클린문
  useEffect(() => {
    getWriter();
    return () => {};
  }, [list.memberList]);

  //리둑스에서 받아오는
  const user = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    initProjectDetail();
    return () => {};
  }, []);

  const initProjectDetail = async () => {
    await dispatch(projectAction.getProjectOne(props.match.params.id));
    await dispatch(projectAction.getProjectCount(props.match.params.id));
    await dispatch(projectAction.getDetailMembers(props.match.params.id));
  };

  // useSate에 담기긴 변수를 호출 해보면 볼수있다

  if (list.currentProject !== null && writer !== null) {
    return (
      <div
        style={{
          alignItems: 'center',
          marginLeft: 80,
          marginRight: 80,
          marginTop: 50,
          marginBottom: 50,
        }}
      >
        <Row justify="center">
          <Title>{list.currentProject.name}</Title>
        </Row>
        <Row gutter={20} justify="end">
          <Col>
            <GrView />
            <Text>&nbsp;&nbsp; 조회: {list.currentProject.viewCount}</Text>
          </Col>
          <Col>
            <TiDocumentText />
            <Text>&nbsp;&nbsp; 지원자수:{list.count - 1}</Text>
          </Col>
          <Col>
            <Text>생성일- {list.currentProject.createTime}</Text>
          </Col>
          <Col>
            <Text>수정일- {list.currentProject.updateTime}</Text>
          </Col>
        </Row>

        <hr></hr>

        <Title level={4}>Project Description </Title>
        <Paragraph>{list.currentProject.description}</Paragraph>
        <Title level={4}>{ReactHtmlParser(list.currentProject.contents)}</Title>
        <Row></Row>

        <hr></hr>
        {writer !== null && (
          <CardGroup>
            <Card bg="primary" text="white">
              <Card.Header>리더 이름 :{writer.name}</Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Title>이메일</Card.Title>
                <Card.Text>이메일</Card.Text>
              </Card.Body>
            </Card>
            {/* <Card border="dark">
            <Card.Header>프로젝트 상세보기</Card.Header>
            <Card.Body>
              <Card.Title>문서자료</Card.Title>
              <Card.Text>문서 다운로드</Card.Text>
              <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
              />
            </Card.Body>
          </Card> */}
          </CardGroup>
        )}
        <hr></hr>

        {/*jobTitle : 자기분야 / name : 유저 이름 
        현재 프로젝트에 참가 중 인 멤바 정보와 팀에의 부족인원 모집중 메세지  */}
        <Row gutter={20} justify="center">
          {Array.from({ length: list.currentProject.total }).map(
            (value, key) => {
              if (key < list.memberList.length) {
                return (
                  <Col>
                    <Avatar size={100} icon={<UserOutlined />} />
                    <Row justify="center">
                      <Text>{list.memberList[key].jobTitle}</Text>
                    </Row>
                    <Row justify="center">
                      <Text>{list.memberList[key].name}</Text>
                    </Row>
                  </Col>
                );
              } else {
                return (
                  <Col>
                    <Avatar size={100} icon={<UserOutlined />} />
                    <Row justify="center">
                      <Text>모집중</Text>
                    </Row>
                  </Col>
                );
              }
            },
          )}
        </Row>

        <br></br>
        <br></br>
        <Row justify="center">
          <Link to={{ pathname: `/app/apply/${list.currentProject.id}` }}>
            <Button type="primary" shape="round">
              지원하기
            </Button>
          </Link>
        </Row>
      </div>
    );
  } else {
    return <></>;
  }
}

export default ProjectDetail;
