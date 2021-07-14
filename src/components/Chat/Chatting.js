import { Card, Row, Col, Avatar, Input, Button } from 'antd';
import moment from 'moment';
import React, { useEffect, useState, useRef, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import chatAPI from '../../api/chatAPI';
import Constant from '../../redux/actionType';
import { actionCreators } from '../../redux/module/user/userAction';

import { initWebSocket } from '../../util/websocketConfig';
const Chatting = (props) => {
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const scrollRef = useRef();
  useEffect(() => {
    props.closeCollapse();
    initWs();

    return () => {
      dispatch(chatAPI.unSubscribeAll());
      dispatch({ type: Constant.LEAVE_CHAT });
      console.log('DisConnected');
    };
  }, [user.userInfo]);

  const scrollToBottom = useCallback(() => {
    if (user.chatHistory !== null) {
      // scrollRef.current.scrollIntoView(false);
      const { scrollHeight, clientHeight } = scrollRef.current;
      console.log(scrollHeight);
      console.log(clientHeight);
      scrollRef.current.scrollTop = scrollHeight - clientHeight;
    }
  });
  useEffect(() => {
    scrollToBottom();
  }, [user.chatHistory]);
  useEffect(() => {}, [user.chatHistory]);
  const initWs = async () => {
    if (user.userInfo.wsToken !== null) {
      const wsClient = await initWebSocket(user.userInfo.wstoken);
      const toSend = {
        stomp: wsClient,
        token: user.userInfo.wstoken,
        url: project.currentProject.id,
      };
      dispatch(chatAPI.initWsConnection(toSend));
    }
  };
  const handleClick = () => {
    // console.log(message);
    // const formData = new FormData();
    // formData.append('message', message);
    const model = { message: message };
    dispatch({
      type: Constant.SEND_GROUP_MESSAGE,
      payload: model,
    });
    setMessage('');
  };
  const handleKeyUp = (e) => {
    if (message !== '') {
      if (e.key === 'Enter') {
        handleClick();
      }
    }
  };
  return (
    <div>
      <Card style={{ width: '70vw', marginLeft: '10vw' }}>
        <div
          style={{ width: '100%', height: '70vh', overflow: 'auto' }}
          ref={scrollRef}
        >
          {user.chatHistory != null &&
            project.memberList !== null &&
            user.chatHistory.map((value, key) => {
              const member = project.memberList.find((member) => {
                return member.id === value.memberId;
              });
              if (key === 0) {
                if (member.id === project.currentMember.id)
                  return (
                    <Row
                      justify="start"
                      align="middle"
                      style={{ height: '100px' }}
                    >
                      <Col span={2}>
                        <Avatar style={{ backgroundColor: member.color }}>
                          {member.name}
                        </Avatar>
                      </Col>
                      <Col span={6}>
                        <Card>{value.message}</Card>
                      </Col>
                      <Col
                        style={{ display: 'flex', alignSelf: 'center' }}
                        span={4}
                      >
                        {moment(value.createTime).fromNow()}
                      </Col>
                    </Row>
                  );
                else {
                  return (
                    <Row
                      style={{ height: '100px', marginTop: '30px' }}
                      justify="end"
                    >
                      <Col
                        style={{ display: 'flex', alignSelf: 'center' }}
                        span={4}
                      >
                        {moment(value.createTime).fromNow()}
                      </Col>
                      <Col span={6}>
                        <Card>{value.message}</Card>
                      </Col>
                      <Col span={2} style={{ textAlign: 'right' }}>
                        <Avatar style={{ backgroundColor: member.color }}>
                          {member.name}
                        </Avatar>
                      </Col>
                    </Row>
                  );
                }
              } else if (
                user.chatHistory[key - 1].memberId ===
                user.chatHistory[key].memberId
              ) {
                if (member.id === project.currentMember.id) {
                  return (
                    <Row justify="start" style={{ marginTop: '30px' }}>
                      <Col span={2}></Col>
                      <Col span={6}>
                        <Card
                          style={{ height: '100px', borderTopLeftRadius: '0' }}
                        >
                          {value.message}
                        </Card>
                      </Col>
                      <Col
                        style={{ display: 'flex', alignSelf: 'center' }}
                        span={4}
                      >
                        {moment(value.createTime).fromNow()}
                      </Col>
                    </Row>
                  );
                } else {
                  return (
                    <Row justify="end" style={{ height: '100px' }}>
                      <Col
                        style={{ display: 'flex', alignSelf: 'center' }}
                        span={4}
                      >
                        {moment(value.createTime).fromNow()}
                      </Col>
                      <Col span={6}>
                        <Card>{value.message}</Card>
                      </Col>
                      <Col span={2}></Col>
                    </Row>
                  );
                }
              } else {
                if (member.id === project.currentMember.id) {
                  return (
                    <Row justify="start" style={{ height: '100px' }}>
                      <Col span={2}>
                        <Avatar style={{ backgroundColor: member.color }}>
                          {member.name}
                        </Avatar>
                      </Col>
                      <Col span={6}>
                        <Card>{value.message}</Card>
                      </Col>
                      <Col
                        style={{ display: 'flex', alignSelf: 'center' }}
                        span={4}
                      >
                        {moment(value.createTime).fromNow()}
                      </Col>
                    </Row>
                  );
                } else {
                  return (
                    <Row style={{ height: '100px' }} justify="end">
                      <Col
                        style={{ display: 'flex', alignSelf: 'center' }}
                        span={4}
                      >
                        {moment(value.createTime).fromNow()}
                      </Col>
                      <Col span={6}>
                        <Card>{value.message}</Card>
                      </Col>
                      <Col span={2} style={{ textAlign: 'right' }}>
                        <Avatar style={{ backgroundColor: member.color }}>
                          {member.name}
                        </Avatar>
                      </Col>
                    </Row>
                  );
                }
              }
            })}
        </div>
      </Card>
      {project.currentMember !== null && (
        <Row justify="end" style={{ background: 'white', marginLeft: '10vw' }}>
          <Col span={1}>
            <Avatar style={{ backgroundColor: project.currentMember.color }}>
              {project.currentMember.name}
            </Avatar>
          </Col>
          {/* <Col>
            <Input type="file"></Input>
          </Col> */}
          <Col span={10}>
            <Input
              onKeyUp={handleKeyUp}
              style={{ zIndex: 999 }}
              value={message}
              placeholder={'메시지'}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></Input>
          </Col>
          <Col span={2}>
            <Button style={{ width: '100%' }} onClick={handleClick}>
              전송
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};
export default Chatting;
