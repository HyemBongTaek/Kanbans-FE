import React, { useEffect, useState } from "react";
import styles from "./_EditProfile.module.scss";
import { changeUserInfo, deleteAccount } from "../../redux/Async/user";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { useCookies } from "react-cookie";

const EditProfile = ({ name, introduction }) => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState(name);
  const [introduce, setIntroduce] = useState(introduction);
  const [editable, setEditable] = useState(false);
  const [isActiveNickname, setIsActiveNickname] = useState(false);
  const [isActiveIntroduce, setIsActiveIntroduce] = useState(false);
  const changeNicknameHandler = (e) => {
    setNickname(e.target.value);
    setIsActiveNickname(true);
  };
  const changeIntroduceHandler = (e) => {
    setIntroduce(e.target.value);
    setIsActiveIntroduce(true);
  };

  useEffect(() => {
    setNickname(name);
    setIntroduce(introduction);
  }, [name, introduction]);

  const changeNicknameClick = (e) => {
    e.preventDefault();
    dispatch(
      changeUserInfo({
        type: "nickname",
        nickname: nickname,
      })
    );
    setEditable((pre) => !pre);
    setIsActiveNickname(false);
  };
  const changeIntroduceClick = (e) => {
    e.preventDefault();
    dispatch(
      changeUserInfo({
        type: "introduce",
        introduce: introduce,
      })
    );
    setIsActiveIntroduce(false);
  };
  const [cookies, setCookie, removeCookie] = useCookies(["cocoriLogin"]);
  const deleteAccountHandler = () => {
    dispatch(deleteAccount());
    localStorage.removeItem("token");
    removeCookie("cocoriLogin", { path: "/" });
    window.location.replace("/");
  };

  return (
    <>
      <div>
        <div className={styles.title}>User Setting</div>
        <div>Name</div>
        <div className={styles.nickname}>
          {editable ? (
            <form onSubmit={changeNicknameClick}>
              <input value={nickname || ""} onChange={changeNicknameHandler} />
              {isActiveNickname && (
                <button className={styles.button}>
                  <Icon className={styles.icon} icon="bi:check-lg" />
                </button>
              )}
            </form>
          ) : (
            <form onSubmit={changeNicknameClick}>
              <input
                value={nickname || ""}
                onChange={changeNicknameHandler}
                readOnly={true}
              />
              <Icon
                className={styles.edit_icon}
                icon="akar-icons:pencil"
                onClick={() => setEditable((pre) => !pre)}
              />
            </form>
          )}
        </div>
        <form className={styles.introduce} onSubmit={changeIntroduceClick}>
          <div>introduce</div>

          <textarea onChange={changeIntroduceHandler} value={introduce || ""} />
          {isActiveIntroduce && (
            <button className={styles.button} onClick={changeIntroduceClick}>
              <Icon className={styles.icon} icon="bi:check-lg" />
            </button>
          )}
        </form>

        <button onClick={deleteAccountHandler}>회원탈퇴하기</button>
      </div>
    </>
  );
};

export default EditProfile;
