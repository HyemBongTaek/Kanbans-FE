import React from "react";
import { useSelector } from "react-redux";

const TimerTable = () => {
  const timeList = useSelector((state) => state.timerSlice.timerList);
  console.log(timeList);
  return (
    <div>
      <div>테이블</div>
      {timeList
        ? timeList.map((list) => {
            return (
              <ul>
                <li>{list.createdAt}</li>
                <li>{list.time}</li>
              </ul>
            );
          })
        : timeList}
    </div>
  );
};

export default TimerTable;
