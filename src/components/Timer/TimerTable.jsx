import React, { useEffect, useState } from "react";
import styles from "./style/_TimerTable.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { getTimer } from "../../redux/Async/timer";
import { Icon } from "@iconify/react";
import classNames from "classnames";

const TimerTable = ({ setIsTable }) => {
  const dispatch = useDispatch();
  const timeList = useSelector((state) => state.timerSlice.timerList);
  const timeLength = useSelector((state) => state.timerSlice.timerTotal);

  console.log(timeLength);
  const [page, setPage] = useState(1);
  const [isLength, setIsLength] = useState(0);

  useEffect(() => {
    setIsLength(timeLength / page);
    dispatch(
      getTimer({
        page: page,
      })
    );
  }, [dispatch, page]);

  console.log(isLength > 7);

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
      <div className={styles.chart_button}>
        <Icon
          className={classNames(
            styles.icon,
            styles.left_icon,
            page !== 1 && styles.active
          )}
          icon="bi:arrow-left-circle-fill"
          onClick={() => setPage((pre) => pre - 1)}
        />

        <button onClick={() => setIsTable((pre) => !pre)}>차트 접어두기</button>
        <Icon
          className={classNames(
            styles.icon,
            styles.right_icon,
            isLength < 7 && styles.un_visibility
          )}
          icon="bi:arrow-right-circle-fill"
          onClick={() => setPage((pre) => pre + 1)}
        />
      </div>
    </>
  );
};

export default TimerTable;
