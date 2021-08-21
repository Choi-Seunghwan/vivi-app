import io from 'socket.io-client';
import store from '@/store';

class ServiceWebSocket {
  ws;
  connectionStatus;
  connectionStatuses;

  constructor() {
    this.connectionStatus = 1;
    this.connectionStatuses = {
      IDLE: 1,
      CONNECTING: 2,
      CONNECTED: 3,
      DISCONNECTED: 4,
      WAITING: 5
    };
  }

  wsInit() {
    this.connection();
  }

  connection() {
    this.ws = io('localhost:5000');
    this.ws.on('replyMessage', args => {
      this.replyMessage(args);
    });
  }

  sendMessage(method, args) {
    if (!this.ws) return false;
    this.ws.emit('message', method, args);
  }

  replyMessage(args) {
    const { method } = args;
    const splittedMethod = method.split('/');

    console.log('replyMessage', args);
    store.dispatch(`${splittedMethod[0]}/handleMessage`, args), { root: true };
  }
}

export default new ServiceWebSocket();
