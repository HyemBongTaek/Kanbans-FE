import { createSlice, current } from "@reduxjs/toolkit";
import { getTimer } from "../Async/timer";

const TimerSlice = createSlice({
  name: "timer",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTimer.fulfilled, (state, action) => {
      console.log("확인", action.payload);
      state.timerList = action.payload;

      // action.payload.map((day) => {
      //   return state.day.push(day.createdAt);
      // });
    });
  },
});

export default TimerSlice;
