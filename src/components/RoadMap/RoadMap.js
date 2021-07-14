import React, { useEffect, useState } from 'react';
import { config } from '../../util/configStyle';
import {
  Row,
  Col,
  Input,
  Dropdown,
  Button,
  Menu,
  Avatar,
  Modal,
  List,
  Empty,
} from 'antd';

import TimeLine from 'react-gantt-timeline';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { projectAction } from '../../redux/module/project/projectAction';
import Constant from '../../redux/actionType';

const RoadMap = (props) => {
  const [onModal, setOnModal] = useState(false);
  const [item, setItem] = useState(null);
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const [data, setData] = useState(null);
  const [key, setKey] = useState({ key: 'all', name: '모두' });
  const [condition, setCondition] = useState([false, false, false]);
  const [search, setSearch] = useState('');
  const [onLoad, setOnLoad] = useState(false);

  useEffect(() => {
    setData(project.workList);
  }, [project.workList]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    props.closeCollapse();
    handleInit();
    setOnLoad(true);
    return () => {
      setOnModal(false);
      setItem(null);
      setKey({ key: 'all', name: '모두' });
      setNewComment('');
      setCondition([false, false, false]);
      setSearch('');
    };
  }, []);

  useEffect(() => {
    onFilter();
  }, [condition]);
  const handleInit = async () => {
    await dispatch(projectAction.getProjectWork(props.match.params.id));
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  const handleSelect = async (object) => {
    setItem(object);
    setOnModal(!onModal);
    await dispatch(projectAction.getCurrentComment(object.id));
  };
  const handleClose = () => {
    setOnModal(!onModal);
    setNewComment('');
  };
  const onSearch = () => {
    const newCondition = condition.map((value, key) => {
      if (key === 0) {
        return true;
      } else {
        return value;
      }
    });
    setCondition(newCondition);
  };
  const onFilter = () => {
    let newData = project.workList;
    if (condition[0] === true) {
      newData = newData.filter((value) => {
        return value.name.indexOf(search) !== -1;
      });
    }
    if (condition[1] === true) {
      newData = newData.filter((value) => {
        return value.status === key.key || key.key === 'all';
      });
    }
    setData(newData);
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
    setNewComment('');
  };
  const onSelected = (e) => {
    if (e.key === 'all') {
      setKey(Object.assign({ key: e.key, name: '모두' }));
    } else if (e.key === 'proceed') {
      setKey(Object.assign({ key: e.key, name: '진행중' }));
    } else if (e.key === 'waited') {
      setKey(Object.assign({ key: e.key, name: '대기중' }));
    } else {
      setKey(Object.assign({ key: e.key, name: '완료' }));
    }
    const newCondition = condition.map((value, key) => {
      if (key === 1) {
        return true;
      } else {
        return value;
      }
    });
    setCondition(newCondition);
  };

  return (
    <div
      className="app-container"
      style={{
        width: '90vw',
        height: '80vh',
        backgroundColor: 'white',
        marginLeft: '5vw',
        marginTop: '5vh',
        border: '0.1px solid lightgray',
        borderRadius: 20,
        overflow: 'hidden',
      }}
    >
      <Row
        style={{
          height: '10vh',
          width: '100%',
        }}
        align="middle"
      >
        <Col style={{ marginLeft: '5vw' }} xs={6} sm={12} md={12} lg={6}>
          <Input.Search
            placeholder="input search text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onSearch={onSearch}
            style={{ width: '20vw' }}
          />
        </Col>
        <Col xs={6} sm={10} md={10} lg={2}>
          <Dropdown
            overlay={() => {
              return (
                <Menu onClick={onSelected} selectedKeys={[key.key]}>
                  <Menu.Item key="all">모두</Menu.Item>
                  <Menu.Item key="waited">대기중</Menu.Item>
                  <Menu.Item key="proceed">진행중</Menu.Item>
                  <Menu.Item key="finished">완료</Menu.Item>
                </Menu>
              );
            }}
            placement="bottomLeft"
            arrow
          >
            <Button>{key.name}</Button>
          </Dropdown>
        </Col>
        <Col xs={6} sm={2} md={2}></Col>
      </Row>
      {project.workList !== null && project.workList.length !== 0 ? (
        <Row justify="center" style={{ backgroundColor: 'white' }}>
          <div
            className="time-line-container"
            style={{
              height: '60vh',
              width: '80vw',
              backgroundColor: 'white',
            }}
          >
            {data !== null && (
              <div>
                <TimeLine
                  mode="month"
                  itemheight={30}
                  config={{
                    ...config,
                    taskList: {
                      title: {
                        label: 'work',
                        style: {
                          fontSize: '20px',
                          backgroundColor: String('#40a9ff'),
                          color: 'white',
                          textAlign: 'center',
                        },
                      },
                      task: {
                        style: {
                          borderBottom: '1.5px solid #bae7ff',
                          backgroundColor: 'white',
                          fontSize: '15px',
                          fontstyle: 'bold',
                        }, // the style to be applied
                      },
                      verticalSeparator: {
                        style: { display: 'none' }, //the style
                        grip: {
                          //the four square grip inside the vertical separator
                          style: { visbility: 'hidden' }, //the style to be applied
                        },
                      },
                    },
                  }}
                  onSelectItem={handleSelect}
                  data={data.map((value) => {
                    return {
                      ...value,
                      key: value.id,
                      id: value.id,
                      start: value.startedAt,
                      end: value.finishedAt,
                    };
                  })}
                  links={null}
                />
              </div>
            )}
          </div>
        </Row>
      ) : (
        <Row style={{ height: '60vh' }} align={'middle'} justify="center">
          <Empty />
          Dash보드에서 작업을 추가하세요
        </Row>
      )}

      {item !== null && user.userInfo !== null && (
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
            <Row key={item.value} justify="start" style={{ width: '100%' }}>
              <Col span={2}>
                <Avatar
                  style={{
                    backgroundColor: user.userInfo.color,
                  }}
                >
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
                        key={item.id + `itemid`}
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
                          <p style={{ fontSize: '2px' }}>
                            {moment(item.createTime).fromNow()}
                          </p>
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
