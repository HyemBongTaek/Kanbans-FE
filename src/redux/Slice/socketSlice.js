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
    EndDragSocket(state, action) {
      console.log("여기가끝입니다");
    },
  },
});

export const { startDragSocket, EndDragSocket } = SocketSlice.actions;
export default SocketSlice;
