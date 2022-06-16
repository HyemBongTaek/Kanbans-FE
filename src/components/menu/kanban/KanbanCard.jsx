import { Icon } from "@iconify/react";
import React, { useContext, useRef, useState } from "react";

import Profile from "../../../static/image/profile.png";
import styles from "./style/_KanbanBoard.module.scss";

import { Draggable } from "react-beautiful-dnd";
import KanbanCardDetail from "../../../page/menu/kanban/KanbanCardDetail";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { checkKanbanCard, deleteKanbanCard } from "../../../redux/Async/kanban";
import TestCheck from "./testcheck";
import { cardOpenReducer } from "../../../redux/Slice/kanbanSlice";
import { useNavigate } from "react-router-dom";
import {
  format,
  formatDistance,
  formatRelative,
  subDays,
  differenceInDays,
  formatDistanceToNowStrict,
  parseISO,
} from "date-fns";
import isAfter from "date-fns/isAfter";

const KanbanCard = (props) => {
  console.log("헹구", props);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isStatus, setIsStatus] = useState(false);
  const cardId = props.cards?.id;
  const status = props.cards?.status;
  const detailModal = () => {
    navigate(`/card/${cardId}`, { state: cardId });
  };

  const deleteCard = () => {
    dispatch(
      deleteKanbanCard({
        cardId: cardId,
        boardId: props.boardId,
      })
    );
  };

  const completeCheckCard = () => {
    dispatch(
      checkKanbanCard({
        cardId: cardId,
        boardId: props.boardId,
      })
    );
  };

  const dDay =
    props.cards?.dDay &&
    (formatDistanceToNowStrict(new Date(parseISO(props.cards.dDay))).includes(
      "day" || "days"
    )
      ? formatDistanceToNowStrict(new Date(parseISO(props.cards.dDay)))
          .split("ays")
          .join(" ")
          .split("days")
      : formatDistanceToNowStrict(new Date(parseISO(props.cards.dDay)))
          .split("days")
          .join(" ")
          .split("ours"));

  const dateAfter =
    props.cards?.dDay && isAfter(new Date(), parseISO(props.cards.dDay));
  console.log(dateAfter);
  return (
    <>
      {cardId && (
        <Draggable draggableId={cardId.toString()} index={props.index}>
          {/*완료(체크표시)가 된 경우에는 흐리게 변경해준다*/}
          {(provided) => (
            <div
              className={
                props.cards.check ? styles.kanban_check : styles.kanban_card
              }
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <div
                onClick={() => setIsStatus(!isStatus)}
                className={classNames(
                  status === "hold" && styles.kanban_hold,
                  status === "finish" && styles.kanban_finish,
                  status === "progress" && styles.kanban_progress
                )}
              >
                {isStatus && (
                  <TestCheck boardId={props.boardId} cardId={cardId} />
                )}
              </div>
              <div className={styles.card_contents}>
                <div className={styles.card_top}>
                  <div className={styles.labels}>
                    <div className={styles.label}>공부하기</div>
                    <div className={styles.label}>sometimes</div>
                    <div className={styles.label}>라벨</div>
                  </div>

                  <Icon
                    onClick={completeCheckCard}
                    icon={
                      props.cards.check
                        ? "akar-icons:check-box-fill"
                        : "akar-icons:check-box"
                    }
                    color={props.cards.check ? "#01CD6B" : "#545454"}
                    height="30"
                  />
                  {/* <Icon icon= color="#545454" height="30" /> */}
                </div>
                <div
                  className={
                    props.cards.check
                      ? styles.card_title_complete
                      : styles.card_title
                  }
                  onClick={detailModal}
                >
                  {props.cards.title}
                  <div
                    className={
                      props.cards.check
                        ? styles.card_check_mid
                        : styles.card_mid
                    }
                  >
                    {/*<img src={Profile} alt="profile_img" />*/}
                    {/*<img src={Profile} alt="profile_img" />*/}
                    {/*<img src={Profile} alt="profile_img" />*/}
                  </div>
                </div>

                <div className={styles.card_bottom}>
                  <div
                    className={
                      props.cards.check ? styles.date_check : styles.date
                    }
                  >
                    &nbsp;
                    <Icon className={styles.bottom_icon} icon="uit:calender" />
                    &nbsp;28 April &nbsp;
                  </div>
                  {props.cards.dDay && (
                    <div
                      className={
                        props.cards.check ? styles.date_check : styles.date
                      }
                    >
                      <Icon className={styles.bottom_icon} icon="bi:clock" />
                      &nbsp;{dateAfter ? " D+" : "D-"}
                      {dDay}&nbsp;
                    </div>
                  )}

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
                  <div onClick={deleteCard}>
                    <Icon
                      className={styles.delete_icon}
                      icon="ant-design:delete-outlined"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};

export default KanbanCard;
