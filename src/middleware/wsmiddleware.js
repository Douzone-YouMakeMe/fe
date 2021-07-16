import Constant from '../redux/actionType';

let userQueueReplySubscribe;
let topicNotificationSubscribe;
let topicCallReplySubscribe;
let appGroupGetSubscribe;
let topicGroupSubscribe;

function initWsAndSubscribe(wsClient, store, url, wsUserTokenValue) {
  const groupUrl = url;
  const userId = JSON.parse(localStorage.getItem('userInfo')).id;

  wsClient.onConnect = () => {
    userQueueReplySubscribe = wsClient.subscribe('/user/queue/reply', (res) => {
      const data = JSON.parse(res.body);

      store.dispatch({
        type: Constant.SET_WS_GROUPS,
        payload: data,
      });
    });
    topicNotificationSubscribe = wsClient.subscribe(
      '/topic/notification/' + userId,
      (res) => {
        updateGroupsWithLastMessageSent(store, JSON.parse(res.body), userId);
      },
    );
    topicCallReplySubscribe = wsClient.publish({
      destination: '/app/message',
      body: wsUserTokenValue,
    });

    store.dispatch({
      type: Constant.FETCH_GROUP_MESSAGES,
      payload: store.getState().project.currentProject.id,
    });
  };
  wsClient.onWebSocketClose = () => {};
  wsClient.activate();
}

const WsClientMiddleWare = () => {
  let wsClient = null;
  return (store) => (next) => (action) => {
    // wsClient = store.getState().user.wsClient;

    switch (action.type) {
      case Constant.INITSOCKET:
        if (action.payload === null) {
          break;
        }
        wsClient = action.payload.stomp;
        const wsUserTokenValue = action.payload.token;
        initWsAndSubscribe(
          wsClient,
          store,
          action.payload.url,
          wsUserTokenValue,
        );
        break;
      case Constant.UNSUBSCRIBE_ALL:
        if (wsClient !== null) {
          if (userQueueReplySubscribe !== undefined) {
            wsClient.unsubscribe(userQueueReplySubscribe.id);
          }
          if (topicNotificationSubscribe !== undefined) {
            wsClient.unsubscribe(topicNotificationSubscribe.id);
          }
          if (topicCallReplySubscribe !== undefined) {
            wsClient.unsubscribe(topicCallReplySubscribe.id);
          }
          if (appGroupGetSubscribe !== undefined) {
            wsClient.unsubscribe(appGroupGetSubscribe.id);
          }
          if (topicGroupSubscribe !== undefined) {
            wsClient.unsubscribe(topicGroupSubscribe.id);
          }
          wsClient
            .deactivate()
            .then((r) => {
              wsClient = null;
            })
            .catch((err) => {});
        }
        break;
      case Constant.FETCH_GROUP_MESSAGES:
        if (wsClient !== null) {
          appGroupGetSubscribe = wsClient.subscribe(
            '/app/group/get/' + action.payload,
            (res) => {
              const data = JSON.parse(res.body);

              store.dispatch({
                type: Constant.SET_CHAT_HISTORY,
                payload: data,
              });
            },
          );
          topicGroupSubscribe = wsClient.subscribe(
            '/topic/' + action.payload,
            (res) => {
              const data = JSON.parse(res.body);

              store.dispatch({
                type: Constant.ADD_CHAT_HISTORY,
                payload: data,
              });
            },
          );
        }
        break;

      case Constant.SEND_GROUP_MESSAGE:
        if (wsClient !== null) {
          wsClient.publish({
            destination:
              '/app/message/text/' +
              store.getState().project.currentMember.id +
              '/project/' +
              store.getState().project.currentProject.id,
            body: JSON.stringify(action.payload),
          });
        }
        break;
      case Constant.UNSUBSCRIBE_ALL:
        if (wsClient !== null) {
          if (userQueueReplySubscribe !== undefined) {
            wsClient.unsubscribe(userQueueReplySubscribe.id);
          }
          if (topicNotificationSubscribe !== undefined) {
            wsClient.unsubscribe(topicNotificationSubscribe.id);
          }
          if (topicCallReplySubscribe !== undefined) {
            wsClient.unsubscribe(topicCallReplySubscribe.id);
          }
          if (appGroupGetSubscribe !== undefined) {
            wsClient.unsubscribe(appGroupGetSubscribe.id);
          }
          if (topicGroupSubscribe !== undefined) {
            wsClient.unsubscribe(topicGroupSubscribe.id);
          }
          wsClient
            .deactivate()
            .then((r) => {
              wsClient = null;
            })
            .catch((err) => {
              console.error(err);
            });
        }
        break;

      default:
        return next(action);
    }
  };
};

/**
 * Update groups sidebar with new messages
 *
 * @param store
 * @param value
 * @param userId
 */
function updateGroupsWithLastMessageSent(store, value, userId) {
  const groupIdToUpdate = value.groupId;
  const groups = store.getState().ws.wsUserGroups;
  let groupToPlaceInFirstPosition = groups.findIndex(
    (elt) => elt.id === groupIdToUpdate,
  );
  if (groupToPlaceInFirstPosition === -1) {
    return;
  }
  let groupsArray = [...groups];
  let item = { ...groupsArray[groupToPlaceInFirstPosition] };
  item.lastMessage = value.message;
  item.lastMessageDate = value.lastMessageDate;
  item.lastMessageSeen = value.fromUserId !== userId;
  groupsArray.splice(groupToPlaceInFirstPosition, 1);
  groupsArray.unshift(item);
  store.dispatch({ type: Constant.SET_WS_GROUPS, payload: groupsArray });
}

export default WsClientMiddleWare();
