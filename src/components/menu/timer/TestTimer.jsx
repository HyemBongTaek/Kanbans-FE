// // import React, { useEffect, useRef, useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { isRestTimeReducer } from "../../../redux/Slice/commonSlice";
// // import styles from "./style/_FocusTimer.module.scss";
// //
// // // notification sound
// // import notiSound from "../../../static/audio/Ascending 4.mp3";
// //
// // // 아이콘, notification, sound
// // import { Icon } from "@iconify/react";
// // import Swal from "sweetalert2";
// // import useSound from "use-sound";
// // import TimerDropDown from "./TimerDropDown";
// //
// // const WorkTimer = () => {
// //   const dispatch = useDispatch();
// //   const [seconds, setSeconds] = useState(5);
// //   const [min, setMin] = useState(0);
// //   const [isPlay, setIsPlay] = useState(false);
// //   const [isPause, setIsPause] = useState(false);
// //   const [isDone, setIsDone] = useState(false);
// //
// //   const [isTime, setIsTime] = useState(null);
// //
// //   const timerId = useRef(null);
// //   const time = useRef(5);
// //   const [play] = useSound(notiSound);
// //
// //   const startTimer = () => {
// //     timerId.current = setInterval(() => {
// //       setMin(parseInt(time.current / 60));
// //       setSeconds(time.current % 60);
// //       time.current -= 1;
// //       if (time.current < 0) {
// //         dispatch(isRestTimeReducer());
// //         clearInterval(timerId.current);
// //         play();
// //
// //         const Toast = Swal.mixin({
// //           toast: true,
// //           position: "top-end",
// //           showConfirmButton: false,
// //           timer: 2000,
// //           timerProgressBar: true,
// //           didOpen: (toast) => {
// //             toast.addEventListener("mouseenter", Swal.stopTimer);
// //             toast.addEventListener("mouseleave", Swal.resumeTimer);
// //           },
// //         });
// //
// //         Toast.fire({
// //           icon: "success",
// //           title: "잠시 휴식시간입니다!",
// //         });
// //       }
// //     }, 1000);
// //     setIsPlay(true);
// //   };
// //
// //   //시간 도중에 멈추고 싶을 때
// //   const stopTimer = () => {
// //     setIsPause(true);
// //     clearInterval(timerId.current);
// //     timerId.current = 0;
// //   };
// //
// //   //일시정지한 시간 다시 시작할 때
// //   const reStartTimer = () => {
// //     setIsPause(false);
// //     startTimer();
// //   };
// //
// //   //시간 리셋하고 싶을 때
// //   const resetTimer = () => {
// //     setIsPlay(false);
// //     time.current = 5;
// //     stopTimer();
// //     setSeconds(5);
// //     setMin(0);
// //   };
// //
// //   console.log("이츠타임", isTime);
// //   return (
// //     <>
// //       <div className={styles.work_timer}>
// //         <TimerDropDown setIsTime={setIsTime} />
// //         <div>
// //           {min}:{`${seconds < 10 ? `0${seconds}` : seconds}`}
// //         </div>
// //         {isPlay ? (
// //           <>
// //             {isPause ? (
// //               <div onClick={reStartTimer}>
// //                 <Icon
// //                   className={styles.icon}
// //                   icon="ant-design:play-circle-filled"
// //                 />
// //                 restart
// //               </div>
// //             ) : (
// //               <div onClick={stopTimer}>
// //                 <Icon
// //                   className={styles.icon}
// //                   icon="ant-design:pause-circle-filled"
// //                 />
// //               </div>
// //             )}
// //
// //             <div onClick={resetTimer}>
// //               <Icon className={styles.icon} icon="ic:baseline-restart-alt" />
// //               Reset
// //             </div>
// //           </>
// //         ) : (
// //           <div onClick={startTimer}>
// //             <Icon
// //               className={styles.icon}
// //               icon="ant-design:play-circle-filled"
// //             />
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };
// //
// // export default WorkTimer;
// //
// // import React, { useEffect, useState } from "react";
// // import { isRestTimeReducer } from "../../../redux/Slice/commonSlice";
// // import { useDispatch } from "react-redux";
// // import { CountdownCircleTimer } from "react-countdown-circle-timer";
// // import styles from "./style/_RelaxTimer.module.scss";
// // import { Icon } from "@iconify/react";
// // import Swal from "sweetalert2";
// // import { formatRemainingTime } from "./utils/FormatTime";
// // import TimerDropDown from "./TimerDropDown";
// //
// // const WorkTimer = () => {
// //   const hours = 60;
// //   const [time, setTime] = useState(5);
// //   const dispatch = useDispatch();
// //   const [play, setPlay] = useState(false);
// //   const [pause, setPause] = useState(false);
// //   const clickTimer = () => {
// //     dispatch(isRestTimeReducer());
// //   };
// //   const renderTime = ({ remainingTime }) => {
// //     if (remainingTime === 0) {
// //       const Toast = Swal.mixin({
// //         toast: true,
// //         position: "top-end",
// //         showConfirmButton: false,
// //         timer: 3000,
// //         timerProgressBar: true,
// //         didOpen: (toast) => {
// //           toast.addEventListener("mouseenter", Swal.stopTimer);
// //           toast.addEventListener("mouseleave", Swal.resumeTimer);
// //         },
// //       });
// //
// //       Toast.fire({
// //         icon: "success",
// //         title: "잠시 휴식을 취해보세요",
// //       });
// //       return dispatch(isRestTimeReducer());
// //       // <div className={styles.timer}>Too lale...</div>;
// //     }
// //
// //     const resetTimer = () => {
// //       setPlay(false);
// //       clearInterval(time);
// //     };
// //
// //     return (
// //       <>
// //         <div className={styles.timer}>
// //           <div className={styles.text}>Work Time</div>
// //           <div className={styles.value}>
// //             {formatRemainingTime(remainingTime)}
// //           </div>
// //           <div>
// //             {play ? (
// //               <Icon
// //                 onClick={() => setPlay(false)}
// //                 className={styles.icon}
// //                 icon="ant-design:pause-circle-filled"
// //               />
// //             ) : (
// //               <>
// //                 <Icon
// //                   onClick={() => setPlay(true)}
// //                   className={styles.icon}
// //                   icon="ant-design:play-circle-filled"
// //                 />
// //                 <div onClick={resetTimer}>리셋</div>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </>
// //     );
// //   };
// //   return (
// //     <>
// //       <button
// //         onClick={() => window.open("http://localhost:3000/timer", "_blank")}
// //       >
// //         새로 창 띄워서 사용하기
// //       </button>
// //
// //       <div>
// //         <div className={styles.timer_wrapper}>
// //           <CountdownCircleTimer
// //             key={time}
// //             isPlaying={play}
// //             duration={time}
// //             initialRemainingTime={time}
// //             size="300"
// //             colors={[["#D78681"]]}
// //             onComplete={() => [true, 1000]}
// //           >
// //             {renderTime}
// //           </CountdownCircleTimer>
// //         </div>
// //         <div onClick={clickTimer}>휴식시간끝내기</div>
// //       </div>
// //     </>
// //   );
// // };
// //
// // export default WorkTimer;
//
//
// import "./style/_FocusTimer.module.scss";
// import { useState } from "react";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";
//
// const WorkTimer = () => {
//   //Variables
//   const [timerType, setTimerType] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [sessionTime, setSessionTime] = useState(1500);
//   const [breakTime, setBreakTime] = useState(300);
//   const [restart, setRestart] = useState(0);
//   const renderTime = ({ remainingTime }) => {
//     if (remainingTime === 0) {
//       return <div className="clock">Time's Up!</div>;
//     }
//     const minutes = Math.floor(remainingTime / 60)
//       .toString()
//       .padStart(2, 0);
//     const seconds = (remainingTime % 60).toString().padStart(2, 0);
//
//     return (
//       <div className="clock__wrapper">
//         <span className="clock__title" id="timer-label">
//           {!timerType ? "Session " : "Break "}
//           {isPlaying ? "Running" : "Paused"}
//         </span>
//         <div className="clock__value" id="time-left">
//           {minutes}:{seconds}
//         </div>
//       </div>
//     );
//   };
//
//   const StartStop = () => {
//     if (isPlaying) {
//       return (
//         <span className="btn__icon btn__stop material-icons" id="start_stop">
//           스탑
//         </span>
//       );
//     } else {
//       return (
//         <span className="btn__icon btn__start material-icons" id="start_stop">
//           플레이
//         </span>
//       );
//     }
//   };
//
//   //Functions
//
//   const initiateClock = (e) => {
//     const btn = e.target.className.includes("btn__start");
//     if (btn) {
//       setIsPlaying(true);
//     } else {
//       setIsPlaying(false);
//     }
//   };
//
//   const changeType = (e) => {
//     const btn = e.target;
//     if (btn.className.includes("btn__break")) {
//       setTimerType(true);
//       document
//         .getElementById("btn__session")
//         .classList.remove("btn__type--active");
//       document.body.style.backgroundColor = "#447ca2";
//     } else {
//       setTimerType(false);
//
//       document
//         .getElementById("btn__break")
//         .classList.remove("btn__type--active");
//       document.body.style.backgroundColor = "#d95450";
//     }
//     setIsPlaying(false);
//     setRestart((pre) => pre + 1);
//     btn.classList.add("btn__type--active");
//   };
//
//   const changeTime = (e) => {
//     const btnClass = e.target.className;
//     const btnText = e.target.innerHTML;
//     if (btnClass.includes("btn__sessionlength")) {
//       if (btnText === "+" && sessionTime < 3541) {
//         setSessionTime((pre) => pre + 60);
//       } else if (btnText === "-" && sessionTime > 60) {
//         setSessionTime((pre) => pre - 60);
//       }
//     } else if (btnClass.includes("btn__breaklength")) {
//       if (btnText === "+" && breakTime < 3541) {
//         setBreakTime((pre) => pre + 60);
//       } else if (btnText === "-" && breakTime > 60) {
//         setBreakTime((pre) => pre - 60);
//       }
//     } else {
//       return;
//     }
//   };
//
//   const complete = () => {
//     if (timerType) {
//       document
//         .getElementById("btn__break")
//         .classList.remove("btn__type--active");
//       document
//         .getElementById("btn__session")
//         .classList.add("btn__type--active");
//       document.body.style.backgroundColor = "#447ca2";
//     } else {
//       document
//         .getElementById("btn__session")
//         .classList.remove("btn__type--active");
//       document.getElementById("btn__break").classList.add("btn__type--active");
//       document.body.style.backgroundColor = "#d95450";
//     }
//     setTimerType((pre) => !pre);
//     setRestart((pre) => pre + 1);
//   };
//
//   const reset = () => {
//     setRestart((pre) => pre + 1);
//     setIsPlaying(false);
//   };
//
//   return (
//     <div className="container">
//       <div className="wrapper">
//         <div className="clock">
//           <CountdownCircleTimer
//             key={restart}
//             isPlaying={isPlaying}
//             duration={timerType ? breakTime : sessionTime}
//             colors={["#000000"]}
//             onComplete={() => {
//               complete();
//               return { shouldRepeat: true, delay: 1.5 };
//             }}
//             size={200}
//             strokeWidth={8}
//             trailColor={"#"}
//           >
//             {renderTime}
//           </CountdownCircleTimer>
//         </div>
//         <div className="setup">
//           <div className="setup__type">
//             <button
//               className="btn btn__type btn__session btn__type--active"
//               id="btn__session"
//               onClick={changeType}
//             >
//               Session
//             </button>
//             <button
//               className="btn btn__type btn__break"
//               id="btn__break"
//               onClick={changeType}
//             >
//               Break
//             </button>
//           </div>
//           <div className="setup__length">
//             <p className="length__title" id="session-label">
//               Session Length
//             </p>
//             <div className="length__config length__session">
//               <button
//                 className="btn btn__sessionlength btn__action btn__subtract"
//                 id="break-decrement"
//                 onClick={changeTime}
//               >
//                 -
//               </button>
//               <span className="length__time" id="session-length">
//                 {sessionTime / 60}
//               </span>
//               <button
//                 className="btn btn__sessionlength btn__action btn__add"
//                 id="break-increment"
//                 onClick={changeTime}
//               >
//                 +
//               </button>
//             </div>
//           </div>
//           <div className="setup__length">
//             <p className="length__title" id="break-label">
//               Break Length
//             </p>
//             <div className="length__config length__break">
//               <button
//                 className="btn btn__breaklength btn__action btn__subtract"
//                 id="session-decrement"
//                 onClick={changeTime}
//               >
//                 -
//               </button>
//               <span className="length__time" id="break-length">
//                 {breakTime / 60}
//               </span>
//               <button
//                 className="btn btn__breaklength btn__action btn__add"
//                 id="break-increment"
//                 onClick={changeTime}
//               >
//                 +
//               </button>
//             </div>
//           </div>
//           <div className="control">
//             <button
//               className="btn btn__control btn__startstop"
//               onClick={initiateClock}
//             >
//               <StartStop />
//             </button>
//             <button className="btn btn__control btn__reset" onClick={reset}>
//               <span className="btn__icon material-icons" id="reset">
//                 restart_alt
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default WorkTimer;
