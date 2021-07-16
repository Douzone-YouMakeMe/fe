import Constant from '../redux/actionType';

const chatAPI = {
  initWsConnection: (client) => {
    return { type: Constant.INITSOCKET, payload: client };
  },
  unSubscribeAll: () => {
    return { type: Constant.UNSUBSCRIBE_ALL };
  },
};
export default chatAPI;
