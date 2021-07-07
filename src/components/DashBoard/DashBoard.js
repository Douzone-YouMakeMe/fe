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
import moment from 'moment';
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
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const workList = project.tempWorkList;
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
  const handleSubmit = (e) => {
    let utcFormat = 'yyyy-MM-DD HH:mm:ss';
    // let dateFormat1 = moment
    //   .utc(startedTime, utcFormat)
    //   .local()
    //   .format(utcFormat);

    const param = {
      ...e,
      startedAt: moment.utc(e.startedAt, utcFormat).local().format(utcFormat),
      finishedAt: moment.utc(e.finishedAt, utcFormat).local().format(utcFormat),
      memberId: project.currentMember.id,
      projectId: project.currentProject.id,
    };
    // dispatch({
    //   type: Constant.ADD_TEMP,
    //   payload: param,
    // });
    dispatch(projectAction.addWorkList(param));
    handleClose();
  };

  const handleInit = async () => {
    await dispatch(projectAction.getProjectWork(props.match.params.id));
  };

  useEffect(() => {
    props.closeCollapse();
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
      console.log(newCurr);
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
    <div>
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
            margintRight: '1vw',
          }}
          onClick={() => {
            handleClose();
          }}
        >
          ADD
        </Button>
        <Button
          style={{
            zIndex: 999,
            width: '30vw',
            marginTop: '4vh',
            marginBottom: '2vh',
            marginLeft: '1vw',
          }}
        >
          수정
        </Button>
      </Row>
      <Board
        style={{
          minWidth: '300px',
          backgroundColor: '#F7F7FF',
          textAlign: 'center',
          justifyContent: 'center',
          width: '100vw',
          overflow: 'wrap',
        }}
        laneStyle={{
          minWidth: '300px',
          width: '25vw',
          margin: '10px',
          backgroundColor: '#ECECFF',
          borderRadius: '10px',
        }}
        onDataChange={(e) => {
          handleData();
        }}
        handleDragEnd={handleDragEnd}
        laneDraggable={false}
        cardDraggable={true}
        data={initLayout}
        eventBusHandle={(e) => setEventBus(e)}
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

      <DModal
        count={count}
        visible={onModal}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        afterClose={handleData}
        onCancel={handleClose}
      ></DModal>
    </div>
  );
};

export default DashBoard;
