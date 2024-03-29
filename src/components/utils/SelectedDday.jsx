import React, { forwardRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { format, parseISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./style/_SelectedDday.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addDaySelected } from "../../redux/Async/KanbanCardDetail";
import { useParams } from "react-router-dom";

const SelectedDday = () => {
  const dispatch = useDispatch();
  const { cardId } = useParams();

  const dDaySetting = useSelector((state) => state.cardDetailSlice.card.dDay);

  const [selectedDay, setSelectedDay] = useState(
    dDaySetting && parseISO(dDaySetting)
  );

  useEffect(() => {
    if (selectedDay !== null) {
      dispatch(
        addDaySelected({
          cardId,
          dDay: selectedDay,
        })
      );
    }
  }, [selectedDay, dispatch]);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => {
    return (
      <>
        <div className={styles.date_input} onClick={onClick} ref={ref}>
          {value ? <span>{value}</span> : <span>D-day 설정하기</span>}
        </div>
        {/*<div onClick={savedDay}>d-day저장</div>*/}
      </>
    );
  });

  const savedDay = () => {
    dispatch(
      addDaySelected({
        cardId,
        dDay: selectedDay,
      })
    );
  };

  return (
    <>
      <DatePicker
        selected={selectedDay}
        onChange={(date) => setSelectedDay(date)}
        customInput={<ExampleCustomInput />}
      />
    </>
  );
};

export default SelectedDday;
