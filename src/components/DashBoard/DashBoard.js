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
import DUModal from './components/DUModal';
import LaneLayout from './components/LaneLayout';
import CusCard from './components/CusCard';
import { useDispatch, useSelector } from 'react-redux';
import { projectAction } from '../../redux/module/project/projectAction';
import Constant from '../../redux/actionType';

const DashBoard = (props) => {
  const [eventBus, setEventBus] = useState(null);
  const [onModal, setOnModal] = useState(false);
  const [onUModal, setOnUModal] = useState(false);
  const dispatch = useDispatch();
  const [index, setIndex] = useState('');
  const [current, setCurrent] = useState(null);
  const project = useSelector((state) => state.project);
  const workList = project.tempWorkList;
  const collapsed = props.collapsed;
  useEffect(() => {
    handleData();
  }, [collapsed, props.onModal, props.onSub]);
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
    const param = {
      ...e,
      startedAt: moment.utc(e.startedAt, utcFormat).local().format(utcFormat),
      finishedAt: moment.utc(e.finishedAt, utcFormat).local().format(utcFormat),
      status: 'waited',
      memberId: project.currentMember.id,
      projectId: project.currentProject.id,
    };

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
  useEffect(() => {
    handleData();
  }, [onModal]);
  useEffect(() => {
    handleData();
  }, [onUModal]);
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
    if (sourceLaneId !== targetLaneId) {
      let index = workList.findIndex((value) => {
        return value.id === cardDetails.id;
      });
      const newCurr = {
        ...cardDetails,
        memberId: project.currentMember.id,
        projectId: project.currentProject.id,
        status: targetLaneId,
      };
      // if (queue.length === 0) {
      //   queue.push(newCurr);
      // } else {
      //   let idx = queue.findIndex((value) => {
      //     return value.id === newCurr.id;
      //   });
      //   if (idx === -1) {
      //     queue.push(newCurr);
      //   } else {
      //     queue.splice(idx, 1, newCurr);
      //   }
      // }
      dispatch(projectAction.moveWorkList(newCurr));
      // dispatch({
      //   type: Constant.UPDATE_TEMP,
      //   payload: { idx: index, value: newCurr },
      // });
      handleData();
    }
  };
  const handleUpdate = (e, prevStatus) => {
    let utcFormat = 'yyyy-MM-DD HH:mm:ss';
    let index = workList.findIndex((value) => {
      return value.id === e.id;
    });

    const param = {
      ...e,
      startedAt: moment.utc(e.startedAt, utcFormat).local().format(utcFormat),
      finishedAt: moment.utc(e.finishedAt, utcFormat).local().format(utcFormat),
      memberId: project.currentMember.id,
      projectId: project.currentProject.id,
    };
    dispatch({
      type: Constant.UPDATE_TEMP,
      payload: { idx: index, value: e },
    });
    dispatch(projectAction.modifyWorkList(param));
    handleData();
  };
  const handleClose = () => {
    setCurrent(null);
    setOnModal(!onModal);
    handleData();
  };
  const handleUclose = () => {
    setOnUModal(!onUModal);
    handleData();
  };
  const handleCurr = (e) => {
    setCurrent(e);
    setOnUModal(true);
    handleData();
  };
  const deleteSubmit = (e) => {
    dispatch(projectAction.deleteWork(e));
  };
  return (
    <div
      style={{
        backgroundColor: 'white',
        border: '2px solid lightgray',
        width: '90vw',
        minWidth: '330px',
        height: '85vh',
        marginLeft: '5vw',
        marginTop: '2vh',
        overflow: 'scroll',
        borderRadius: 20,
      }}
    >
      <Row style={{ width: '90vw' }} justify="center">
        <Button
          style={{
            zIndex: 999,
            width: '30vw',
            marginTop: '2vh',
            marginBottom: '2vh',
            margintRight: '1vw',
          }}
          onClick={() => {
            handleClose();
          }}
        >
          ADD
        </Button>
      </Row>
      <Board
        onCardMoveAcrossLanes={(fromLaneId, toLaneId, cardId, index) => {}}
        style={{
          // minWidth: '300px',
          backgroundColor: 'white',
          // textAlign: 'center',
          // justifyContent: 'center',
          height: '75vh',
          overflowY: 'scroll',
          minwidth: '330px',
          marginLeft: '5vw',
          width: '89vw',
        }}
        laneStyle={{
          // width: '33%',
          width: '26vw',
          minWidth: '300px',
          // marginLeft: '3vw',
          // height: '72vh',
          overflowY: 'scroll',
          overflowX: 'hidden',
          backgroundColor: '#E0FFFF',

          borderRadius: '10px',
        }}
        onDataChange={(e) => {
          // handleData();
        }}
        handleDragEnd={handleDragEnd}
        laneDraggable={false}
        cardDraggable={true}
        data={initLayout}
        eventBusHandle={(e) => setEventBus(e)}
        components={{
          Card: (props) => {
            return <CusCard handleCurr={handleCurr} {...props}></CusCard>;
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
      {current !== null && (
        <DUModal
          current={current}
          index={index}
          visible={onUModal}
          handleSubmit={handleUpdate}
          handleClose={handleUclose}
          afterClose={handleData}
          onCancel={handleUclose}
          deleteSubmit={deleteSubmit}
        ></DUModal>
      )}
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
