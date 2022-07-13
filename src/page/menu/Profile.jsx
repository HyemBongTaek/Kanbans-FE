import React, { useEffect, useState } from "react";
import EditProfileImage from "../../components/Profile/EditProfileImage";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styles from "./_Profile.module.scss";
import { getUserInfo } from "../../redux/Async/user";
import { setOpenLoginReducer } from "../../redux/Slice/commonSlice";
import EditProfile from "../../components/Profile/EditProfile";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const Profile = () => {
  // const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch, getUserInfo]);

  const userInfo = useSelector((state) => state.userSlice.userInfo);

  const { image, name } = useSelector(
    (state) => ({
      image: state.userSlice.userInfo.profileImage,
      name: state.userSlice.userInfo.name,
    }),
    shallowEqual
  );

  console.log("확인", userInfo);

  return (
    <>
      <div className={styles.wrapper}>
        <EditProfileImage image={image} />
        <div className={styles.cancle_button}>
          <Icon className={styles.icon} icon="octicon:x-16" />
        </div>
        <EditProfile name={name} />
      </div>
      <div className={styles.layout} onClick={() => navigate(-1)} />
    </>
  );
};

export default Profile;
