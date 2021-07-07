import React, { useEffect, useState, useRef } from 'react';
import Board from 'react-trello';

import {
  DatePicker,
  Dropdown,
  Menu,
  Row,
  Modal,
  Col,
  Avatar,
  Input,
  Button,
} from 'antd';

import DModal from './components/DModal';
import LaneLayout from './components/LaneLayout';
import CusCard from './components/CusCard';
import { useDispatch, useSelector } from 'react-redux';
import { projectAction } from '../../redux/module/project/projectAction';
import Constant from '../../redux/actionType';
import { generatorColor } from '../../util/GeneratorColor';

const DashBoard = (props) => {
  const [eventBus, setEventBus] = useState(null);
  const [onModal, setOnModal] = useState(false);
  const [current, setCurrent] = useState({ key: 'waited', value: '대기중' });
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const initLayout = {
    lanes: [
      {
        id: 'waited',
        title: '대기중',
        cards: [],
      },
      { id: 'proceed', title: '진행중', cards: [] },
      { id: 'finished', title: '완료', cards: [] },
    ],
  };
  const handleSubmit = () => {
    dispatch({
      type: Constant.ADD_TEMP,
      payload: {
        id: count.current,
        startDate: start.format('YYYY-MM-DD'),
        endDate: end.format('YYYY-MM-DD'),
        description,
        name,
        hashtag: tag,
        status: current.key,
      },
    });
    count.current++;
    handleClose();
  };

  const handleStart = (m, s) => {
    setStart(m);
  };
  const handleEnd = (m, s) => {
    setEnd(m);
  };
  const handleName = ({ target }) => {
    setName(target.value);
  };
  const handleDescription = ({ target }) => {
    setDescription(target.value);
  };
  const handleTag = ({ target }) => {
    setTag(target.value);
  };
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const workList = project.tempWorkList;
  const handleInit = async () => {
    await dispatch(projectAction.getProjectWork(props.match.params.id));
  };
  const leaveWork = async () => {
    await dispatch({ type: Constant.LEAVE_WORK, payload: null });
  };
  useEffect(() => {
    handleInit();
  }, []);
  useEffect(() => {
    handleData();
  }, [workList]);
  useEffect(() => {
    handleData();
  }, [eventBus]);
  const handleData = () => {
    if (eventBus !== null && workList !== null) {
      workList.map((value) => {
        eventBus.publish({
          type: 'ADD_CARD',
          laneId: value.status,
          card: {
            ...value,
          },
        });
      });
    }
    console.log(initLayout);
  };
  let count = useRef(10000);
  let queue = [];
  const handleDragEnd = (
    cardId,
    sourceLaneId,
    targetLaneId,
    position,
    cardDetails,
  ) => {
    console.log('카드 아이디가', cardId);
    console.log('어디로', targetLaneId);
    console.log('어디서', sourceLaneId);
    if (sourceLaneId !== targetLaneId) {
      let index = workList.findIndex((value) => {
        return value.id === cardDetails.id;
      });
      const newCurr = {
        ...cardDetails,
        status: targetLaneId,
      };
      if (queue.length === 0) {
        queue.push(newCurr);
      } else {
        let idx = queue.findIndex((value) => {
          return value.id === newCurr.id;
        });
        if (idx === -1) {
          queue.push(newCurr);
        } else {
          queue.splice(idx, 1, newCurr);
        }
      }
      dispatch({
        type: Constant.UPDATE_TEMP,
        payload: { idx: index, value: newCurr },
      });
      handleData();
    }
  };

  const handleClose = () => {
    setOnModal(!onModal);
    handleData();
  };

  return (
    <>
      <Row
        style={{ width: '100%', backgroundColor: '#F7F7FF' }}
        justify="center"
      >
        <Button
          style={{
            zIndex: 999,
            width: '30vw',
            marginTop: '4vh',
            marginBottom: '2vh',
          }}
          onClick={() => {
            handleClose();
          }}
        >
          ADD
        </Button>
      </Row>
      <Board
        outFocus={(e) => {
          console.log(e);
        }}
        style={{
          backgroundColor: '#F7F7FF',
          textAlign: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
        laneStyle={{
          minWidth: '300px',
          width: '25vw',

          margin: '10px',
          textAlign: 'center',
          justifyContent: 'center',
          backgroundColor: '#ECECFF',
          borderRadius: '10px',
        }}
        onDataChange={(e) => {
          console.log(e);
        }}
        handleDragEnd={handleDragEnd}
        laneDraggable={false}
        cardDraggable={true}
        data={initLayout}
        eventBusHandle={(e) => setEventBus(e)}
        onCardDelete={(e) => {
          console.log('DELETE');
        }}
        components={{
          Card: (props) => {
            return <CusCard {...props} eventBus={eventBus}></CusCard>;
          },
          LaneHeader: (props) => {
            return (
              <LaneLayout
                style={{ width: '100%' }}
                count={count}
                {...props}
              ></LaneLayout>
            );
          },
        }}
      ></Board>

      {/* <DModal
        count={count}
        visible={onModal}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      ></DModal> */}
      <Modal
        width={800}
        height={700}
        visible={onModal}
        afterClose={() => {
          console.log('sss');
          handleData();
        }}
        onCancel={() => {
          handleClose();
        }}
        footer={[
          <Button
            key={'등록'}
            onClick={handleSubmit}
            style={{ width: '100px', background: '#69c0ff', color: 'white' }}
          >
            등록
          </Button>,
        ]}
      >
        <Row>
          <Col>
            <h2>TeamName</h2>
          </Col>
        </Row>
        <Row style={{ height: '80%', marginBottom: '10px' }}>
          <Col span={4}>
            <div
              style={{
                width: '80%',
                height: '80%',
                border: '0.1px solid lightgray',
                backgroundColor: generatorColor(),
                marginRight: '10px',
              }}
            ></div>
          </Col>
          <Col sm={6} lg={6}>
            <h5>WorkName</h5>
          </Col>
          <Col sm={12} lg={14}>
            <Input
              name="name"
              value={name}
              onChange={handleName}
              placeholder="작업명을 적으세요"
            />
          </Col>
        </Row>
        <Row style={{ height: '80%', marginBottom: '10px' }} align="middle">
          <Col sm={4}></Col>
          <Col sm={6} lg={6}>
            <h5>Description</h5>
          </Col>
          <Col sm={12}>
            <Input
              value={description}
              onChange={handleDescription}
              name="description"
              placeholder="작업설명 적으세요"
            ></Input>
          </Col>
        </Row>
        <Row style={{ height: '80%', marginBottom: '10px' }} align="middle">
          <Col sm={4}></Col>
          <Col sm={6} lg={6}>
            <h5>state</h5>
          </Col>
          <Col sm={12}>
            <Dropdown
              key={`${current.value}`}
              overlay={
                <Menu selectedKeys={[current.key]} name="state">
                  <Menu.Item
                    key="wating"
                    onClick={() => {
                      setCurrent({ key: 'waited', value: '대기중' });
                    }}
                  >
                    대기중
                  </Menu.Item>
                  <Menu.Item
                    key="proceed"
                    onClick={() => {
                      setCurrent({ key: 'proceed', value: '진행중' });
                    }}
                  >
                    진행중
                  </Menu.Item>
                  <Menu.Item
                    key="finished"
                    onClick={() => {
                      setCurrent({ key: 'finished', value: '완료' });
                    }}
                  >
                    완료
                  </Menu.Item>
                </Menu>
              }
            >
              <div key={`${current.value}${current.key}`}>{current.value}</div>
            </Dropdown>
          </Col>
        </Row>
        <Row style={{ height: '80%', marginBottom: '10px' }} align="middle">
          <Col sm={4}></Col>
          <Col sm={6} lg={6}>
            <h5>startDate</h5>
          </Col>
          <Col sm={12}>
            <DatePicker
              value={start}
              onChange={handleStart}
              name="startDate"
            ></DatePicker>
          </Col>
        </Row>
        <Row style={{ height: '80%', marginBottom: '10px' }} align="middle">
          <Col sm={4}></Col>
          <Col sm={6} lg={6}>
            <h5>endDate</h5>
          </Col>
          <Col sm={12}>
            <DatePicker
              value={end}
              onChange={handleEnd}
              name="endDate"
            ></DatePicker>
          </Col>
        </Row>
        <Row style={{ height: '80%', marginBottom: '10px' }} align="middle">
          <Col sm={4}></Col>
          <Col sm={6} lg={6}>
            <h5>#Tag</h5>
          </Col>
          <Col sm={12}>
            <Input name="tag" value={tag} onChange={handleTag}></Input>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default DashBoard;
