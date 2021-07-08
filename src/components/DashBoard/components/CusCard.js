import { Row, Card, Divider, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
const CusCard = (props) => {
  const handleClick = () => {
    props.handleCurr(props.id, props.index);
    console.log(props.onChange);
  };

  return (
    <Card
      key={props.id + props.laneId}
      hoverable
      style={{
        width: '100%',
        borderRadius: '10px',
        height: 260,
        marginTop: '10px',
      }}
      onClick={handleClick}
    >
      <div key={props.id}>{props.name}</div>
      <Divider></Divider>
      <div key={props.id + props.description}>{props.description}</div>
      <Divider></Divider>
      {props.hashtag !== null &&
        props.hashtag
          .split('#')
          .filter((value) => {
            return '' !== value;
          })
          .map((value) => {
            return (
              <div key={`${props.id}/${value}`}>{JSON.stringify(value)}</div>
            );
          })}
    </Card>
  );
};
export default CusCard;
