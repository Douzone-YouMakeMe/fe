/*
작성일 : 2021.06.30
작성자 : 조성규 
화면설명: 프로젝트 리스트 (카드 그리드 )
*/
import React from 'react';
import { Route, Link } from 'react-router-dom';
import Pimg from '../../test_img/card_test.png';
import { Card, Row, Col, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Meta } = Card;

function ProjectListA(props) {
  console.log(props.match.params);

  return (
    <div style={{ marginLeft: 118 }}>
      <Row justify="start" gutter={[100, 40]}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <Col>
            <Link to={{ pathname: `/detail/${idx}` }}>
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
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ProjectListA;
