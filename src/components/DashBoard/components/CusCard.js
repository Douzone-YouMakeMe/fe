import { Row, Card, Divider, Modal, Col, Badge } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
const CusCard = (props) => {
  const handleClick = () => {
    props.handleCurr(props.id);
  };

  return (
    <Card
      key={props.id + props.laneId}
      hoverable
      extra={<p>{moment(props.createTime).fromNow()}</p>}
      style={{
        minWidth: '280px',
        width: '20vw',

        borderRadius: '10px',
        height: 200,
        marginTop: '10px',
      }}
      onClick={handleClick}
      title={
        <Badge size={'default'} color={props.color} text={props.name}></Badge>
      }
    >
      <div>
        <p>{props.description}</p>
      </div>
      {!props.hashtag !== null && (
        <Row wrap>
          {props.hashtag
            .split('#')
            .filter((value) => {
              return value !== '';
            })
            .map((value) => {
              return (
                <Col span={8}>
                  <Cbadge {...props} text={value}></Cbadge>
                </Col>
              );
            })}
        </Row>
      )}
    </Card>
  );
};
const Cbadge = (e) => {
  if (e.status === 'waited') {
    return <Badge color={'#ffec3d'} text={e.text}></Badge>;
  } else if (e.status === 'proceed') {
    return <Badge color={'#fa541c'} text={e.text}></Badge>;
  } else {
    return <Badge color={'#73d13d'} text={e.text}></Badge>;
  }
};
export default CusCard;
