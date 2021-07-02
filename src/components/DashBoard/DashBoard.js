import React, { useEffect, useState, useRef } from "react";
import Board from "react-trello";

import { Card, Row, Modal, Col, Avatar, Input, Button } from "antd";

import DModal from "./components/DModal";
import LaneLayout from "./components/LaneLayout";
import CusCard from "./components/CusCard";
const data = {
  lanes: [
    {
      id: "WAITING",
      title: "할일",
      cards: [
        {
          id: "1",
          title: "Write Blog",
          description: "Can AI make memes",
          state: "WAITING",
        },
        {
          id: "2",
          title: "Pay Rent",
          description: "Transfer via NEFT",
          metadata: { sha: "be312a1" },
          state: "WAITING",
        },
      ],
    },
    {
      id: "DO",
      title: "진행중",
      cards: [
        {
          id: "3",
          title: "Write Blog",
          description: "Can AI make memes",
          state: "DO",
        },
        {
          id: "4",
          title: "Pay Rent",
          description: "Transfer via NEFT",
          metadata: { sha: "be312a1" },
          state: "DO",
        },
      ],
    },
    {
      id: "DONE",
      title: "완료",
      cards: [],
    },
  ],
};
const DashBoard = (props) => {
  const [eventBus, setEventBus] = useState(null);
  const [onModal, setOnModal] = useState(false);
  let count = useRef(data.length);
  let queue = [];
  const handleDragEnd = (
    cardId,
    sourceLaneId,
    targetLaneId,
    position,
    cardDetails,
  ) => {
    if (sourceLaneId !== targetLaneId) {
      const newCurr = {
        id: cardDetails.id,
        description: cardDetails.description,
        state: targetLaneId,
        title: cardDetails.title,
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
      console.log(queue);
    }

    // cardDetails.state = targetLaneId;

    // const newData = produce(data, (draft) => {
    //   draft.lanes[currIndex].cards = [...currNext];
    //   draft.lanes[targetIndex].cards.push(newCurr);
    // });

    // setData(newData);
  };

  const handleClose = () => {
    setOnModal(!onModal);
  };
  const handleSubmit = (e) => {
    eventBus.publish({
      type: "ADD_CARD",
      laneId: e.state,
      card: {
        id: e.id,
        name: e.name,
        title: e.name,
        tag: e.tag,
        state: e.state,
        endDate: e.endDate,
        startDate: e.startDate,
        description: e.description,
      },
    });
    count.current++;
  };
  return (
    <>
      <Row
        style={{ width: "100%", backgroundColor: "#F7F7FF" }}
        justify="center"
      >
        <Button
          style={{
            zIndex: 999,
            width: "30vw",
            marginTop: "4vh",
            marginBottom: "2vh",
          }}
          onClick={() => {
            handleClose();
          }}
        >
          ADD
        </Button>
      </Row>
      <Board
        style={{
          backgroundColor: "#F7F7FF",
          textAlign: "center",
          justifyContent: "center",
          width: "100%",
        }}
        laneStyle={{
          minWidth: "300px",
          width: "25vw",

          margin: "10px",
          textAlign: "center",
          justifyContent: "center",
          backgroundColor: "#ECECFF",
          borderRadius: "10px",
        }}
        handleDragEnd={handleDragEnd}
        cardDraggable={true}
        data={data}
        addCardLink={<button>New Card</button>}
        eventBusHandle={(e) => setEventBus(e)}
        components={{
          Card: (props) => {
            return (
              <CusCard {...props} cnt={count} eventBus={eventBus}></CusCard>
            );
          },
          LaneHeader: (props) => {
            return (
              <LaneLayout
                style={{ width: "100%" }}
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
      ></DModal>
    </>
  );
};

export default DashBoard;
