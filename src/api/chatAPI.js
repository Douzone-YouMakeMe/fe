import axios from 'axios';
import Constant from '../redux/actionType';
import { serverUrl } from '../util';

const chatAPI = {
  initWsConnection: (client) => {
    // console.log(client);
    return { type: Constant.INITSOCKET, payload: client };
  },
  unSubscribeAll: () => {
    return { type: Constant.UNSUBSCRIBE_ALL };
  },
};
export default chatAPI;
