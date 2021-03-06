import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
  Button,
} from "antd";
import {
  MenuOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import RoadMap from "../components/RoadMap/RoadMap";
const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

const users = [
  {
    id: 1,
    name: "gyun",
    projectId: 1,
    icon: "",
    email: "rbsrbsrbs2222@gmail.com",
    tel: "010-0000-0000",
    state: "good",
    staetMessage: "fxxk",
    position: "frontEnd",
  },
  {
    id: 2,
    name: "hwan",
    projectId: 1,
    icon: "",
    email: "rbsrbsrbs2222@gmail.com",
    tel: "010-0000-0000",
    state: "good",
    staetMessage: "fxxk",
    position: "backEnd",
  },
  {
    id: 3,
    name: "hwan3",
    projectId: 1,
    icon: "",
    email: "rbsrbsrbs2222@gmail.com",
    tel: "010-0000-0000",
    state: "good",
    staetMessage: "fxxk",
  },
  {
    id: 4,
    name: "hwan4",
    projectId: 1,
    icon: "",
    email: "rbsrbsrbs2222@gmail.com",
    tel: "010-0000-0000",
    state: "good",
    staetMessage: "fxxk",
  },
  {
    id: 5,
    name: "hwan5",
    projectId: 1,
    icon: "",
    email: "rbsrbsrbs2222@gmail.com",
    tel: "010-0000-0000",
    state: "good",
    staetMessage: "fxxk",
  },
];
const WithSidebar = () => {
  useEffect(() => {
    return () => {
      console.log("hello");
    };
  }, []);
  const [collapsed, setCollpased] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const [onSub, setOnSub] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const onSearch = (e) => {};
  const onCollapse = () => {
    setCollpased(!collapsed);
  };
  const handleClose = () => {
    setOnModal(!onModal);
  };
  const handleSubClose = () => {
    setOnSub(!onSub);
  };
  const handleClick = (e) => {
    setOnModal(!onModal);
  };
  const handleCurr = (user) => {
    console.log(user);
    setCurrUser(user);
    setOnSub(!onSub);
  };
  return (
    <Layout>
      <Header
        style={{
          height: "13vh",
          color: "white",
          paddingLeft: "1vw",
          paddingRight: "1vw",
        }}
      >
        <Row justify="start" style={{ height: "100%" }} align="middle">
          <Col xs={2} sm={2} md={1} lg={1}>
            <MenuOutlined
              style={{
                color: "white",
                fontSize: "3vh",
              }}
              onClick={onCollapse}
            />
          </Col>
          <Col xs={10} sm={14} md={16} lg={18}>
            <h5 style={{ color: "white", fontSize: "2vh" }}>ProjectName</h5>
          </Col>

          <Col xs={2} sm={1} md={1} lg={1}>
            <UserAddOutlined
              onClick={() => {
                setOnModal(!onModal);
              }}
              style={{
                color: "white",
                fontSize: "3vh",
              }}
            />
          </Col>
          <Col xs={2} sm={1} md={1} lg={1}>
            <UserOutlined
              style={{
                color: "white",
                fontSize: "3vh",
              }}
            />
          </Col>
          <Col xs={6} sm={4} md={4} lg={2}>
            <h5 style={{ color: "white", fontSize: "2vh" }}>username</h5>
          </Col>
          <Col xs={2} sm={2} md={1} lg={1}>
            <Avatar size={30}></Avatar>
          </Col>
        </Row>
      </Header>
      <Content style={{ minHeight: "80vh" }}>
        <Drawer
          visible={collapsed}
          placement="left"
          closable={false}
          onClose={onCollapse}
          bodyStyle={{ padding: 0 }}
          style={{
            marginTop: "10vh",
            marginBottom: "10vh",
            width: "100%",
            padding: 0,
          }}
        >
          <Row stlye={{ padding: 0, width: "100%", height: "50%" }}>
            <Col span={24} justify="end">
              <Menu
                onClick={handleClick}
                style={{
                  margin: "0 0 0 0",
                  padding: "0 0 0 0",
                  width: "100%",
                }}
                defaultSelectedKeys={["1"]}
              >
                <Menu.Item
                  style={{
                    margin: "0 0 0 0",
                    paddingLeft: "10%",
                    width: "100%",
                  }}
                  key="1"
                  icon={<MailOutlined />}
                  title="Navigation One"
                >
                  RoadMap
                </Menu.Item>
                <Menu.Item
                  style={{
                    margin: "0 0 0 0",
                    paddingLeft: "10%",
                    width: "100%",
                  }}
                  key="2"
                  icon={<AppstoreOutlined />}
                  title="Navigation Two"
                >
                  DashBoard
                </Menu.Item>
                <Menu.Item
                  style={{
                    margin: "0 0 0 0",
                    paddingLeft: "10%",
                    width: "100%",
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
        <Route
          path="/project/roadmap"
          render={(props) => {
            // return <RoadMap {...props}></RoadMap>;
            return <RoadMap {...props}></RoadMap>;
          }}
        ></Route>
      </Content>
      <Footer style={{ height: "10vh" }}>1111</Footer>
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
        {users !== null &&
          users.map((value, key) => {
            return (
              <div>
                <Row
                  align="middle"
                  key={key}
                  style={{ height: "30px" }}
                  onClick={() => {
                    handleCurr(value);
                  }}
                >
                  <Col
                    style={{
                      height: "50px",
                      marginTop: "3px",
                      marginRight: "10px",
                    }}
                    span={2}
                  >
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar>
                  </Col>
                  <Col span={20}>{value.name}</Col>
                </Row>
                <Divider></Divider>
              </div>
            );
          })}
      </Modal>
      <Modal
        style={{ right: "1vw" }}
        centered
        visible={onSub}
        onCancel={handleSubClose}
        width={"50vw"}
        hieght={"50vh"}
        footer={[<div></div>]}
        modalRender={() => {
          return (
            <Card
              key={currUser.id}
              hoverable
              style={{ width: 240 }}
              cover={
                <div
                  style={{
                    background: "#85a5ff",
                    width: 240,
                    height: 130,
                    color: "white",
                  }}
                >
                  <Row style={{ marginLeft: 25 }}>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar>
                  </Row>
                  <Row style={{ marginLeft: 25, marginTop: "8px" }}>
                    {currUser.name}
                  </Row>
                  <Row style={{ marginLeft: 25, marginTop: "8px" }}>
                    {currUser.state}
                  </Row>
                  <Row style={{ marginLeft: 25, marginTop: "8px" }}>
                    {currUser.staetMessage}
                  </Row>
                </div>
              }
            >
              <div
                style={{
                  background: "white",
                  width: 200,
                  height: 160,
                }}
              >
                <Row>{currUser.position}</Row>
                <Row justify={"start"}>
                  <Col>
                    <hr style={{ width: "3vw" }}></hr>
                  </Col>
                </Row>
                <Row>
                  <Col span={5}>Tel</Col>
                  <Col>{currUser.tel}</Col>
                </Row>
                <Row align="middle">
                  <Col span={5}>Mail</Col>
                  <Col style={{ fontSize: "10px" }}>{currUser.email}</Col>
                </Row>
                <Row style={{ hieght: "30px" }}>
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
