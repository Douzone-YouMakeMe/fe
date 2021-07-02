import React, { Component, Fragment } from 'react'

import { Button, Avatar, Typography, Col, Row } from 'antd'
import { Card, CardGroup } from 'react-bootstrap'
import { UserOutlined, DownloadOutlined } from '@ant-design/icons'
import { GrView } from 'react-icons/gr'
import { TiDocumentText } from 'react-icons/ti'
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router-dom'
//GrView ,TiDocumentText
const { Title, Text, Paragraph } = Typography
const html =
  '<html lang=en dir=ltr>	<head><meta charset=utf-8><title>하이</title></head>	<body>살아있어 행복 해요</body></html>'
function ProjectDetail() {
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
        <Title>프로젝트 상세보기</Title>
      </Row>
      <Row gutter={20} justify="end">
        <Col>
          <GrView />
          <Text>&nbsp;&nbsp; 조회: 10 회</Text>
        </Col>
        <Col>
          <TiDocumentText />
          <Text>&nbsp;&nbsp; 지원: 10 회</Text>
        </Col>
        <Col>
          <Text>created- 2021-06-15</Text>
        </Col>
        <Col>
          <Text>updated- 2021-07-28</Text>
        </Col>
      </Row>

      <hr></hr>

      <Title level={4}>Project Summary </Title>
      <Paragraph>
        우리 프로젝트는 applications development, many different design specs
        and implementations would be involved, which might cause designers and
        developers difficulties and duplication and reduce the efficiency of
        development.
      </Paragraph>
      <Title level={4}>프론트앤드 개발자 </Title>
      <Row>
        <Title level={5}>우대사항 : </Title>
        <Paragraph>
          In the process of internal desktop applications development, many
          different design specs and implementations would be involved, which
          might cause designers and developers difficulties and duplication and
          reduce the efficiency of development.
        </Paragraph>
      </Row>
      <Row>
        <Title level={5}>자격요건 : </Title>
        <Paragraph>
          In the process of internal desktop applications development, many
          different design specs and implementations would be involved, which
          might cause designers and developers difficulties and duplication and
          reduce the efficiency of development.
        </Paragraph>
      </Row>
      <br></br>
      <Row>
        <Title level={5}>개발스택 : </Title>
        <Paragraph>
          In the process of internal desktop applications development, many
          different design specs and implementations would be involved, which
          might cause designers and developers difficulties and duplication and
          reduce the efficiency of development.
        </Paragraph>
      </Row>
      <br></br>
      <Title level={4}>백앤드 개발자 </Title>
      <Row>
        <Title level={5}>우대사항 : </Title>
        <Paragraph>
          In the process of internal desktop applications development, many
          different design specs and implementations would be involved, which
          might cause designers and developers difficulties and duplication and
          reduce the efficiency of development.
        </Paragraph>
      </Row>
      <Row>
        <Title level={5}>자격요건 : </Title>
        <Paragraph>
          In the process of internal desktop applications development, many
          different design specs and implementations would be involved, which
          might cause designers and developers difficulties and duplication and
          reduce the efficiency of development.
        </Paragraph>
      </Row>
      <br></br>
      <Row>
        <Title level={5}>개발스택 : </Title>
        <Paragraph>
          In the process of internal desktop applications development, many
          different design specs and implementations would be involved, which
          might cause designers and developers difficulties and duplication and
          reduce the efficiency of development.
        </Paragraph>
      </Row>

      <hr></hr>
      <CardGroup>
        <Card border="dark">
          <Card.Header>프로잭트 리더</Card.Header>
          <Card.Body>
            <Card.Title>리더 닉네임 또는 이름</Card.Title>
            <Card.Text>리더 정보</Card.Text>
          </Card.Body>
        </Card>
        <Card border="dark">
          <Card.Header>프로젝트 상세보기</Card.Header>
          <Card.Body>
            <Card.Title>문서자료</Card.Title>
            <Card.Text>문서 다운로드</Card.Text>
            <Button type="primary" shape="round" icon={<DownloadOutlined />} />
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
        <Link to="/apply/1">
          <Button type="primary" shape="round">
            지원하기
          </Button>
        </Link>
      </Row>
    </div>
  )
}

export default ProjectDetail
