import React from 'react';
import { Row, Col } from 'antd';
const LaneLayout = (props) => {
  const SetColor = () => {
    if (props.title === '대기중') {
      return '#ffec3d';
    } else if (props.title === '완료') {
      return '#73d13d';
    } else {
      return '#fa541c';
    }
  };
  const SetLayoutColor = () => {
    if (props.title === '대기중') {
      return '#fadb14';
    } else if (props.title === '완료') {
      return '#52c41a';
    } else {
      return '#d4380d';
    }
  };
  return (
    <Row
      key={props.name}
      justify="center"
      style={{
        height: '100',
        backgroundColor: SetColor(),
        borderRadius: '10px',
        border: `1px solid ${SetLayoutColor()}`,
      }}
    >
      <h1 style={{ color: 'white', textShadow: '2px 2px lightgray' }}>
        {props.title}
      </h1>
    </Row>
  );
};

export default LaneLayout;
