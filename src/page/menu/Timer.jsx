import React, { useEffect, useRef, useState } from "react";
import { useInterval } from "../../hooks/useInterval";

const Timer = () => {
  const [min, setMin] = useState(1);
  const [sec, setSec] = useState(0);
  const time = useRef(60);
  const timerId = useRef(null);
  const [click, setClick] = useState(false);

  const times = () => {
    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);
    return () => clearInterval(timerId.current);
  };

  useEffect(() => {
    if (time.current < 0) {
      console.log("울려라울려");
      clearInterval(timerId.current);
    }
  }, [sec]);

  const pauseTimer = () => {
    setClick(!click);
  };
  const resetTimer = () => {
    setMin(1);
    setSec(0);
    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);
    return () => clearInterval(timerId.current);
  };

  return (
    <div>
      {min}분 {sec}초<div onClick={pauseTimer}>일시정지</div>
      <div onClick={times}>시작</div>
      <div onClick={resetTimer}>초기화</div>
    </div>
  );
};

export default Timer;
