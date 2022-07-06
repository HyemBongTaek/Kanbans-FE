import React, { useEffect, useRef, useState } from "react";
import SelectedDday from "../utils/SelectedDday";
import styles from "./style/_CardDetailLeft.module.scss";
import AddLabel from "./AddLabel";
import AddingLabel from "./AddingLabel";
import CardInviteMembers from "./CardInviteMembers";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";

const CardDetailLeft = ({ cardId, projectId }) => {
  const [isDay, setIsDay] = useState(false);
  const [isAddLabel, setIsAddLabel] = useState(false);
  const [isAddingLabel, setIsAddingLabel] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);

  const cardMembers = useSelector((state) => state.cardDetailSlice.users);
  console.log("sdfsdfdsd", cardMembers);
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
                  <>
                    <div className={styles.profile} key={user.id}>
                      <div className={styles.user_image}>
                        <img src={user.profileImage} />
                        <Icon
                          className={styles.user_icon}
                          icon="akar-icons:circle-minus"
                        />
                      </div>
                      <div className={styles.name}>{user.name}</div>
                    </div>
                  </>
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
          <a>
            <SelectedDday />
          </a>
        </li>
        {isAddMember && (
          <CardInviteMembers
            cardId={cardId}
            projectId={projectId}
            setIsAddMember={setIsAddMember}
          />
        )}

        <li onClick={() => setIsAddMember(true)}>
          <a>카드에 멤버추가하기</a>
        </li>
        <li>
          <a>라벨</a>
        </li>
      </ul>
    </>
  );
};

export default CardDetailLeft;
