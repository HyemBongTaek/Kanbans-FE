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
  const [nameEditable, setNameEditable] = useState(false);
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
    setNameEditable((pre) => !pre);
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
    setTimeout(() => {
      localStorage.removeItem("token");
      removeCookie("cocoriLogin", { path: "/" });
      window.location.replace("/");
    }, 1000);
  };

  return (
    <>
      <div className={styles.profile}>
        <div className={styles.title}>프로필</div>
        <div className={styles.name}>이름</div>
        <div className={styles.nickname}>
          {nameEditable ? (
            <form onSubmit={changeNicknameClick}>
              <label>
                <input
                  value={nickname || ""}
                  onChange={changeNicknameHandler}
                />
                {isActiveNickname && (
                  <Icon
                    onClick={changeNicknameClick}
                    className={styles.check_icon}
                    icon="bi:check-lg"
                  />
                )}
              </label>
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
                onClick={() => setNameEditable((pre) => !pre)}
              />
            </form>
          )}
        </div>
        <form className={styles.introduce} onSubmit={changeIntroduceClick}>
          <div>자기소개</div>

          <textarea onChange={changeIntroduceHandler} value={introduce || ""} />
          {isActiveIntroduce && (
            <Icon
              onClick={changeIntroduceClick}
              className={styles.intro_check_icon}
              icon="bi:check-lg"
            />
          )}
        </form>
        <button className={styles.delete_button} onClick={deleteAccountHandler}>
          회원탈퇴
        </button>
      </div>
    </>
  );
};

export default EditProfile;
