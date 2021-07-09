import { Client } from '@stomp/stompjs';
import { socketUrl } from '.';
let client;

export const initWebSocket = (wsToken) => {
  client = new Client({
    brokerURL: `${socketUrl}/messenger/websocket?token=${wsToken}`,
    reconnectDelay: 5000,
    heartbeatIncoming: 6000,
    heartbeatOutgoing: 6000,
  });
  return client;
};
