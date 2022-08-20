import { createSlice, current } from "@reduxjs/toolkit";
import { getTimer } from "../Async/timer";

const TimerSlice = createSlice({
  name: "timer",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTimer.fulfilled, (state, action) => {
      state.timerList = action.payload.alarms;
      state.timerTotal = action.payload.allAlarm;
    });
  },
});

export default TimerSlice;
