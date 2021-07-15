import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import {
  RiBarChartHorizontalFill,
  RiDashboardFill,
  RiChat1Fill,
} from 'react-icons/ri';
import { AiOutlineOrderedList } from 'react-icons/ai';
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
import Chatting from '../components/Chat/Chatting';
import Constant from '../redux/actionType';
const { Header, Content, Footer } = Layout;
const { Search } = Input;

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
  const handleLeave = () => {
    dispatch({ type: Constant.LEAVE_WORK, payload: null });
  };
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

  const handleCurr = (user) => {
    setCurrUser(user);
    setOnSub(!onSub);
  };
  const defaultCollapse = () => {
    setCollpased(false);
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
    <Layout style={{ backgroundColor: '#F0F8FF' }}>
      <Header
        className="routerHeader"
        style={{
          height: '10vh',
          backgroundColor: 'rgb(29, 144, 251)',
          color: 'white',
        }}
      >
        <Row
          justify="start"
          style={{ height: '94%', marginLeft: '3vw', marginRight: '3vw' }}
          align="middle"
        >
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
            <Link
              to={{
                pathname: `/app/setting/${project.currentProject.id}/user`,
              }}
            >
              <UserOutlined
                style={{
                  color: 'white',
                  fontSize: '3vh',
                }}
              />
            </Link>
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
      <Content
        style={{
          minHeight: '90vh',
          width: '80vw',
          maxWidth: '80vw',

          backgroundColor: '#F0F8FF',
        }}
      >
        <Drawer
          visible={collapsed}
          placement="left"
          closable={false}
          bodyStyle={{ padding: 0 }}
          onClose={() => {
            setCollpased(!collapsed);
          }}
          style={{
            width: '200px',
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
                  icon={<RiBarChartHorizontalFill></RiBarChartHorizontalFill>}
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
                  icon={<RiDashboardFill />}
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
                  icon={<RiChat1Fill />}
                  title="Navigation Three"
                >
                  <Link
                    to={{ pathname: `/project/${props.match.params.id}/chat` }}
                  >
                    CHAT
                  </Link>
                </Menu.Item>
                <Menu.Item
                  style={{
                    margin: '0 0 0 0',
                    paddingLeft: '10%',
                    width: '100%',
                  }}
                  key="4"
                  icon={<AiOutlineOrderedList />}
                  title="Navigation Three"
                >
                  <Link to={{ pathname: `/app/myproject` }}>My Project</Link>
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Drawer>

        <Route
          path={`/project/:id/roadmap`}
          render={(props) => {
            // return <RoadMap {...props}></RoadMap>;
            return (
              <RoadMap closeCollapse={defaultCollapse} {...props}></RoadMap>
            );
          }}
        ></Route>
        <Route
          path={`/project/:id/dashboard`}
          render={(props) => {
            return (
              <DashBoard
                onModal={onModal}
                subModal={onSub}
                collapsed={collapsed}
                closeCollapse={defaultCollapse}
                {...props}
              ></DashBoard>
            );
          }}
        ></Route>
        <Route
          path={`/project/:id/chat`}
          render={(props) => {
            return (
              <Chatting closeCollapse={defaultCollapse} {...props}></Chatting>
            );
          }}
        ></Route>
      </Content>

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
