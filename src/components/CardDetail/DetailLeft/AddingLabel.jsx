import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCardLabels,
  searchLabel,
} from "../../../redux/Async/KanbanCardDetail";
import styles from "./style/_AddingLabel.module.scss";
import LabelColors from "../../menu/utils/LabelColors";

//프로젝트에 등록되어 있는 라벨을 선택해서 카드에 등록하기
const AddingLabel = ({ setIsAddingLabel, cardId, projectId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      searchLabel({
        projectId,
      })
    );
  }, [dispatch]);

  const [selectedLabel, setSelectedLabel] = useState([]);

  const label_list = useSelector((state) => state.cardDetailSlice.label);

  const addCardLabel = () => {
    dispatch(
      addCardLabels({
        labelId: selectedLabel,
        cardId,
      })
    );
  };
  return (
    <>
      <div className={styles.label_main}>
        {label_list &&
          label_list.map((item) => {
            return (
              <LabelColors
                item={item}
                projectId={projectId}
                setSelectedLabel={setSelectedLabel}
                seletedLabel={selectedLabel}
              />
            );
          })}
        <button onClick={addCardLabel}>등록하기</button>
      </div>
      <div
        className={styles.label_overlay}
        onClick={() => setIsAddingLabel(false)}
      />
    </>
  );
};

export default AddingLabel;
