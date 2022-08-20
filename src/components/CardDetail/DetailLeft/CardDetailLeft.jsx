import React, { useEffect, useRef, useState } from "react";
import SelectedDday from "../../utils/SelectedDday";
import styles from "./style/_CardDetailLeft.module.scss";
import AddLabel from "./AddLabel";
import AddingLabel from "./AddingLabel";
import CardInviteMembers from "./CardInviteMembers";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { exitCardMember } from "../../../redux/Async/KanbanCardDetail";

import CardMembers from "./CardMembers";

const CardDetailLeft = ({ cardId, projectId }) => {
  const dispatch = useDispatch();
  const [isAddLabel, setIsAddLabel] = useState(false);
  const [isAddingLabel, setIsAddingLabel] = useState(false);
  const [isMembers, setIsMembers] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);

  const cardMembers = useSelector((state) => state.cardDetailSlice.users);

  const memberList =
    cardMembers.length > 3 ? cardMembers.slice(0, 3) : cardMembers;

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
          {memberList
            ? memberList.map((user) => {
                return (
                  <div className={styles.profile} key={user.id}>
                    <div className={styles.user_image}>
                      <img src={user.profileImage} />

                      <Icon
                        onClick={() =>
                          exitCardMembersHandler({
                            userId: user.id,
                          })
                        }
                        className={styles.user_icon}
                        icon="akar-icons:circle-minus"
                      />
                    </div>
                    <div className={styles.name}>{user.name}</div>
                  </div>
                );
              })
            : cardMembers}
          {isMembers && (
            <CardMembers
              setIsMembers={setIsMembers}
              memberList={cardMembers}
              cardId={cardId}
              projectId={projectId}
            />
          )}
          {cardMembers.length > 3 && (
            <Icon
              className={styles.icon}
              onClick={() => setIsMembers(true)}
              icon="bx:dots-horizontal-rounded"
            />
          )}
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
          <a>프로젝트 라벨 추가/삭제하기</a>
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
