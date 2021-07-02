import React, { useEffect, useState } from "react";
import Board from "react-trello";
import produce from "immer";
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
      id: "END",
      title: "완료",
      card: [],
    },
  ],
};
const DashBoard = (props) => {
  const handleDragStart = (e, f) => {
    console.log(e, f);
  };
  let queue = [];
  const handleDragEnd = (
    cardId,
    sourceLaneId,
    targetLaneId,
    position,
    cardDetails,
  ) => {
    const targetIndex = data.lanes.findIndex((value) => {
      return value.id === targetLaneId;
    });

    const currIndex = data.lanes.findIndex((value) => {
      return value.id === sourceLaneId;
    });
    const currNext = data.lanes[currIndex].cards.filter((value) => {
      return value.id === cardId;
    });
    const newCurr = {
      id: cardDetails.id,
      description: cardDetails.description,
      state: cardDetails.state,
      title: cardDetails.title,
    };
    
    // if (queue.length === 0) {
    //   cardDetails.push(newCurr);
    // } else {
    //   let idx=queue.findIndex((value)=>{return value.id===newCurr.id})
    //   if(idx===-1){
        
    //   }
    // }

    // cardDetails.state = targetLaneId;

    // const newData = produce(data, (draft) => {
    //   draft.lanes[currIndex].cards = [...currNext];
    //   draft.lanes[targetIndex].cards.push(newCurr);
    // });

    // setData(newData);
  };
  const handleDataChange = (e) => {
    console.log(data);
  };

  return (
    <Board
      handleDragStart={handleDragStart}
      handleDragEnd={handleDragEnd}
      cardDraggable={true}
      onDataChange={handleDataChange}
      data={data}
    ></Board>
  );
};

export default DashBoard;
