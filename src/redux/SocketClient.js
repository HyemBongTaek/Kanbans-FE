import { io, Socket } from "socket.io-client";

const token = localStorage.getItem("token");

export default class SocketClient {
  socket: Socket | null | undefined;

  connect() {
    this.socket = io.connect("https://cocorikanbans.site", {
      extraHeaders: {
        authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(eventName, data) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  }

  on(eventName, func) {
    if (this.socket) {
      this.socket.on(eventName, func);
    }
  }
}
