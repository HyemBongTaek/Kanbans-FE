import React, { useEffect, useState } from "react";
import styles from "./_EditProfile.module.scss";
import { changeUserInfo, deleteAccount } from "../../redux/Async/user";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";

const EditProfile = ({ name }) => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState(name);
  const [editable, setEditable] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const changeNickname = (e) => {
    setNickname(e.target.value);
    setIsActive(true);
  };

  useEffect(() => {
    setNickname(name);
  }, [name]);

  const nicknameChange = (e) => {
    e.preventDefault();
    dispatch(
      changeUserInfo({
        type: "nickname",
        nickname: nickname,
      })
    );
    setEditable((pre) => !pre);
  };

  const deleteAccountHandler = () => {
    dispatch(deleteAccount());
  };

  return (
    <>
      <div>
        <div className={styles.title}>User Setting</div>
        <div>Name</div>
        {editable ? (
          <div className={styles.nickname}>
            <form onSubmit={nicknameChange}>
              <input value={nickname || ""} onChange={changeNickname} />
              {isActive ? <button>닉네임 변경하기</button> : ""}
            </form>
          </div>
        ) : (
          <div className={styles.nickname}>
            <form onSubmit={nicknameChange}>
              <input
                value={nickname || ""}
                onChange={changeNickname}
                readOnly={true}
              />
              <Icon
                icon="akar-icons:pencil"
                color="#8c8c8c"
                height="30"
                onClick={() => setEditable((pre) => !pre)}
              />
            </form>
          </div>
        )}

        <button onClick={deleteAccountHandler}>회원탈퇴하기</button>
      </div>
    </>
  );
};

export default EditProfile;
