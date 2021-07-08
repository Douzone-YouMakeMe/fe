import { Client } from '@stomp/stompjs';
import { serverUrl } from '.';
let client;

export const initWebSocket = (wsToken) => {
  client = new Client({
    brokerURL: `ws://${serverUrl}/messenger/websocket?token=${wsToken}`,
    reconnectDelay: 5000,
    heartbeatIncoming: 6000,
    heartbeatOutgoing: 6000,
  });
  return client;
};
