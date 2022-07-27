import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { getTimer } from "../../redux/Async/timer";

const TimerTable = ({ setIsTable }) => {
  const dispatch = useDispatch();
  const timeList = useSelector((state) => state.timerSlice.timerList);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      getTimer({
        page: page,
      })
    );
  }, [dispatch]);

  useEffect(() => {});
  const chartData = {
    labels: timeList && timeList.map((time) => time.createdAt),
    datasets: [
      {
        label: "study Time (시간)",
        data: timeList && timeList.map((el) => (el.time / 60 / 60).toFixed(2)),
        backgroundColor: ["#ffbb11"],
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
      <button onClick={() => setIsTable((pre) => !pre)}>차트 접어두기</button>
    </>
  );
};

export default TimerTable;
