import React, { useEffect, useRef, useState } from "react";
import ProgressCard from "./ProgressCard";
import ProgressData from "./ProgressData";
import DetailInput from "./DetailInput";
import styles from "./_DetailInput.module.scss";
import store from "../../../contextStore";

const CardProgressBar = () => {
  const detailInputRef = useRef();
  //데이터 불러오기
  const [progress, setProgress] = useState(ProgressData);

  console.log(progress, "프로그래스 데이터");

  //진행바 진행율 구하기.
  function findCheck(el) {
    if (el.checked === true) {
      return true;
    }
  }
  const dataCount = progress.progress.filter(findCheck);
  const [checkCount, setCheckCount] = useState(dataCount.length);
  let checkedCountTotal = progress.progress.length;

  const progressRate = Math.ceil((checkCount / checkedCountTotal) * 100);

  const addTaskHandler = ({ id, content }) => {
    console.log("이거임", id, content);
    const newTask = {
      id,
      content,
      checked: false,
    };
    const newState = [...progress.progress];
    newState.push(newTask);
    console.log("fsd", progress.progress);
    console.log("프로그래스", newState);
    setProgress({ progress: newState });
  };

  return (
    <store.Provider
      value={{
        addTaskHandler,
      }}
    >
      <div>
        <div style={{ width: "520px", background: "#C4C4C4", height: "25px" }}>
          <div
            style={{
              width: `${progressRate}%`,
              background: "#01CD6B",
              height: "25px",
            }}
          />
        </div>
        <div className={styles.progress_area}>
          {progress.progress.map((task) => {
            return (
              <ProgressCard
                key={task.id}
                items={task}
                checkCount={checkCount}
                setCheckCount={setCheckCount}
              />
            );
          })}
        </div>
        <DetailInput type="progress" />
      </div>
    </store.Provider>
  );
};

export default CardProgressBar;
