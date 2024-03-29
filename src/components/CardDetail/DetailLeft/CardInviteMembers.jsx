import React, { useEffect, useState } from "react";
import styles from "./style/_CardInviteMembers.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  cardInviteMembers,
  cardShowMembers,
} from "../../../redux/Async/KanbanCardDetail";

const CardInviteMembers = ({ cardId, projectId, setIsAddMember }) => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState([]);
  useEffect(() => {
    dispatch(
      cardShowMembers({
        projectId,
        cardId,
      })
    );
  }, [dispatch]);

  const changeHandler = (checked, id) => {
    if (checked) {
      setSelectedUser([...selectedUser, id]);
    } else {
      // 체크 해제
      setSelectedUser(selectedUser.filter((el) => el !== id));
    }
  };

  const showMembers = useSelector(
    (state) => state.cardDetailSlice?.showMembers
  );

  const inviteMembers = (e) => {
    e.preventDefault();
    dispatch(
      cardInviteMembers({
        cardId,
        members: selectedUser,
      })
    );
    setIsAddMember(false);
  };

  return (
    <>
      <div className={styles.label_main}>
        <div className={styles.members}>
          {showMembers && showMembers.length > 0 ? (
            showMembers.map((user) => {
              return (
                <div className={styles.member} key={user.userId}>
                  <img src={user.profileImage} alt={"user_image"} />
                  <label>
                    <input
                      type="checkbox"
                      id={user.id}
                      onChange={(e) => {
                        changeHandler(e.currentTarget.checked, user.userId);
                      }}
                      checked={
                        selectedUser.includes(user.userId) ? true : false
                      }
                    />
                    <span>{user.name}</span>
                  </label>
                </div>
              );
            })
          ) : (
            <div className={styles.no_member}>
              카드에 추가할 맴버가 없습니다
            </div>
          )}
        </div>
        {showMembers && showMembers.length > 0 && (
          <div className={styles.invite_button}>
            <button onClick={inviteMembers}>초대하기</button>
          </div>
        )}
      </div>
      <div
        className={styles.label_overlay}
        onClick={() => setIsAddMember(false)}
      />
    </>
  );
};

export default CardInviteMembers;
