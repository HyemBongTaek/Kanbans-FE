import React, { useEffect, useState } from "react";
import EditProfile from "../../components/menu/profile/EditProfile";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserInfo,
  deleteAccount,
  getUserInfo,
} from "../../redux/Async/user";

const Profile = () => {
  // const location = useLocation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userSlice.userInfo);

  const [nickname, setNickname] = useState(userInfo.name);
  const changeNickname = (e) => {
    setNickname(e.target.value);
  };

  const nicknameChange = () => {
    dispatch(
      changeUserInfo({
        type: "nickname",
        nickname: nickname,
      })
    );
  };

  const deleteAccountHandler = () => {
    dispatch(deleteAccount());
  };

  return (
    <div>
      <EditProfile items={userInfo.profileImage} />
      <label>
        <input value={nickname} onChange={changeNickname} />
      </label>
      <button onClick={nicknameChange}>닉네임 변경하기</button>
      <button onClick={deleteAccountHandler}>회원탈퇴하기</button>
    </div>
  );
};

export default Profile;
