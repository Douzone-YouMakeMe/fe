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
    };
  }, [user.userInfo]);

  const scrollToBottom = useCallback(() => {
    if (user.chatHistory !== null) {
      const { scrollHeight, clientHeight } = scrollRef.current;

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
    if (message !== '') {
      const model = { message: message };
      dispatch({
        type: Constant.SEND_GROUP_MESSAGE,
        payload: model,
      });
      setMessage('');
    }
  };
  const handleKeyUp = (e) => {
    if (message !== '' && message !== '\n') {
      if (e.key === 'Enter') {
        handleClick();
      }
    }
  };
  return (
    <Row justify="center" style={{ width: '100vw' }}>
      <div
        style={{
          width: '70vw',
          height: '75vh',
          minWidth: '360px',
          overflow: 'auto',
          background: 'white',
        }}
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
                    style={{ minHeight: '100px' }}
                  >
                    <div style={{ width: '9%', minWidth: '50px' }}>
                      <Avatar
                        style={{
                          display: 'flex',
                          alignItems: 'center',

                          backgroundColor: member.color,
                          width: '40px',
                          height: '40px',
                        }}
                      >
                        {member.name}
                      </Avatar>
                    </div>
                    <div style={{ minWidth: '200px', width: '40%' }}>
                      <div className="speechBubbleStartLeft">
                        {value.message}
                      </div>
                    </div>
                    <div
                      style={{
                        width: '20%',
                        minWidth: '100px',
                        display: 'flex',
                        alignSelf: 'flex-end',
                      }}
                    >
                      {moment(value.createTime).fromNow()}
                    </div>
                  </Row>
                );
              else {
                return (
                  <Row justify="end" style={{ minHeight: '100px' }}>
                    <div
                      style={{
                        width: '20%',
                        minWidth: '100px',
                        display: 'flex',
                        alignSelf: 'flex-end',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {moment(value.createTime).fromNow()}
                    </div>
                    <div style={{ minWidth: '200px', width: '40%' }}>
                      <div className="speechBubbleStartRight">
                        {value.message}
                      </div>
                    </div>

                    <div
                      style={{
                        width: '9%',
                        minWidth: '50px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignSelf: 'center',
                      }}
                    >
                      <Avatar
                        style={{
                          display: 'flex',
                          alignItems: 'center',

                          backgroundColor: member.color,
                          width: '40px',
                          height: '40px',
                        }}
                      >
                        {member.name}
                      </Avatar>
                    </div>
                  </Row>
                );
              }
            } else if (
              user.chatHistory[key - 1].memberId ===
              user.chatHistory[key].memberId
            ) {
              if (member.id === project.currentMember.id) {
                return (
                  <Row
                    justify="start"
                    align="middle"
                    style={{ minHeight: '100px', marginTop: '30px' }}
                  >
                    <div style={{ width: '9%', minWidth: '50px' }}></div>
                    <div style={{ minWidth: '200px', width: '40%' }}>
                      <div className="speechBubbleLeft">{value.message}</div>
                    </div>
                    <div
                      style={{
                        width: '20%',
                        minWidth: '100px',
                        display: 'flex',
                        alignSelf: 'flex-end',
                      }}
                    >
                      {moment(value.createTime).fromNow()}
                    </div>
                  </Row>
                );
              } else {
                return (
                  <Row
                    justify="end"
                    style={{ marginTop: '30px', minHeight: '100px' }}
                  >
                    <div
                      style={{
                        width: '20%',
                        minWidth: '100px',
                        display: 'flex',
                        alignSelf: 'flex-end',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {moment(value.createTime).fromNow()}
                    </div>
                    <div style={{ minWidth: '200px', width: '40%' }}>
                      <div className="speechBubbleRight">{value.message}</div>
                    </div>

                    <div
                      style={{
                        width: '9%',
                        minWidth: '50px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignSelf: 'center',
                      }}
                    ></div>
                  </Row>
                );
              }
            } else {
              if (member.id === project.currentMember.id) {
                return (
                  <Row
                    justify="start"
                    align="middle"
                    style={{
                      marginTop: '30px',
                      minHeight: '100px',
                    }}
                  >
                    <div style={{ width: '9%', minWidth: '50px' }}>
                      <Avatar
                        style={{
                          display: 'flex',
                          alignItems: 'center',

                          backgroundColor: member.color,
                          width: '40px',
                          height: '40px',
                        }}
                      >
                        {member.name}
                      </Avatar>
                    </div>
                    <div style={{ width: '40%', minWidth: '200px' }}>
                      <div className="speechBubbleStartLeft">
                        {value.message}
                      </div>
                    </div>
                    <div
                      style={{
                        width: '20%',
                        minWidth: '100px',
                        display: 'flex',
                        alignSelf: 'flex-end',
                      }}
                    >
                      {moment(value.createTime).fromNow()}
                    </div>
                  </Row>
                );
              } else {
                return (
                  <Row
                    justify="end"
                    style={{
                      marginTop: '30px',
                      minHeight: '100px',
                    }}
                  >
                    <div
                      style={{
                        width: '20%',
                        minWidth: '100px',
                        display: 'flex',
                        alignSelf: 'flex-end',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {moment(value.createTime).fromNow()}
                    </div>
                    <div style={{ minWidth: '200px', width: '40%' }}>
                      <div className="speechBubbleStartRight">
                        {value.message}
                      </div>
                    </div>

                    <div
                      style={{
                        width: '9%',
                        minWidth: '50px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignSelf: 'center',
                      }}
                    >
                      <Avatar
                        style={{
                          display: 'flex',
                          alignItems: 'center',

                          backgroundColor: member.color,
                          width: '40px',
                          height: '40px',
                        }}
                      >
                        {member.name}
                      </Avatar>
                    </div>
                  </Row>
                );
              }
            }
          })}
      </div>

      {project.currentMember !== null && (
        <Row
          justify="end"
          align="middle"
          style={{
            background: 'white',
            width: '70vw',
            height: '100px',
            minWidth: '360px',
            borderTop: '1px solid lightgray',
          }}
        >
          <div
            style={{
              width: '10%',
              minWidth: '50px',
              display: 'flex',
              justifyContent: 'flex-end',
              alignSelf: 'center',
            }}
          >
            <Avatar
              style={{ width: '50px', height: '50px' }}
              style={{ backgroundColor: project.currentMember.color }}
            >
              {project.currentMember.name}
            </Avatar>
          </div>
          <div style={{ width: '60%', minWidth: '180px' }}>
            <Input.TextArea
              onKeyUp={handleKeyUp}
              style={{ zIndex: 999, height: '90px' }}
              value={message}
              placeholder={'메시지'}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></Input.TextArea>
          </div>
          <div style={{ width: '8%', minWidth: '80px' }}>
            <Button
              style={{ width: '100%', height: '90px' }}
              onClick={handleClick}
            >
              전송
            </Button>
          </div>
        </Row>
      )}
    </Row>
  );
};
export default Chatting;
