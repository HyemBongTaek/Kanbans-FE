import React, { useCallback, useState } from "react";
import styles from "./style/_KanbanCard.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Apis from "../../redux/apis";
import { deleteKanbanCard } from "../../redux/Async/kanban";
import {
  cardCheckSocket,
  cardDeleteSocket,
} from "../../redux/Slice/socketSlice";
import { cardCheckReducer } from "../../redux/Slice/kanbanSlice";

import classNames from "classnames";
import { Icon } from "@iconify/react";
import { Draggable } from "react-beautiful-dnd";
import { format, formatDistanceToNowStrict, parseISO } from "date-fns";
import isAfter from "date-fns/isAfter";

import StatusCheck from "./StatusCheck";
import GetLabels from "../CardDetail/GetLabels";
import Swal from "sweetalert2";
import { deleteProject, leaveProject } from "../../redux/Async/projects";

const KanbanCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const card = props.cards;
  const projectId = props.projectId;
  const cardId = props.cards?.id;
  const status = props.cards?.status;

  const [isStatus, setIsStatus] = useState(false);

  const detailModal = () => {
    navigate(`/card/${cardId}`, {
      state: { cardId: cardId, projectId: projectId },
    });
  };

  const deleteCard = () => {
    Swal.fire({
      title: `${card.title}를 삭제하시겠습니까?`,
      text: `${card.title}를 삭제하시면 다시 복구할 수 없습니다.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          deleteKanbanCard({
            cardId: cardId,
            boardId: props.boardId,
          })
        );
        dispatch(
          cardDeleteSocket({
            room: projectId,
            boardId: props.boardId,
            cardId,
          })
        );

        Swal.fire(`${card.title}을 삭제하였습니다.`, "", "success");
      }
    });
  };

  const changeTime = useCallback(new Date(props.cards.createdAt.split("Z")[0]));
  const createdDate = useCallback(format(changeTime, "dd MMM"));

  //데이터 받은 값을 소켓에 바로 넘겨주기 위해 분리해서 따로 뺌.
  const completeCheckCard = () => {
    Apis.patch(`/board/${props.boardId}/card/${cardId}/check`).then((res) =>
      dispatch(
        cardCheckReducer({
          status: res.data.status,
          check: res.data.check,
          cardId,
        }),
        dispatch(
          cardCheckSocket({
            room: projectId,
            check: res.data.check,
            cardId,
          })
        )
      )
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

  //카드에 제목이 길경우 저 길이 까지만 자르기
  const title = card.title.trim().substr(0, 15);

  const members = card.users && card.users.slice(0, 5);

  return (
    <>
      {cardId && (
        <Draggable draggableId={cardId} index={props.index} key={cardId}>
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
                  <div className={styles.status}>
                    <StatusCheck
                      boardId={props.boardId}
                      cardId={cardId}
                      projectId={projectId}
                    />
                  </div>
                )}
              </div>
              <div className={styles.card_contents}>
                <div className={props.cards.labels && styles.card_top}>
                  <div className={styles.labels}>
                    {props.cards.labels &&
                      props.cards.labels.map((label) => {
                        return (
                          <GetLabels
                            key={label.labelId}
                            item={label}
                            type="main_label"
                          />
                        );
                      })}
                  </div>
                  <div className={styles.check_icon}>
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
                  </div>
                </div>
                <div
                  className={
                    props.cards.check
                      ? styles.card_title_complete
                      : styles.card_title
                  }
                  onClick={detailModal}
                >
                  {title}
                  <div
                    className={
                      props.cards.check
                        ? styles.card_check_mid
                        : styles.card_mid
                    }
                  >
                    {members &&
                      members.map((user) => {
                        return (
                          <img
                            key={user.id}
                            src={user.profileImage}
                            alt="card member"
                          />
                        );
                      })}
                    {members && card.users.length > 4 && (
                      <Icon
                        icon="ph:dots-three-circle-light"
                        color="#545454"
                        height="20"
                      />
                    )}
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
                  <div
                    className={
                      props.cards.check ? styles.date_check : styles.date
                    }
                  >
                    {props.cards.dDay && (
                      <>
                        <Icon className={styles.bottom_icon} icon="bi:clock" />
                        <span>
                          &nbsp;{dateAfter ? " D+" : "D-"}
                          {dDay}&nbsp;
                        </span>
                      </>
                    )}
                  </div>
                  {card.taskCount !== 0 && (
                    <div className={styles.task}>
                      <>
                        <Icon
                          className={styles.bottom_icon}
                          icon="fluent:task-list-ltr-20-regular"
                        />
                        <span>
                          {card.taskCheckCount}/{card.taskCount}
                        </span>
                      </>
                    </div>
                  )}

                  {card.commentCount !== 0 && (
                    <div className={styles.task}>
                      <Icon className={styles.bottom_icon} icon="ei:comment" />
                      <span> {card.commentCount}</span>
                    </div>
                  )}

                  <div className={styles.delete_card} onClick={deleteCard}>
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

export default React.memo(KanbanCard);
