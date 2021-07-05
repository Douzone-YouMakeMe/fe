import React, { useEffect, useState } from 'react';

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
} from 'antd';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import { config } from '../../util/configStyle';
import TimeLine from 'react-gantt-timeline';

import { generatorColor } from '../../util/GeneratorColor';
import { useDispatch, useSelector } from 'react-redux';
import { projectAction } from '../../redux/module/project/projectAction';

const RoadMap = (props) => {
  const comment = [];
  const [onModal, setOnModal] = useState(false);
  const [item, setItem] = useState(null);
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    handleInit();
  }, []);
  const handleInit = async () => {
    await dispatch(projectAction.getProjectWork(props.match.params.id));
  };
  const data = [];
  const handleSelect = async (object) => {
    setItem(object);
    setOnModal(!onModal);
    await dispatch(projectAction.getCurrentComment(object.id));
  };
  const handleClose = () => {
    setOnModal(!onModal);
    setNewComment('');
  };
  const onSearch = (e) => {
    console.log(e);
  };
  const handleChangeComment = (e) => {
    setNewComment(e.target.value);
  };
  const handleCommentSend = async (e) => {
    const body = {
      memberId: project.currentMember.id,
      workId: item.id,
      comments: newComment,
    };
    await dispatch(projectAction.insertComment(body));
  };
  return (
    <div className="app-container" style={{ width: '100vw', height: '80vh' }}>
      <Row style={{ height: '10vh', width: '100%' }} align="middle">
        <Col xs={6} sm={12} md={12} lg={6}>
          <Input.Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: '20vw' }}
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
                        backgroundColor: '#f56a00',
                      }}
                    >
                      K
                    </Avatar>
                  </Menu.Item>
                  <Menu.Item>
                    <Tooltip title="Ant User" placement="top">
                      <Avatar
                        style={{
                          backgroundColor: '#87d068',
                        }}
                        icon={<UserOutlined />}
                      />
                    </Tooltip>
                    <Avatar
                      style={{
                        backgroundColor: '#1890ff',
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
                  backgroundColor: '#f56a00',
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
        style={{ height: '80vh', width: '100vw' }}
      >
        {project.workList !== null && (
          <TimeLine
            config={config}
            onSelectItem={handleSelect}
            data={project.workList.map((value) => {
              return {
                ...value,
                id: value.id,
                start: value.startedAt,
                end: value.finishedAt,
              };
            })}
            links={null}
          />
        )}
      </div>

      {item !== null && (
        <Modal
          style={{ left: '30vw', top: '10vh' }}
          width={600}
          height={700}
          key={item.id}
          visible={onModal}
          onCancel={() => {
            handleClose();
          }}
          footer={[
            <Row justify="start" style={{ width: '100%' }}>
              <Col span={2}>
                <Avatar style={{ backgroundColor: user.userInfo.color }}>
                  {user.userInfo.name}
                </Avatar>
              </Col>
              <Col span={14}>
                <Input
                  value={newComment}
                  onChange={handleChangeComment}
                  style={{ marginLeft: '10px' }}
                ></Input>
              </Col>
              <Col span={6}>
                <Button onClick={handleCommentSend}>전송</Button>
              </Col>
            </Row>,
          ]}
        >
          <Row>
            <Col>
              <h2>{project.currentProject.name}</h2>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  border: '0.1px solid lightgray',
                  backgroundColor: item.color,
                  marginRight: '10px',
                }}
              ></div>
            </Col>
            <Col>
              <h5>{item.name}</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>Description</h6>
            </Col>
          </Row>
          <Row>
            <Col>{item.description}</Col>
          </Row>
          <Row>
            <Col span={8}>startDate</Col>
            <Col>{item.startedAt}</Col>
          </Row>
          <Row>
            <Col span={8}>endDate</Col>
            <Col>{item.finishedAt}</Col>
          </Row>
          <Row align="middle">
            <Col span={8}>
              <h5 style={{ color: 'lgihtgray' }}>HASH TAG </h5>
            </Col>
            <Col>{item.hashtag}</Col>
          </Row>
          <Row>
            <List
              key={`list${item.id}`}
              style={{ width: '100%', height: '50vh', overflowY: 'scroll' }}
              dataSource={project.currentComment}
              renderItem={(item) => (
                <List.Item
                  key={`listItems${item.id}`}
                  style={{ width: '100%' }}
                >
                  <Row align="middle" style={{ width: '100%' }}>
                    <Col span={4}>
                      <Avatar
                        style={{
                          backgroundColor: project.memberList.filter(
                            (value) => {
                              return item.memberId === value.id;
                            },
                          )[0].color,
                        }}
                      >
                        {JSON.stringify(
                          project.memberList.filter((value) => {
                            return item.memberId === value.id;
                          })[0].name,
                        )}
                      </Avatar>
                    </Col>
                    <Col span={20}>
                      <Row style={{ width: '100%' }} align="bottom">
                        <Col span={6}>
                          <h6> {item.name}</h6>
                        </Col>
                        <Col span={18}>
                          <h6 style={{ color: 'lightgray' }}>{item.email}</h6>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={18}>{item.comments}</Col>
                        <Col span={6}>
                          <p style={{ fontSize: '2px' }}>{item.createdAt}</p>
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
