import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import chatAPI from '../../api/chatAPI';
import { actionCreators } from '../../redux/module/user/userAction';

import { initWebSocket } from '../../util/websocketConfig';
const Chatting = (props) => {
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  useEffect(() => {
    initWs();
    return () => {
      dispatch(chatAPI.unSubscribeAll());
      console.log('DisConnected');
    };
  }, [user.userInfo]);
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
  return <div>채팅이에요</div>;
};
export default Chatting;
