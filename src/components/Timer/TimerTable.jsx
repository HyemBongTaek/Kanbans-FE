import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { getTimer } from "../../redux/Async/timer";

const TimerTable = () => {
  const dispatch = useDispatch();
  const timeList = useSelector((state) => state.timerSlice.timerList);

  useEffect(() => {
    dispatch(
      getTimer({
        page: 1,
      })
    );
  }, [dispatch]);

  useEffect(() => {});
  const chartData = {
    labels: timeList && timeList.map((time) => time.createdAt),
    datasets: [
      {
        label: "study Time",
        data: timeList && timeList.map((el) => el.time / 60 / 60),
        backgroundColor: [
          "#ffbb11",
          // "#C0C0C0",
          // "#50AF95",
          // "#f3ba2f",
          // "#2a71d0",
        ],
      },
    ],
  };
  return (
    <>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "공부시간 체크",
            },
            legend: {
              display: true,
              position: "top",
            },
            maintainAspectRatio: false,
          },
        }}
      />
    </>

    // <div>
    //   <div>테이블</div>
    //   {timeList
    //     ? timeList.map((list) => {
    //         return (
    //           <ul key={list.id}>
    //             <li>{list.createdAt}</li>
    //             <li>{list.time}</li>
    //           </ul>
    //         );
    //       })
    //     : timeList}
    // </div>
  );
};

export default TimerTable;
