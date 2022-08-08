import React from "react";
import styles from "./style/_CardMembers.module.scss";
import Tooltip from "../../Tooltip";
import { Icon } from "@iconify/react";
import { exitCardMember } from "../../../redux/Async/KanbanCardDetail";
import { useDispatch } from "react-redux";

const CardMembers = ({ setIsMembers, memberList, cardId, userId }) => {
  const dispatch = useDispatch();
  const exitCardMembersHandler = ({ userId }) => {
    dispatch(
      exitCardMember({
        cardId,
        userId,
      })
    );
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Members</div>
        <div className={styles.members}>
          {memberList &&
            memberList.map((user) => {
              return (
                <div className={styles.profile} key={user.id}>
                  <div className={styles.user_image}>
                    <img src={user.profileImage} />
                    <Tooltip content="맴버 카드에서 제외하기">
                      <Icon
                        onClick={() =>
                          exitCardMembersHandler({
                            userId: user.id,
                          })
                        }
                        className={styles.user_icon}
                        icon="akar-icons:circle-minus"
                      />
                    </Tooltip>
                  </div>
                  <div className={styles.name}>{user.name}</div>
                </div>
              );
            })}
        </div>
      </div>
      <div className={styles.overlay} onClick={() => setIsMembers(false)} />
    </>
  );
};

export default CardMembers;
