import React, { useEffect, useState } from "react";
import styles from "./_EditProfile.module.scss";
import { Icon } from "@iconify/react";

import { changeUserInfo } from "../../redux/Async/user";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../menu/utils/LoadingSpinner";

const EditProfileImage = (props) => {
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userImage = props.items;

  const profileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    console.log("확인", profileImage);
  };

  useEffect(() => {
    if (profileImage !== null) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("profileImage", profileImage);
      console.log("프로필", formData);
      dispatch(
        changeUserInfo({
          type: "changeImage",
          formData,
        })
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [profileImage]);

  return (
    <>
      <div className={styles.edit_profile}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <label>
            <img src={userImage} alt="profile_image" />
            <Icon
              className={styles.edit_icon}
              icon="fluent:camera-edit-20-filled"
            />
            <input
              type="file"
              style={{ display: "none" }}
              onChange={profileImageChange}
            />
          </label>
        )}
      </div>
      <div />
    </>
  );
};

export default EditProfileImage;
