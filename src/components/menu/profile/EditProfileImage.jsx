import React, { useEffect, useState } from "react";
import styles from "./_EditProfile.module.scss";
import { Icon } from "@iconify/react";

import { changeUserInfo } from "../../../redux/Async/user";
import { useDispatch, useSelector } from "react-redux";

const EditProfileImage = (props) => {
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(null);
  const userImage = props.items;

  const profileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  useEffect(() => {
    if (profileImage !== null) {
      const formData = new FormData();
      formData.append("profileImage", profileImage);
      dispatch(
        changeUserInfo({
          type: "changeImage",
          formData,
        })
      );
    }
  }, [profileImage]);

  return (
    <div className={styles.edit_profile}>
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
    </div>
  );
};

export default EditProfileImage;
