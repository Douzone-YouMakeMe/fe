import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectAction } from '../../redux/module/project/projectAction';
import {
  Space,
  Avatar,
  Row,
  Col,
  Button,
  List,
  Card,
  Collapse,
  Typography,
} from 'antd';
import { SettingOutlined, DownOutlined } from '@ant-design/icons';
import { CgAddR } from 'react-icons/cg';
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
  const { history } = props;
  const { Panel } = Collapse;
  const { Title } = Typography;
  return (
    <div
      style={{
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20,
        marginBottom: 50,
      }}
    >
      <Collapse defaultActiveKey={['1']} ghost>
        <Panel
          header="Profile +"
          showArrow={false}
          style={{
            width: '190px',
            fontSize: '38px',
            fontWeight: 'bold',
          }}
        >
          <Card
            style={{
              width: '680px',
              height: '275px',
              backgroundColor: '#00BFFF',
              color: '#FFFF',
              borderRadius: '30px',
              border: '2px solid',
              borderColor: '#505050',
            }}
          >
            <Row gutter={[70, 24]}>
              <Col>
                <Row
                  justify="center"
                  align="middle"
                  style={{ width: '100%', height: '100%' }}
                >
                  <Avatar
                    size={70}
                    style={{
                      backgroundColor: user.userInfo.color,
                      fontSize: '30px',
                      marginLeft: '28px',
                      border: '2px soild ',
                      borderColor: 'red',
                    }}
                  >
                    {user.userInfo.name.substring(0, 1).toUpperCase()}
                  </Avatar>
                </Row>
              </Col>

              <Col>
                <Row align="middle" style={{ wdith: '100%', height: '100%' }}>
                  <Space direction="vertical">
                    <h5 style={{ fontSize: '40px', color: '#ffff' }}>
                      {user.userInfo.name}
                    </h5>
                    <p style={{ fontSize: '15px' }}>{user.userInfo.email}</p>
                    <p style={{ fontSize: '15px' }}>
                      희망 직무: {user.userInfo.jobTitle}
                    </p>
                  </Space>
                </Row>
              </Col>
              <Col xs={0} sm={8} md={8} lg={12} xl={14}></Col>
              <Col>
                <Row align="middle" style={{ marginLeft: '50px' }}>
                  <Button
                    style={{
                      fontWeight: 'bold',
                      color: '#708090',
                      backgroundColor: '#ffff',
                      border: '2px solid',
                      borderColor: '#505050',
                      height: '45px',
                    }}
                    onClick={() => {
                      history.push(`/app/info/user/${user.id}`);
                    }}
                  >
                    프로필 설정
                  </Button>
                </Row>
              </Col>
            </Row>
          </Card>
        </Panel>
      </Collapse>

      <h2>My Project List</h2>
      <br></br>
      <Button
        onClick={goCreateProjedt}
        style={{
          width: '100%',
          height: '115px',
          backgroundColor: ' rgba(0, 191, 255, .7)',
          borderRadius: '30px',
        }}
      >
        <Row justify="center" align="middle">
          <Title
            level={2}
            style={{
              marginTop: '18px',
              color: '#FFFAFA',
              borderColor: 'red',
            }}
          >
            <CgAddR
              style={{
                fontSize: '50px',
                marginRight: '10px',
                color: '#FFFAFA',
              }}
            />
            팀생성 하기
          </Title>
        </Row>
      </Button>

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
    </div>
  );
};

const ListObject = (props) => {
  const { value, history } = props;
  console.log(value);
  return (
    <List.Item style={{ borderColor: 'rgba(0, 191, 255, .2)' }}>
      <Card
        style={{
          width: '100%',
          border: 'soild',
          borderColor: ' rgba(0, 191, 255, .7)',
        }}
      >
        <Row align="middle">
          <Col span={5}>
            <img
              src={`${s3Bucket}${value.thumbnail}`}
              style={{
                width: '160px',
                height: '90px',
              }}
            />
          </Col>

          <Col span={9}>
            <Row>
              <p style={{ fontSize: '30px', marginLeft: '3%' }}>{value.name}</p>
            </Row>
            <Row>
              <p style={{ fontSize: '15px', marginLeft: '3%' }}>
                <div
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {value.description}
                </div>
              </p>
            </Row>
          </Col>
          <Col>
            <Button
              style={{
                width: '100px',
                height: '45px',
                background: '#00BFFF',
                color: 'white',
                fontWeight: 'bold',
              }}
              onClick={() => {
                history.push(`/project/${value.id}/roadmap`);
              }}
            >
              팀으로가기
            </Button>
            <Button
              style={{
                width: '100px',
                height: '45px',
                marginLeft: '50px',
                fontWeight: 'bold',
                border: ' 1px soild',
                borderColor: ' rgba(0, 191, 255, .7)',
              }}
              onClick={() => {
                history.push(`/app/ProjectUpdate/${value.id}`);
              }}
            >
              수정하기
            </Button>
            <Button
              onClick={() => {
                history.push(`/app/setting/${value.id}/member`);
              }}
              style={{
                width: '100px',
                height: '45px',
                marginLeft: '10px',
                fontWeight: 'bold',
                border: ' 1px soild',
                borderColor: ' rgba(0, 191, 255, .7)',
              }}
            >
              <SettingOutlined style={{ fontSize: '20px' }} />
              팀관리
            </Button>
          </Col>
        </Row>
      </Card>
    </List.Item>
  );
};
export default MyProject;
