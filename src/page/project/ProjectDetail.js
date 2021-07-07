import React, { useEffect } from 'react';

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

//GrView ,TiDocumentText
const { Title, Text, Paragraph } = Typography;
const html =
  '<html lang=en dir=ltr>	<head><meta charset=utf-8><title>하이</title></head>	<body>살아있어 행복 해요 더 자세한 설명은  ck에디터 입력 내용 받아오기</body></html>';
function ProjectDetail(props) {
  console.log(props);
  const user = useSelector((state) => {
    console.log(state);
    return state.user;
  });
  const list = useSelector((state) => {
    return state.project;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    initProjectDetail();
    return () => {};
  }, []);
  const initProjectDetail = async () => {
    await dispatch(projectAction.getProjectOne(props.match.params.id));
    await dispatch(projectAction.getProjectCount(props.match.params.id));
    await dispatch(projectAction.getProjectMembers(props.match.params.id));
  };
  if (list.currentProject !== null) {
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
        {ReactHtmlParser(html)}
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
            <Text>&nbsp;&nbsp; 지원:{list.currentProject.total}</Text>
          </Col>
          <Col>
            <Text>created- {list.currentProject.createTime}</Text>
          </Col>
          <Col>
            <Text>updated- {list.currentProject.updateTime}</Text>
          </Col>
        </Row>

        <hr></hr>

        <Title level={4}>Project Summary </Title>
        <Paragraph>{list.currentProject.description}</Paragraph>
        <Title level={4}>
          프론트앤드 개발자 컨탠트 부분 ck에디터에서 받아오기 받아오는 이름
          contents
        </Title>
        <Row></Row>

        <hr></hr>
        <CardGroup>
          <Card border="dark">
            <Card.Header>리더 이름 :{list.currentProject.userId}</Card.Header>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text>리더 정보</Card.Text>
            </Card.Body>
          </Card>
          <Card border="dark">
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
          </Card>
        </CardGroup>
        <hr></hr>
        <Row gutter={20} justify="center">
          <Col>
            <Avatar size={100} icon={<UserOutlined />} />
            <Row justify="center">
              {' '}
              <Text>front-dev</Text>
            </Row>
            <Row justify="center">
              {' '}
              <Text>이균환</Text>
            </Row>
          </Col>
          <Col>
            <Avatar size={100} icon={<UserOutlined />} />
            <Row justify="center">
              {' '}
              <Text>back-dev</Text>
            </Row>
            <Row justify="center">
              {' '}
              <Text>모집중</Text>
            </Row>
          </Col>
          <Col>
            <Avatar size={100} icon={<UserOutlined />} />
            <Row justify="center">
              {' '}
              <Text>back-dev</Text>
            </Row>
            <Row justify="center">
              {' '}
              <Text>모집중</Text>
            </Row>
          </Col>
          <Col>
            <Avatar size={100} icon={<UserOutlined />} />
            <Row justify="center">
              {' '}
              <Text>front-dev</Text>
            </Row>
            <Row justify="center">
              {' '}
              <Text>모집중</Text>
            </Row>
          </Col>
          <Col>
            <Avatar size={100} icon={<UserOutlined />} />
            <Row justify="center">
              {' '}
              <Text>back-dev</Text>
            </Row>
            <Row justify="center">
              {' '}
              <Text>모집중</Text>
            </Row>
          </Col>
          <Col>
            <Avatar size={100} icon={<UserOutlined />} />
            <Row justify="center">
              {' '}
              <Text>back-dev</Text>
            </Row>
            <Row justify="center">
              {' '}
              <Text>모집중</Text>
            </Row>
          </Col>
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
