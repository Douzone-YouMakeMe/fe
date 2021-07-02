import React, { useState } from "react";

import {
  Row,
  Col,
  Input,
  Dropdown,
  Button,
  Menu,
  Avatar,
  Tooltip,
  Modal,
  List,
} from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";

import TimeLine from "react-gantt-timeline";

import { generatorColor } from "../../util/GeneratorColor";

const RoadMap = (props) => {
  const config = {
    header: {
      //Targert the time header containing the information month/day of the week, day and time.
      top: {
        //Tartget the month elements
        style: { backgroundColor: "#333333" }, //The style applied to the month elements
      },
      middle: {
        //Tartget elements displaying the day of week info
        style: { backgroundColor: "chocolate" }, //The style applied to the day of week elements
        selectedStyle: { backgroundColor: "#b13525" }, //The style applied to the day of week elements when is selected
      },
      bottom: {
        style: { background: "grey", fontSize: 9 }, //the style tp be applied
        selectedStyle: { backgroundColor: "#b13525", fontWeight: "bold" }, //the style tp be applied  when selected
      },
    },
    taskList: {
      //the right side task list
      title: {
        //The title od the task list
        label: "projectName", //The caption to display as title
        style: {
          backgroundColor: "#333333",
          borderBottom: "solid 1px silver",
          color: "white",
          textAlign: "center",
        }, //The style to be applied to the title
      },
      task: {
        style: { backgroundColor: "#fbf9f9" }, // the style to be applied
      },
      verticalSeparator: {
        //the vertical seperator use to resize he width of the task list
        style: { backgroundColor: "#333333" }, //the style
        grip: {
          //the four square grip inside the vertical separator
          style: { backgroundColor: "#cfcfcd" }, //the style to be applied
        },
      },
    },
    dataViewPort: {
      //The are where we display the task
      rows: {
        //the row constainting a task
        style: {
          backgroundColor: "#fbf9f9",
          borderBottom: "solid 0.5px #cfcfcd",
          height: "15vh",
        },
      },
      task: {
        showLabel: false, //If the task display the a lable
        style: {
          position: "absolute",
          borderRadius: 14,
          color: "white",
          textAlign: "center",
          backgroundColor: "grey",
        },
        selectedStyle: {}, //the style tp be applied  when selected
      },
    },
    links: {
      //The link between two task
      color: "black",
      selectedColor: "#ff00fa",
    },
  };
  const comment = [
    {
      id: 1,
      key: 1,
      name: "gyun",
      email: "rbsghks01@gmail.com",
      createdAt: "2020-06-20 06:03:00",
    },
    {
      id: 2,
      name: "gyun",
      email: "rbsghks01@gmail.com",
      createdAt: "2020-06-20 06:03:00",
    },
    {
      id: 3,
      name: "gyun",
      email: "rbsghks01@gmail.com",
      createdAt: "2020-06-20 06:03:00",
    },
    {
      id: 4,
      name: "gyun",
      email: "rbsghks01@gmail.com",
      createdAt: "2020-06-20 06:03:00",
    },
    {
      id: 5,
      name: "gyun",
      email: "rbsghks01@gmail.com",
      createdAt: "2020-06-20 06:03:00",
    },
    {
      id: 6,
      name: "gyun",
      email: "rbsghks01@gmail.com",
      createdAt: "2020-06-20 06:03:00",
    },
    {
      id: 7,
      name: "gyun",
      email: "rbsghks01@gmail.com",
      createdAt: "2020-06-20 06:03:00",
    },
    {
      id: 8,
      name: "gyun",
      email: "rbsghks01@gmail.com",
      createdAt: "2020-06-20 06:03:00",
    },
  ];
  const [onModal, setOnModal] = useState(false);
  const [item, setItem] = useState(null);
  // const [loading, setLoading] = useState(null);
  let d1 = new Date();
  let d2 = new Date();
  d2.setDate(d2.getDate() + 5);
  let d3 = new Date();
  d3.setDate(d3.getDate() + 8);
  let d4 = new Date();
  d4.setDate(d4.getDate() + 20);
  const data = [
    {
      id: 1,
      start: d1,
      end: d2,
      name: "Demo Task 1",
      title: "goodness",
    },
    {
      id: 2,
      start: d3,
      end: d4,
      name: "Demo Task 2",
      color: "orange",
      title: "goodness",
    },
  ];
  const handleSelect = (object) => {
    setItem(object);
    setOnModal(!onModal);
  };
  const handleClose = () => {
    setOnModal(!onModal);
  };
  const onSearch = (e) => {
    console.log(e);
  };

  return (
    <div className="app-container" style={{ width: "100vw", height: "80vh" }}>
      <Row style={{ height: "10vh", width: "100%" }} align="middle">
        <Col xs={6} sm={12} md={12} lg={6}>
          <Input.Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: "20vw" }}
          />
        </Col>
        <Col xs={6} sm={10} md={10} lg={2}>
          <Dropdown
            overlay={() => {
              return (
                <Menu>
                  <Menu.Item>대기중</Menu.Item>
                  <Menu.Item>할일</Menu.Item>
                  <Menu.Item>완료</Menu.Item>
                </Menu>
              );
            }}
            placement="bottomLeft"
            arrow
          >
            <Button>상태</Button>
          </Dropdown>
        </Col>
        <Col xs={12} sm={2} md={2}>
          <Dropdown
            overlay={() => {
              return (
                <Menu>
                  <Menu.Item>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  </Menu.Item>
                  <Menu.Item>
                    <Avatar
                      style={{
                        backgroundColor: "#f56a00",
                      }}
                    >
                      K
                    </Avatar>
                  </Menu.Item>
                  <Menu.Item>
                    <Tooltip title="Ant User" placement="top">
                      <Avatar
                        style={{
                          backgroundColor: "#87d068",
                        }}
                        icon={<UserOutlined />}
                      />
                    </Tooltip>
                    <Avatar
                      style={{
                        backgroundColor: "#1890ff",
                      }}
                      icon={<AntDesignOutlined />}
                    />
                  </Menu.Item>
                </Menu>
              );
            }}
          >
            <Button type="text">
              <Avatar
                style={{
                  backgroundColor: "#f56a00",
                }}
              >
                K
              </Avatar>
            </Button>
          </Dropdown>
        </Col>
      </Row>
      <div
        className="time-line-container"
        style={{ height: "80vh", width: "100vw" }}
      >
        <TimeLine
          config={config}
          onSelectItem={handleSelect}
          data={data}
          links={null}
        />
      </div>

      {item !== null && (
        // <RModal
        //   key={item.id}
        //   visible={onModal}
        //   handleClose={handleClose}
        //   item={item}
        // ></RModal>

        <Modal
          style={{ left: "30vw", top: "10vh" }}
          width={600}
          height={700}
          key={item.id}
          visible={onModal}
          onCancel={() => {
            handleClose();
          }}
          footer={[
            <Row justify="start" style={{ width: "100%" }}>
              <Col span={2}>
                <Avatar style={{ backgroundColor: generatorColor() }}>
                  3333333
                </Avatar>
              </Col>
              <Col span={14}>
                <Input style={{ marginLeft: "10px" }}></Input>
              </Col>
              <Col span={6}>
                <Button>전송</Button>
              </Col>
            </Row>,
          ]}
        >
          <Row>
            <Col>
              <h2>TeamName</h2>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  border: "0.1px solid lightgray",
                  backgroundColor: generatorColor(),
                  marginRight: "10px",
                }}
              ></div>
            </Col>
            <Col>
              <h5>WorkName</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>Description</h6>
            </Col>
          </Row>
          <Row>
            <Col>blahblahblahblah</Col>
          </Row>
          <Row>
            <Col span={8}>startDate</Col>
            <Col>2021-09-20</Col>
          </Row>
          <Row>
            <Col span={8}>endDate</Col>
            <Col>2021-09-22</Col>
          </Row>
          <Row align="middle">
            <Col span={8}>
              <h5 style={{ color: "lgihtgray" }}>HASH TAG </h5>
            </Col>
            <Col>#xxx#html#gsgs</Col>
          </Row>
          <Row>
            <List
              key={`list${item.id}`}
              style={{ width: "100%", height: "50vh", overflowY: "scroll" }}
              dataSource={comment}
              renderItem={(item) => (
                <List.Item
                  key={`listItems${item.id}`}
                  style={{ width: "100%" }}
                >
                  <Row align="middle" style={{ width: "100%" }}>
                    <Col span={4}>
                      <Avatar style={{ backgroundColor: generatorColor() }}>
                        {item.name}
                      </Avatar>
                    </Col>
                    <Col span={20}>
                      <Row style={{ width: "100%" }} align="bottom">
                        <Col span={6}>
                          <h6> {item.name}</h6>
                        </Col>
                        <Col span={18}>
                          <h6 style={{ color: "lightgray" }}>{item.email}</h6>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={18}>Hello</Col>
                        <Col span={6}>
                          <p style={{ fontSize: "2px" }}>{item.createdAt}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </List.Item>
              )}
            ></List>
          </Row>
        </Modal>
      )}
    </div>
  );
};

export default RoadMap;
