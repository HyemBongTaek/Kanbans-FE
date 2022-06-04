import React, { useState } from "react";
import { isRestTimeReducer } from "../../../redux/Slice/commonSlice";
import { useDispatch } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useCountdown } from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

const RelaxTimer = () => {
  const dispatch = useDispatch();
  const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
  console.log(startTime);
  const endTime = startTime + 10; // use UNIX timestamp in seconds
  console.log(endTime);

  const remainingTime = endTime - startTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;
  const clickTimer = () => {
    dispatch(isRestTimeReducer());
  };
  return (
    <div>
      <CountdownCircleTimer
        {...timerProps}
        colors="#EF798A"
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("seconds", getTimeMinutes(hourSeconds - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
    </div>
  );
};

export default RelaxTimer;
