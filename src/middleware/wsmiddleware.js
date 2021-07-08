// import Constant from '../redux/actionType';

// let userQueueReplySubscribe;
// let topicNotificationSubscribe;
// let topicCallReplySubscribe;
// let appGroupGetSubscribe;
// let topicGroupSubscribe;

// function initWsAndSubscribe(wsClient, store, url, wsUserTokenValue) {
//   //   console.log(wsClient, store, wsUserTokenValue);
//   const groupUrl = url;
//   const userId = JSON.parse(localStorage.getItem('userInfo')).id;
//   console.log(userId);
//   wsClient.onConnect = () => {
//     userQueueReplySubscribe = wsClient.subscribe('/user/queue/reply', (res) => {
//       const data = JSON.parse(res.body);
//       console.log(data);
//       store.dispatch({
//         type: Constant.SET_WS_GROUPS,
//         payload: data,
//       });
//     });
//     topicNotificationSubscribe = wsClient.subscribe(
//       '/topic/notification/' + userId,
//       (res) => {
//         // console.log('RECEIVING NOTIFICATION');
//         console.log(JSON.parse(res.body));
//         updateGroupsWithLastMessageSent(store, JSON.parse(res.body), userId);
//       },
//     );
//     topicCallReplySubscribe = wsClient.publish({
//       destination: '/app/message',
//       body: wsUserTokenValue,
//     });
//   };
//   wsClient.onWebSocketClose = () => {
//     console.log('ERROR DURING HANDSHAKE WITH SERVER');
//   };
//   wsClient.activate();
// }

// const WsClientMiddleWare = () => {
//   let wsClient = null;
//   return (store) => (next) => (action) => {
//     wsClient = store.getState().user.wsClient;
//     const userId = JSON.parse(localStorage.getItem('userInfo')).id;
//     switch (action.type) {
//       case Constant.INITSOCKET:
//         if (action.payload === null) {
//           break;
//         }
//         wsClient = action.payload.stomp;
//         const wsUserTokenValue = action.payload.token;
//         initWsAndSubscribe(
//           wsClient,
//           store,
//           action.payload.url,
//           wsUserTokenValue,
//         );
//         break;
//       case Constant.UNSUBSCRIBE_ALL:
//         if (wsClient !== null) {
//           if (userQueueReplySubscribe !== undefined) {
//             wsClient.unsubscribe(userQueueReplySubscribe.id);
//           }
//           if (topicNotificationSubscribe !== undefined) {
//             wsClient.unsubscribe(topicNotificationSubscribe.id);
//           }
//           if (topicCallReplySubscribe !== undefined) {
//             wsClient.unsubscribe(topicCallReplySubscribe.id);
//           }
//           if (appGroupGetSubscribe !== undefined) {
//             wsClient.unsubscribe(appGroupGetSubscribe.id);
//           }
//           if (topicGroupSubscribe !== undefined) {
//             wsClient.unsubscribe(topicGroupSubscribe.id);
//           }
//           wsClient
//             .deactivate()
//             .then((r) => {
//               console.log(r);
//               wsClient = null;
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         }
//         break;
//       case Constant.FETCH_GROUP_MESSAGES:
//         if (wsClient !== null) {
//           appGroupGetSubscribe = wsClient.subscribe(
//             '/app/groups/get/' + action.payload.url,
//             (res) => {
//               const data = JSON.parse(res.body);
//               store.dispatch({
//                 type: Constant.SET_CHAT_HISTORY,
//                 payload: data,
//               });
//             },
//           );
//           topicGroupSubscribe = wsClient.subscribe(
//             '/topic/' + action.payload.url,
//             (res) => {
//               const data = JSON.parse(res.body);
//               store.dispatch({
//                 type: Constant.ADD_CHAT_HISTORY,
//                 payload: data,
//               });
//             },
//           );
//         }
//         break;
//       case Constant.SEND_GROUP_MESSAGE:
//         if (wsClient !== null) {
//           wsClient.publish({
//             destination:
//               '/app/message/text/' + userId + '/group/' + action.payload.pid,
//             body: JSON.stringify(action.payload),
//           });
//         }
//         break;
//       //   case UNSUBSCRIBE_ALL:
//       //     if (wsClient !== null) {
//       //       if (userQueueReplySubscribe !== undefined) {
//       //         wsClient.unsubscribe(userQueueReplySubscribe.id);
//       //       }
//       //       if (topicNotificationSubscribe !== undefined) {
//       //         wsClient.unsubscribe(topicNotificationSubscribe.id);
//       //       }
//       //       if (topicCallReplySubscribe !== undefined) {
//       //         wsClient.unsubscribe(topicCallReplySubscribe.id);
//       //       }
//       //       if (appGroupGetSubscribe !== undefined) {
//       //         wsClient.unsubscribe(appGroupGetSubscribe.id);
//       //       }
//       //       if (topicGroupSubscribe !== undefined) {
//       //         wsClient.unsubscribe(topicGroupSubscribe.id);
//       //       }
//       //       wsClient
//       //         .deactivate()
//       //         .then((r) => {
//       //           console.log(r);
//       //           wsClient = null;
//       //         })
//       //         .catch((err) => {
//       //           console.log(err);
//       //         });
//       //     }
//       //     break;
//       //   case SEND_TO_SERVER:
//       //     handleRtcActions(wsClient, store, action.payload);
//       //     break;
//       default:
//         console.log(action);
//         return next(action);
//     }
//   };
// };

// /**
//  * Update groups sidebar with new messages
//  *
//  * @param store
//  * @param value
//  * @param userId
//  */
// function updateGroupsWithLastMessageSent(store, value, userId) {
//   const groupIdToUpdate = value.groupId;
//   const groups = store.getState().ws.wsUserGroups;
//   let groupToPlaceInFirstPosition = groups.findIndex(
//     (elt) => elt.id === groupIdToUpdate,
//   );
//   if (groupToPlaceInFirstPosition === -1) {
//     return;
//   }
//   let groupsArray = [...groups];
//   let item = { ...groupsArray[groupToPlaceInFirstPosition] };
//   item.lastMessage = value.message;
//   item.lastMessageDate = value.lastMessageDate;
//   item.lastMessageSeen = value.fromUserId !== userId;
//   groupsArray.splice(groupToPlaceInFirstPosition, 1);
//   groupsArray.unshift(item);
//   // store.dispatch({ type: SET_WS_GROUPS, payload: groupsArray });
// }

// function markMessageAsSeen(store, groupUrl) {
//   //   const groups = store.getState().ws.wsUserGroups;
//   //   const groupToUpdateIndex = groups.findIndex((elt) => elt.url === groupUrl);
//   //   if (groupToUpdateIndex === -1) {
//   //     return;
//   //   }
//   //   if (groups[groupToUpdateIndex].lastMessageSeen === false) {
//   //     return;
//   //   }
//   //   let groupsArray = [...groups];
//   //   groupsArray[groupToUpdateIndex].lastMessageSeen = false;
//   //   store.dispatch({ type: SET_WS_GROUPS, payload: groupsArray });
// }

// export default WsClientMiddleWare();
