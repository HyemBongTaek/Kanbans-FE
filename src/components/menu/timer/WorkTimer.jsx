import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { isRestTimeReducer } from "../../../redux/Slice/commonSlice";
import notiSound from "../../../image/audio/Ascending 4.mp3";
import Swal from "sweetalert2";
import useSound from "use-sound";

const WorkTimer = () => {
  const audioPlayer = useRef(null);
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(5);
  const [min, setMin] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const timerId = useRef(null);
  const time = useRef(5);
  const [play] = useSound(notiSound);

  const startTimer = () => {
    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSeconds(time.current % 60);
      time.current -= 1;
      if (time.current < 0) {
        dispatch(isRestTimeReducer());
        clearInterval(timerId.current);
        play();

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
      }
    }, 1000);
    setIsPlay(true);
  };

  const stopTimer = () => {
    setIsPause(true);
    clearInterval(timerId.current);
    timerId.current = 0;
  };

  const reStartTimer = () => {
    setIsPause(false);
    startTimer();
  };

  const resetTimer = () => {
    setIsPlay(false);
    time.current = 5;
    stopTimer();
    setSeconds(5);
    setMin(0);
  };

  return (
    <>
      <div>
        <section>
          {isPlay ? (
            <>
              {isPause ? (
                <div onClick={reStartTimer}>
                  <Icon
                    icon="ant-design:play-circle-filled"
                    color="#8c8c8c"
                    height="30"
                  />
                  restart
                </div>
              ) : (
                <div onClick={stopTimer}>
                  <Icon
                    icon="ant-design:pause-circle-filled"
                    color="#8c8c8c"
                    height="30"
                  />
                </div>
              )}

              <div onClick={resetTimer}>
                <Icon
                  icon="ic:baseline-restart-alt"
                  color="#8c8c8c"
                  height="30"
                />
                Reset
              </div>
            </>
          ) : (
            <div onClick={startTimer}>
              <Icon
                icon="ant-design:play-circle-filled"
                color="#8c8c8c"
                height="30"
              />
            </div>
          )}
        </section>
        <div>
          {min}:{`${seconds < 10 ? `0${seconds}` : seconds}`}
        </div>
      </div>
    </>
  );
};

export default WorkTimer;
