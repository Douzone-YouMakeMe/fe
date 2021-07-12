import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectAction } from '../../redux/module/project/projectAction';
import { Space, Avatar, Row, Col, Button, List, Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { s3Bucket } from '../../util';

const MyProject = (props) => {
  const user = useSelector((state) => {
    return state.user;
  });
  const list = useSelector((state) => {
    return state.project;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    initProjectList();
    return () => {};
  }, []);
  const initProjectList = async () => {
    await dispatch(projectAction.getMyProject(user.userInfo.id));
  };
  const goCreateProjedt = () => {
    props.history.push('/app/ProjectCreate');
  };
  return (
    <div
      style={{
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20,
        marginBottom: 50,
      }}
    >
      <div>
        <h4>Profile</h4>
      </div>
      <Row gutter={[48, 24]}>
        <Col>
          <Row
            justify="center"
            align="middle"
            style={{ width: '100%', height: '100%' }}
          >
            <Avatar
              style={{
                backgroundColor: 'red',
                fontSize: '30px',
              }}
            >
              {user.userInfo.name.substring(0, 1).toUpperCase()}
            </Avatar>
          </Row>
        </Col>

        <Col>
          <Row align="middle" style={{ wdith: '100%', height: '100%' }}>
            <Space direction="vertical">
              <h5>{user.userInfo.name}</h5>
              <p>{user.userInfo.email}</p>
            </Space>
          </Row>
        </Col>
        <Col xs={0} sm={8} md={8} lg={12} xl={14}></Col>
        <Col>
          <Row justify="center" align="middle">
            <Button> 프로필 설정</Button>
          </Row>
        </Col>
      </Row>
      <h2>Project List</h2>

      {list.myProjectList !== null && (
        <List
          dataSource={list.myProjectList}
          renderItem={(value) => {
            return (
              <ListObject
                key={value.id}
                history={props.history}
                value={value}
              ></ListObject>
            );
          }}
        ></List>
      )}
      <Button onClick={goCreateProjedt}>프로젝트 생성하기</Button>
    </div>
  );
};
const ListObject = (props) => {
  const { value, history } = props;
  console.log(value);
  return (
    <List.Item>
      <Card style={{ width: '100%' }}>
        <Row align="middle">
          <Col span={5}>
            <img
              src={`${s3Bucket}${value.thumbnail}`}
              style={{
                width: '150px',
                height: '50px',
              }}
            />
          </Col>

          <Col span={9}>
            <Row>
              <p style={{ fontSize: '30px', marginLeft: '3%' }}>{value.name}</p>
            </Row>
            <Row>
              <p style={{ fontSize: '15px', marginLeft: '3%' }}>
                {value.description}
              </p>
            </Row>
          </Col>
          <Col span={4}>
            <Button
              onClick={() => {
                history.push(`/project/${value.id}/roadmap`);
              }}
            >
              팀으로가기
            </Button>
          </Col>
          <Col span={3}>
            <Button
              style={{ width: '100px' }}
              onClick={() => {
                history.push(`/app/ProjectUpdate/${value.id}`);
              }}
            >
              수정하기
            </Button>
          </Col>
          <Col span={3}>
            <Button
              onClick={() => {
                history.push(`/app/setting/${value.id}/member`);
              }}
              style={{ width: '100px', height: '45px' }}
            >
              <SettingOutlined style={{ fontSize: '20px' }} />
              팀관리
            </Button>
          </Col>
        </Row>
      </Card>
      {/* <Row>
        <Col>
          <img src={`${value.thumbnail}`}></img>
        </Col>
        <Col>{value.name}</Col>
        <Col>{value.description}</Col>
        <Col>
          <Button
            onClick={() => {
              history.push(`/project/${value.id}/roadmap`);
            }}
          >
            팀으로가기
          </Button>
          <Button
            onClick={() => {
              history.push(`/app/ProjectUpdate/${value.id}`);
            }}
          >
            수정하기
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => {
              history.push(`/app/setting/${value.id}/member`);
            }}
          >
            팀관리
          </Button>
        </Col>
      </Row> */}
    </List.Item>
  );
};
export default MyProject;
