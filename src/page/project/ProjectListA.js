/*
작성일 : 2021.06.30
작성자 : 조성규 
화면설명: 프로젝트 리스트 (카드 그리드 )
부트 스트렙 적용
*/
import React from 'react';
import { Route, Link } from 'react-router-dom';
import Pimg from '../../test_img/card_test.png';
//import { Card, Row, Col, Avatar } from 'antd';
import { Avatar, Typography } from 'antd';
import { Row, Col, Card } from 'react-bootstrap';
import { UserOutlined } from '@ant-design/icons';

//const { Meta } = Card;
const { Text, Title } = Typography;
function ProjectListA(props) {
  return (
    <div>
      <Title style={{ marginLeft: '1%' }} level={2}>
        Project List
      </Title>
      <Row xs={1} md={3} className="g-1">
        {Array.from({ length: 10 }).map((_, idx) => (
          <Col style={{ marginTop: '2%' }}>
            <Link
              to={{ pathname: `/app/detail/${idx}` }}
              style={{ textDecoration: 'none' }}
            >
              <Card>
                <Card.Img variant="top" src={Pimg} />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    <div
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer. This is a longer card with supporting
                      text below as a natural lead-in to additional content.
                      This content is a little bit longer. This is a longer card
                      with supporting text below as a natural lead-in to
                      additional content. This content is a little bit longer.
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ProjectListA;

/*
antd 모바일 적용 안되는 카드 그리드 뷰 


 <Row
      gutter={[80, 20]}
      style={{ width: '100%' }}
      justify="center"
      align="middle"
    >
      {Array.from({ length: 6 }).map((_, idx) => (
        <Col>
          <Row justify="center">
            <Link to={{ pathname: `/app/detail/${idx}` }}>
              <Card
                hoverable
                style={{
                  width: 400,
                }}
                cover={
                  <img
                    style={{ overflow: 'cover', height: '20vh' }}
                    alt="프로젝트 이미지"
                    src={Pimg}
                  />
                }
              >
                <Meta title="위하고" description="이런사람을 구합니다" />

                <Row gutter={[10, 5]} style={{ marginTop: '20px' }}>
                  <Col>
                    <Avatar icon={<UserOutlined />} />
                  </Col>
                  <Col>
                    <Avatar icon={<UserOutlined />} />
                  </Col>
                  <Col>
                    <Avatar icon={<UserOutlined />} />
                  </Col>
                  <Col>
                    <Avatar icon={<UserOutlined />} />
                  </Col>
                  <Col>
                    <Avatar icon={<UserOutlined />} />
                  </Col>
                </Row>
              </Card>
            </Link>
          </Row>
        </Col>
      ))}
    </Row>


*/
