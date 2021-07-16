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

  // 팀에 현재 소속된 맴버 정보와 아바타

  //프로젝트 작성자
  // 프로젝트 멤버리스트의 값이 변경 될때 값이 바끼는 로직
  const getWriter = () => {
    let temp = null;
    if (list.memberList !== null && list.currentProject !== null) {
      temp = list.memberList.find((element) => {
        return element.userId === list.currentProject.userId;
      });

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
          overflowX: 'scroll',
          minWidth: '360px',
          alignItems: 'center',
          marginLeft: 80,
          marginRight: 80,
          marginTop: 50,
          marginBottom: 50,
        }}
      >
        <Card
          style={{
            backgroundColor: '#00BFFF',
            borderColor: ' #00BFFF',
          }}
        >
          <Row justify="center" style={{}}>
            <Title
              style={{
                fontSize: '70px',
                color: '#FFFF',
                textShadow: ' 0 1px #00BFFF, 1px 0 #00BFFF',
                marginTop: '3.5%',
              }}
            >
              {list.currentProject.name}
            </Title>
          </Row>
        </Card>
        <br></br>
        <br></br>
        <Row gutter={20} justify="end">
          <Col>
            <GrView />
            <Text style={{ fontWeight: 'bold' }}>&nbsp;&nbsp; 조회 :</Text>
            <Text>&nbsp;{list.currentProject.viewCount} 회</Text>
          </Col>
          <Col>
            <TiDocumentText />
            <Text style={{ fontWeight: 'bold' }}>&nbsp;&nbsp; 모집 인원 :</Text>
            <Text>&nbsp;{list.currentProject.total} 명</Text>
          </Col>
          <Col>
            <Text style={{ fontWeight: 'bold' }}>작성일 :</Text>
            <Text>&nbsp;{list.currentProject.createTime.substring(0, 16)}</Text>
          </Col>
          <Col>
            <Text style={{ fontWeight: 'bold' }}>수정일 :</Text>
            <Text>&nbsp;{list.currentProject.updateTime.substring(0, 16)}</Text>
          </Col>
        </Row>
        <hr></hr>
        <Title level={2} style={{ marginLeft: '10%' }}>
          Project Description{' '}
        </Title>
        <Paragraph style={{ marginLeft: '12%', fontSize: '25px' }}>
          {list.currentProject.description}
        </Paragraph>
        <Card
          style={{
            border: '1.5px solid ',
            borderColor: ' #00BFFF',
            backgroundColor: '#ffff',

            marginLeft: '10%',
            marginRight: '10%',
          }}
        >
          <Paragraph
            style={{
              marginLeft: '10%',
              marginRight: '10%',
              marginBottom: '2%',
              marginTop: '4%',
            }}
          >
            {ReactHtmlParser(JSON.parse(list.currentProject.contents))}
          </Paragraph>
        </Card>

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
                  <ListGroup.Item>
                    <Row>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: '#708090 ',
                          marginLeft: '21%',
                        }}
                      >
                        리더 이름
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
                          fontWeight: 'bold',
                          color: '#708090 ',
                          marginLeft: '21%',
                        }}
                      >
                        전문 분야
                      </Text>
                      <Text style={{ marginLeft: '15%', color: '#708090' }}>
                        {writer.jobTitle}
                      </Text>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: '#708090 ',
                          marginLeft: '22%',
                        }}
                      >
                        Email
                      </Text>
                      <Text style={{ marginLeft: '19%', color: '#708090' }}>
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
                    {list.currentProject.finishedTime.substring(0, 16)}
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
          <Title level={4}>현재 모집 현황</Title>
        </Row>
        <br></br>
        <Card
          style={{
            border: '1.5px solid ',
            borderColor: ' #00BFFF',
            backgroundColor: 'transparent',
          }}
        >
          <Row
            gutter={[10]}
            justify="center"
            style={{
              marginTop: '2%',
              marginBottom: '2%',
              backgroundColor: 't',
            }}
          >
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
        </Card>

        <br></br>
        <br></br>
        <Row justify="center">
          <Button
            onClick={handleApply}
            shape="round"
            style={{ background: '#00BFFF', color: '#ffff' }}
          >
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
