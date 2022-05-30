import { Icon } from "@iconify/react";
import React, { useContext, useRef, useState } from "react";

import Profile from "../../../image/profile.png";
import styles from "../../../style/menu/_KanbanBoard.module.scss";
import { Draggable } from "react-beautiful-dnd";
import store from "../../contextStore";
import KanbanCardDetail from "../../../page/menu/kanban/KanbanCardDetail";
import classNames from "classnames";

const KanbanCard = (props) => {
  console.log("ㄴㅇㅇ남ㄻ언ㅇㅁㄴ", props);
  const { deleteCardHandler } = useContext(store);
  const [openDetail, setOpenDetail] = useState(false);

  const detailModal = () => {
    setOpenDetail(!openDetail);
  };

  const deleteCard = () => {
    deleteCardHandler({
      cardId: props.tasks.id,
      boardId: props.boardId,
    });
  };

  const status = props.tasks.status;

  return (
    <>
      {openDetail && (
        <KanbanCardDetail setOpenDetail={setOpenDetail} items={props.tasks} />
      )}
      {/*<Draggable draggableId={props.tasks.id} index={props.index}>*/}
      {/*  /!*완료(체크표시)가 된 경우에는 흐리게 변경해준다*!/*/}
      {/*  {(provided) => (*/}
      <div
        onClick={detailModal}
        className={props.tasks.check ? styles.kanban_check : styles.kanban_card}
        // {...provided.draggableProps}
        // {...provided.dragHandleProps}
        // ref={provided.innerRef}
      >
        <div
          className={classNames(
            status === "hold" && styles.kanban_hold,
            status === "finish" && styles.kanban_finish,
            status === "progress" && styles.kanban_progress
          )}
        />
        <div className={styles.card_contents}>
          <div className={styles.card_top}>
            <div className={styles.labels}>
              <div className={styles.label}>라벨</div>
              <div className={styles.label}>라벨</div>
              <div className={styles.label}>라벨</div>
            </div>

            <Icon
              icon={
                props.tasks.check
                  ? "akar-icons:check-box-fill"
                  : "akar-icons:check-box"
              }
              color={props.tasks.check ? "#01CD6B" : "#545454"}
              height="30"
            />
            {/* <Icon icon= color="#545454" height="30" /> */}
          </div>
          <div className={styles.card_title}>
            {props.tasks.content}
            <div
              className={
                props.tasks.check ? styles.card_check_mid : styles.card_mid
              }
            >
              <img src={Profile} alt="profile_img" />
              <img src={Profile} alt="profile_img" />
              <img src={Profile} alt="profile_img" />
              <img src={Profile} alt="profile_img" />
            </div>
          </div>

          <div className={styles.card_bottom}>
            <div
              className={props.tasks.check ? styles.date_check : styles.date}
            >
              &nbsp;
              <Icon className={styles.bottom_icon} icon="uit:calender" />
              &nbsp;28 April &nbsp;
            </div>
            <div
              className={props.tasks.check ? styles.date_check : styles.date}
            >
              <Icon className={styles.bottom_icon} icon="bi:clock" />
              &nbsp;D-3&nbsp;
            </div>
            <div className={styles.task}>
              <Icon
                className={styles.bottom_icon}
                icon="fluent:task-list-ltr-20-regular"
              />
              &nbsp;2/4&nbsp;
            </div>
            <div className={styles.task}>
              <Icon className={styles.bottom_icon} icon="ei:comment" />
              &nbsp;2&nbsp;
            </div>
            <div onClick={deleteCard}>삭제</div>
          </div>
        </div>
      </div>

      {/*</Draggable>*/}
    </>
  );
};

export default KanbanCard;
