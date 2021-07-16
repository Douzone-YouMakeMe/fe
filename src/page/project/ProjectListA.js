/*
작성일 : 2021.06.30
작성자 : 조성규 
화면설명: 프로젝트 리스트 (카드 그리드 )
부트 스트렙 적용
*/
import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import Pimg from '../../test_img/card_test.png';
//import { Card, Row, Col, Avatar } from 'antd';
import { Avatar, Divider, Typography } from 'antd';
import { Row, Col, Card, Carousel } from 'react-bootstrap';
//import { UserOutlined } from '@ant-design/icons';
import { s3Bucket } from '../../util';
import { actionCreators } from '../../redux/module/project/projectAction';
import { projectAPI } from '../../api';

//const { Meta } = Card;
const { Text, Title } = Typography;

function ProjectListA(props) {
  //변수 // 변수 바꾸는 함수 // 초기 값
  const [Plist, setPlist] = useState([]);

  useEffect(() => {
    handInit();
    return () => {
      //컨프너트 사라질 때 : 실행문
    };
  }, []);
  // 리턴 된 값을 usestate 에 쓴다
  const handInit = async () => {
    const data = await projectAPI.getMainProject();
    setPlist(data.data);
    await console.log(data.data);
  };

  return (
    <div style={{ height: '80vh', overflow: 'scroll' }}>
      <Row>
        <Title style={{ marginLeft: '1%', marginTop: '1%' }} level={2}>
          Project List
        </Title>
      </Row>
      <Row xs={1} md={3} className="g-1">
        {Plist.map((value, key) => (
          <Col style={{ marginTop: '2%' }}>
            <Link
              to={{ pathname: `/app/detail/${value.id}` }}
              style={{ textDecoration: 'none' }}
            >
              <Card
                style={{
                  //border: '2px solid rgba(0, 191, 255, .5)',
                  border: '0 0 0 0',
                  //borderTop: '5px solid rgba(0, 191, 255, .7)',
                  boxShadow: '3px 3px rgba(0, 191, 255, .6)',

                  height: '320px',
                }}
              >
                <Card.Img
                  variant="top"
                  src={`${s3Bucket}${value.thumbnail}`}
                  //380 160
                  style={{
                    objectFit: 'cover',
                    width: 'autdo',
                    height: '150px',
                  }}
                />
                <Card.Body
                  style={{
                    backgroundColor: '#FFFF',
                    borderTop: '0.1px solid lightgray',
                  }}
                >
                  <Card.Title className="text-center">{value.name}</Card.Title>

                  <Card.Text className="text-center">
                    <div
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {value.description}
                    </div>
                  </Card.Text>
                </Card.Body>
                <Card.Footer
                  style={{ backgroundColor: '#FFFF', color: '#708090' }}
                >
                  <Row
                    style={{
                      height: '50px',
                    }}
                  >
                    <Col
                      style={{
                        borderRight: '0.1px  solid rgba(0, 191, 255, .4)',
                        textAlign: 'center',
                      }}
                    >
                      {/* <div style={{ marginTop: '10px' }}>모집인원</div> */}
                      <Card.Text style={{ fontWeight: 600 }}>
                        모집인원
                      </Card.Text>
                      {value.total}
                    </Col>
                    <Col
                      style={{
                        borderRight: '0.1px solid rgba(0, 191, 255, .4)',
                        textAlign: 'center',
                      }}
                    >
                      <Card.Text style={{ fontWeight: 600 }}>조회수</Card.Text>
                      {value.view_count}
                    </Col>
                    <Col
                      style={{
                        textAlign: 'center',
                      }}
                    >
                      <Card.Text style={{ fontWeight: 600 }}>
                        마감일
                        <div style={{ fontSize: '14px' }}>
                          {String(value.finished_time).substring(0, 10)}
                        </div>
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Footer>
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

/* <footer>
                    <Row
                      style={{
                        height: '70px',
                        borderTop: '0.1px solid lightgray',
                      }}
                    >
                      <Col
                        style={{
                          borderRight: '0.1px solid lightgray',

                          textAlign: 'center',
                        }}
                      >
                        <div style={{ marginTop: '10px' }}>모집인원</div>
                        {value.total}
                      </Col>
                      <Col
                        style={{
                          borderRight: '0.1px solid lightgray',
                          textAlign: 'center',
                        }}
                      >
                        <div style={{ marginTop: '10px' }}>조회수</div>
                        {value.view_count}
                      </Col>
                      <Col
                        style={{
                          textAlign: 'center',
                        }}
                      >
                        <div style={{ marginTop: '10px' }}>마감일</div>
                        {String(value.finished_time).substring(0, 10)}
                      </Col>
                    </Row>
                  </footer> */
