import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../store";

const SocketSlice = createSlice({
  name: "socket",
  initialState: {},
  reducers: {
    startDragSocket(state, action) {
      console.log("DRAG START");
      console.log("소켓", action.payload);
      const result = action.payload.result;
      socket.emit("dragStart", {
        type: result.type,
        id: result.draggableId,
      });
    },
    endDragSocket(state, action) {
      console.log("여기가끝입니다");
      const result = action.payload;
      console.log("아이디", result.type);
      socket.emit("dragEnd", {
        id: result.id,
        startOrder: result.startOrder,
        startPoint: result.startPoint,
        endPoint: result.endPoint,
        endOrder: result.endOrder,
        room: result.room,
        type: result.type,
      });
    },
    moveResultSocket(state, action) {
      console.log("상대방이 이동중");
    },
  },
});

export const { startDragSocket, endDragSocket, moveResultSocket } =
  SocketSlice.actions;
export default SocketSlice;
