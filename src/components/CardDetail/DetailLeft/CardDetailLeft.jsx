import React, { useEffect, useRef, useState } from "react";
import SelectedDday from "../../menu/utils/SelectedDday";
import styles from "./style/_CardDetailLeft.module.scss";
import AddLabel from "./AddLabel";
import AddingLabel from "./AddingLabel";
import CardInviteMembers from "./CardInviteMembers";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { exitCardMember } from "../../../redux/Async/KanbanCardDetail";
import { Tooltip } from "../../Tooltip";

const CardDetailLeft = ({ cardId, projectId }) => {
  const dispatch = useDispatch();
  const [isAddLabel, setIsAddLabel] = useState(false);
  const [isAddingLabel, setIsAddingLabel] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);

  const cardMembers = useSelector((state) => state.cardDetailSlice.users);
  const myInfo = useSelector((state) => state.userSlice.userInfo);
  console.log(myInfo);

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
      <ul className={styles.detail_left}>
        <li className={styles.member}>
          <a>Members</a>
        </li>
        <div className={styles.user}>
          {cardMembers
            ? cardMembers.map((user) => {
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
              })
            : cardMembers}
        </div>

        {isAddLabel && (
          <AddLabel
            setIsOpen={setIsAddLabel}
            cardId={cardId}
            projectId={projectId}
          />
        )}

        <li onClick={() => setIsAddMember(true)}>
          <a>카드에 멤버추가하기</a>
        </li>
        <li onClick={() => setIsAddLabel(true)}>
          <a>새로운 라벨 추가하기</a>
        </li>
        {isAddingLabel && (
          <AddingLabel
            setIsAddingLabel={setIsAddingLabel}
            cardId={cardId}
            projectId={projectId}
          />
        )}
        <li onClick={() => setIsAddingLabel(true)}>
          <a>라벨 추가하기</a>
        </li>
        <li>
          <SelectedDday />
        </li>
        {isAddMember && (
          <CardInviteMembers
            cardId={cardId}
            projectId={projectId}
            setIsAddMember={setIsAddMember}
          />
        )}
      </ul>
    </>
  );
};

export default CardDetailLeft;
