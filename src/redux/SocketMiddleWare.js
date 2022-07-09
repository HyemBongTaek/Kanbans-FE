import { Dispatch } from "@reduxjs/toolkit";

// Here can be any dispatch to open a connection
const INIT_KEY = "connect/socket";

export const socketMiddleware = (socket: any) => {
  return (params) => (next: any) => (action: any) => {
    const { Dispatch } = params;
    const { type, payload } = action;

    if (type === INIT_KEY) {
      socket.connect();

      // Example ON
      socket.on("user/connect", (socketIds: any) => {
        socket.emit("sync", socketIds);
      });
    }

    switch (type) {
      // Example EMIT
      case "user/disconnect": {
        socket.emit("joinRoom", payload.room);
        break;
      }

      default:
        break;
    }

    return next(action);
  };
};
