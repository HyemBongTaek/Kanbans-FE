import { Icon } from "@iconify/react";
import React, { useCallback, useState } from "react";

import styles from "./style/_KanbanBoard.module.scss";

import { Draggable } from "react-beautiful-dnd";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { checkKanbanCard, deleteKanbanCard } from "../../redux/Async/kanban";
import StatusCheck from "./StatusCheck";
import { useNavigate } from "react-router-dom";
import { format, formatDistanceToNowStrict, parseISO } from "date-fns";

import isAfter from "date-fns/isAfter";
import GetLabels from "../CardDetail/GetLabels";

const KanbanCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isStatus, setIsStatus] = useState(false);
  const cardId = props.cards?.id;
  const status = props.cards?.status;
  const detailModal = () => {
    navigate(`/card/${cardId}`, {
      state: { cardId: cardId, projectId: props.projectId },
    });
  };

  const deleteCard = () => {
    dispatch(
      deleteKanbanCard({
        cardId: cardId,
        boardId: props.boardId,
      })
    );
  };
  const changeTime = useCallback(new Date(props.cards.createdAt.split("Z")[0]));
  const createdDate = useCallback(format(changeTime, "dd MMMM"));

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

  return (
    <>
      {cardId && (
        <Draggable
          draggableId={cardId.toString()}
          index={props.index}
          key={cardId}
        >
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
                  <StatusCheck boardId={props.boardId} cardId={cardId} />
                )}
              </div>
              <div className={styles.card_contents}>
                <div className={props.cards.labels && styles.card_top}>
                  <div className={styles.labels}>
                    {props.cards.labels &&
                      props.cards.labels.map((label) => {
                        return (
                          <GetLabels
                            key={label.id}
                            item={label}
                            type="main_label"
                          />
                        );
                      })}
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
                    <Icon className={styles.bottom_icon} icon="uit:calender" />
                    {createdDate}
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
