import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import {
  Layout,
  Menu,
  Row,
  Col,
  Drawer,
  Modal,
  Input,
  Divider,
  Card,
} from 'antd';
import {
  MenuOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar } from 'antd';
import RoadMap from '../components/RoadMap/RoadMap';
import DashBoard from '../components/DashBoard/DashBoard';
import { batch, useDispatch, useSelector } from 'react-redux';
import { projectAction } from '../redux/module/project/projectAction';
import { user } from '../redux/module';
const { Header, Content, Footer } = Layout;
const { Search } = Input;
const users = [
  {
    id: 1,
    name: 'gyun',
    projectId: 1,
    icon: '',
    email: 'rbsrbsrbs2222@gmail.com',
    tel: '010-0000-0000',
    state: 'good',
    staetMessage: 'fxxk',
    position: 'frontEnd',
  },
  {
    id: 2,
    name: 'hwan',
    projectId: 1,
    icon: '',
    email: 'rbsrbsrbs2222@gmail.com',
    tel: '010-0000-0000',
    state: 'good',
    staetMessage: 'fxxk',
    position: 'backEnd',
  },
  {
    id: 3,
    name: 'hwan3',
    projectId: 1,
    icon: '',
    email: 'rbsrbsrbs2222@gmail.com',
    tel: '010-0000-0000',
    state: 'good',
    staetMessage: 'fxxk',
  },
  {
    id: 4,
    name: 'hwan4',
    projectId: 1,
    icon: '',
    email: 'rbsrbsrbs2222@gmail.com',
    tel: '010-0000-0000',
    state: 'good',
    staetMessage: 'fxxk',
  },
  {
    id: 5,
    name: 'hwan5',
    projectId: 1,
    icon: '',
    email: 'rbsrbsrbs2222@gmail.com',
    tel: '010-0000-0000',
    state: 'good',
    staetMessage: 'fxxk',
  },
];
const WithSidebar = (props) => {
  const [collapsed, setCollpased] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const [onSub, setOnSub] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const [menu, setMenu] = useState(1);
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    handleInit();

    return () => {};
  }, []);
  useEffect(() => {
    handleMenu();
  }, [menu]);
  const handleInit = async () => {
    dispatch(projectAction.getProjectMembers(props.match.params.id));
    dispatch(projectAction.getCurrentProject(props.match.params.id));
  };

  const onSearch = () => {};
  const onCollapse = () => {
    setCollpased(!collapsed);
  };
  const handleClose = () => {
    setOnModal(!onModal);
  };
  const handleSubClose = () => {
    setOnSub(!onSub);
  };
  // const handleClick = () => {
  //   setOnModal(!onModal);
  // };
  const handleCurr = (user) => {
    setCurrUser(user);
    setOnSub(!onSub);
  };
  const handleMenu = () => {
    let handle = props.history.location.pathname.split('/')[3];
    if (handle === 'roadmap') {
      setMenu(1);
    } else if (handle === 'dashboard') {
      setMenu(2);
    }
  };
  useEffect(() => {}, []);
  if (project.currentProject === null) {
    return <></>;
  }
  return (
    <Layout>
      <Header
        style={{
          height: '13vh',
          color: 'white',
          paddingLeft: '1vw',
          paddingRight: '1vw',
        }}
      >
        <Row justify="start" style={{ height: '100%' }} align="middle">
          <Col xs={2} sm={2} md={1} lg={1}>
            <MenuOutlined
              style={{
                color: 'white',
                fontSize: '3vh',
              }}
              onClick={onCollapse}
            />
          </Col>
          <Col xs={10} sm={14} md={16} lg={18}>
            <h5 style={{ color: 'white', fontSize: '2vh' }}>
              {project.currentProject.name}
            </h5>
          </Col>

          <Col xs={2} sm={1} md={1} lg={1}>
            <UserAddOutlined
              onClick={() => {
                setOnModal(!onModal);
              }}
              style={{
                color: 'white',
                fontSize: '3vh',
              }}
            />
          </Col>
          <Col xs={2} sm={1} md={1} lg={1}>
            <UserOutlined
              style={{
                color: 'white',
                fontSize: '3vh',
              }}
            />
          </Col>
          <Col xs={6} sm={4} md={4} lg={2}>
            <h5 style={{ color: 'white', fontSize: '2vh' }}>
              {user.userInfo.name}
            </h5>
          </Col>
          <Col xs={2} sm={2} md={1} lg={1}>
            <Avatar style={{ backgroundColor: user.userInfo.color }} size={30}>
              {user.userInfo.name}
            </Avatar>
          </Col>
        </Row>
      </Header>
      <Content style={{ minHeight: '80vh' }}>
        <Drawer
          visible={collapsed}
          placement="left"
          closable={false}
          bodyStyle={{ padding: 0 }}
          style={{
            marginTop: '10vh',
            marginBottom: '10vh',
            padding: 0,
          }}
        >
          <Row stlye={{ padding: 0, width: '100%', height: '50%' }}>
            <Col span={24} justify="end">
              <Menu
                style={{
                  margin: '0 0 0 0',
                  padding: '0 0 0 0',
                  width: '100%',
                }}
                onSelect={handleMenu}
                selectedKeys={[menu]}
              >
                <Menu.Item
                  style={{
                    margin: '0 0 0 0',
                    paddingLeft: '10%',
                    width: '100%',
                  }}
                  key="1"
                  icon={<MailOutlined />}
                  title="Navigation One"
                >
                  <Link
                    to={{
                      pathname: `/project/${props.match.params.id}/roadmap`,
                    }}
                  >
                    RoadMap
                  </Link>
                </Menu.Item>
                <Menu.Item
                  style={{
                    margin: '0 0 0 0',
                    paddingLeft: '10%',
                    width: '100%',
                  }}
                  key="2"
                  icon={<AppstoreOutlined />}
                  title="Navigation Two"
                >
                  <Link
                    to={{
                      pathname: `/project/${props.match.params.id}/dashboard`,
                    }}
                  >
                    Dashboard
                  </Link>
                </Menu.Item>

                <Menu.Item
                  style={{
                    margin: '0 0 0 0',
                    paddingLeft: '10%',
                    width: '100%',
                  }}
                  key="3"
                  icon={<SettingOutlined />}
                  title="Navigation Three"
                >
                  CHAT
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Drawer>
        <Switch>
          <Route
            path={`/project/:id/roadmap`}
            render={(props) => {
              // return <RoadMap {...props}></RoadMap>;
              return <RoadMap {...props}></RoadMap>;
            }}
          ></Route>
          <Route
            path={`/project/:id/dashboard`}
            render={(props) => {
              return <DashBoard {...props}></DashBoard>;
            }}
          ></Route>
        </Switch>
      </Content>
      <Footer style={{ height: '10vh' }}>1111</Footer>
      <Modal
        maskClosable={false}
        centered
        onCancel={handleClose}
        width={400}
        hieght={400}
        visible={onModal}
        footer={[<div></div>]}
      >
        <Row justify="center">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </Row>
        <Divider></Divider>
        {project.memberList !== null &&
          project.memberList.map((value, key) => {
            return (
              <div key={key}>
                <Row
                  key={key}
                  align="middle"
                  style={{ height: '30px' }}
                  onClick={() => {
                    handleCurr(value);
                  }}
                >
                  <Col
                    style={{
                      height: '50px',
                      marginTop: '3px',
                      marginRight: '10px',
                    }}
                    span={2}
                  >
                    <Avatar style={{ backgroundColor: value.color }}>
                      {value.name}
                    </Avatar>
                  </Col>
                  <Col span={20}>{value.name}</Col>
                </Row>
                <Divider></Divider>
              </div>
            );
          })}
      </Modal>

      <Modal
        key={`sub${1}`}
        style={{ right: '1vw' }}
        centered
        visible={onSub}
        onCancel={handleSubClose}
        width={'50vw'}
        hieght={'50vh'}
        footer={[<div></div>]}
        modalRender={() => {
          return (
            <Card
              key={`curr${currUser.id}`}
              hoverable
              style={{ width: 240 }}
              cover={
                <div
                  style={{
                    background: '#85a5ff',
                    width: 240,
                    height: 130,
                    color: 'white',
                  }}
                >
                  <Row style={{ marginLeft: 25 }}>
                    <Avatar style={{ backgroundColor: currUser.color }}>
                      {currUser.name}
                    </Avatar>
                  </Row>
                  <Row style={{ marginLeft: 25, marginTop: '8px' }}>
                    {currUser.name}
                  </Row>
                  <Row style={{ marginLeft: 25, marginTop: '8px' }}>
                    {currUser.status}
                  </Row>
                </div>
              }
            >
              <div
                style={{
                  background: 'white',
                  width: 200,
                  height: 160,
                }}
              >
                <Row>{currUser.position}</Row>
                <Row justify={'start'}>
                  <Col>
                    <hr style={{ width: '3vw' }}></hr>
                  </Col>
                </Row>
                <Row align="middle">
                  <Col span={5}>Mail</Col>
                  <Col style={{ fontSize: '10px' }}>{currUser.email}</Col>
                </Row>
                <Row align="middle">
                  <Col span={5}>Comments</Col>
                  <Col style={{ fontSize: '10px' }}>{currUser.comments}</Col>
                </Row>
                <Row style={{ hieght: '30px' }}>
                  <Divider></Divider>
                </Row>
                <Row justify="center">@you make me</Row>
              </div>
            </Card>
          );
        }}
      />
    </Layout>
  );
};
export default WithSidebar;
