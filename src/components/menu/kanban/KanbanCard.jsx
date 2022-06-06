import { Icon } from "@iconify/react";
import React, { useContext, useRef, useState } from "react";

import Profile from "../../../static/image/profile.png";
import styles from "../../../style/menu/_KanbanBoard.module.scss";
import { Draggable } from "react-beautiful-dnd";
import store from "../../contextStore";
import KanbanCardDetail from "../../../page/menu/kanban/KanbanCardDetail";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { checkKanbanCard } from "../../../redux/Async/kanban";

const KanbanCard = (props) => {
  console.log("카드", props);
  const dispatch = useDispatch();
  const { deleteCardHandler } = useContext(store);
  const [openDetail, setOpenDetail] = useState(false);
  const [complete, setComplete] = useState(props.cards.check);
  const cardId = props.cards.id;
  const status = props.cards.status;

  const detailModal = () => {
    setOpenDetail(!openDetail);
  };

  const deleteCard = () => {
    deleteCardHandler({
      cardId: cardId,
      boardId: props.boardId,
    });
  };

  const completeCheckCard = () => {
    setComplete(!complete);
    dispatch(
      checkKanbanCard({
        cardId: cardId,
        boardId: props.boardId,
      })
    );
  };

  return (
    <>
      {openDetail && (
        <KanbanCardDetail setOpenDetail={setOpenDetail} items={props.cards} />
      )}
      {cardId && (
        <Draggable draggableId={cardId.toString()} index={props.index}>
          {/*완료(체크표시)가 된 경우에는 흐리게 변경해준다*/}
          {(provided) => (
            <div
              className={complete ? styles.kanban_check : styles.kanban_card}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
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
                    onClick={completeCheckCard}
                    icon={
                      complete
                        ? "akar-icons:check-box-fill"
                        : "akar-icons:check-box"
                    }
                    color={complete ? "#01CD6B" : "#545454"}
                    height="30"
                  />
                  {/* <Icon icon= color="#545454" height="30" /> */}
                </div>
                <div
                  className={
                    complete ? styles.card_title_complete : styles.card_title
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
                  <div
                    className={
                      props.cards.check ? styles.date_check : styles.date
                    }
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
