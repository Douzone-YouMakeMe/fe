import React, { useEffect, useState } from 'react';

import { Button, Avatar, Typography, Col, Row } from 'antd';
import { Card, CardGroup, ListGroup } from 'react-bootstrap';
import { UserOutlined, DownloadOutlined } from '@ant-design/icons';
import { GrView } from 'react-icons/gr';
import { TiDocumentText } from 'react-icons/ti';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { projectAction } from '../../redux/module/project/projectAction';
import { projectAPI } from '../../api';

const { Title, Text, Paragraph } = Typography;

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
  const handleApply = () => {
    if (user.userInfo === null) {
      alert('로그인이 필요합니다.');
      props.history.push('/user/login');
    } else if (list.memberList !== null) {
      let member = list.memberList.filter((value) => {
        return value.userId === user.userInfo.id;
      });
      console.log(member);
      if (member.length !== 0) {
        alert('이미 해당 프로젝트의 멤버입니다.');
      } else {
        props.history.push(`/app/apply/${list.currentProject.id}`);
      }
    }
  };
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
          <Title level={1}>{list.currentProject.name}</Title>
        </Row>
        <Row gutter={20} justify="end">
          <Col>
            <GrView />
            <Text>&nbsp;&nbsp; 조회 : {list.currentProject.viewCount}회</Text>
          </Col>
          <Col>
            <TiDocumentText />
            <Text>
              &nbsp;&nbsp; 모집 인원 :&nbsp;{list.currentProject.total} 명
            </Text>
          </Col>
          <Col>
            <Text>작성일- {list.currentProject.createTime}</Text>
          </Col>
          <Col>
            <Text>수정일- {list.currentProject.updateTime}</Text>
          </Col>
        </Row>

        <hr></hr>

        <Title level={4}>Project Description </Title>
        <Paragraph>{list.currentProject.description}</Paragraph>
        <Paragraph style={{}}>
          {ReactHtmlParser(JSON.parse(list.currentProject.contents))}
        </Paragraph>
        <Row></Row>

        <hr></hr>
        {writer !== null && (
          <CardGroup>
            <Card text="white" style={{ border: '1px solid #00BFFF' }}>
              <Card.Header
                style={{
                  background: '#00BFFF',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: '20px',
                }}
              >
                프로젝트 리더 정보
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <Row></Row>
                  <ListGroup.Item>
                    <Row>
                      <Text style={{ fontWeight: 'bold', color: '#708090 ' }}>
                        리더 이름
                      </Text>
                      <Text style={{ marginLeft: '15%', color: '#708090' }}>
                        {writer.name}
                      </Text>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Text style={{ fontWeight: 'bold', color: '#708090' }}>
                        전문 분야
                      </Text>
                      <Text style={{ marginLeft: '15%', color: '#708090' }}>
                        {writer.name}
                      </Text>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Text
                        style={{
                          marginLeft: '3%',
                          fontWeight: 'bold',
                          color: '#708090',
                        }}
                      >
                        Email
                      </Text>
                      <Text style={{ marginLeft: '18%', color: '#708090' }}>
                        {writer.email}
                      </Text>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <Card text="white" style={{ border: '1px solid #00BFFF' }}>
              <Card.Header
                style={{
                  background: '#00BFFF',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: '20px',
                }}
              >
                지원자수 및 마감일
              </Card.Header>
              <Card.Body>
                <Row justify="center">
                  <Text
                    style={{
                      fontSize: '75px',
                      color: '#708090',
                    }}
                  >
                    {list.count - 1}명
                  </Text>
                </Row>

                <Row justify="center">
                  <Button
                    shape="round"
                    disabled
                    style={{
                      border: '1px solid #00BFFF',
                      background: '#FFFF',
                      color: '#00BFFF',
                    }}
                  >
                    마감일
                  </Button>
                  <Text
                    style={{
                      fontSize: '19px',
                      marginLeft: '14px',
                      color: '#708090',
                    }}
                  >
                    {list.currentProject.finishedTime}
                  </Text>
                </Row>
              </Card.Body>
            </Card>
          </CardGroup>
        )}
        <hr></hr>

        {/*jobTitle : 자기분야 / name : 유저 이름 
        현재 프로젝트에 참가 중 인 멤바 정보와 팀에의 부족인원 모집중 메세지  */}
        <Row justify="center">
          <Title level={5}>현재 모집 현황</Title>
        </Row>
        <br></br>
        <Row gutter={[10]} justify="center">
          {Array.from({ length: list.currentProject.total }).map(
            (value, key) => {
              if (key < list.memberList.length) {
                return (
                  <Col>
                    <Avatar size={100} icon={<UserOutlined />} />
                    <Row justify="center">
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: '#708090',
                        }}
                      >
                        {list.memberList[key].jobTitle}
                      </Text>
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
                      <Button
                        //shape="round"
                        disabled
                        style={{
                          marginTop: '4%',
                          border: '1px solid #00BFFF',
                          background: '#00BFFF',
                          color: '#ffff',
                        }}
                      >
                        모집중
                      </Button>
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
          <Button onClick={handleApply} type="primary" shape="round">
            지원하기
          </Button>
        </Row>
      </div>
    );
  } else {
    return <></>;
  }
}

export default ProjectDetail;
