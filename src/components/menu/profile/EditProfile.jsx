import React, { useEffect, useState } from "react";
import styles from "./_EditProfile.module.scss";
import { changeUserInfo } from "../../../redux/Async/user";
import { useDispatch } from "react-redux";

const EditProfile = (props) => {
  const userImage = props.items;
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(null);

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
    <div>
      <label>
        <img src={userImage} alt="profile_image" />
        <input
          type="file"
          style={{ display: "none" }}
          onChange={profileImageChange}
        />
      </label>
    </div>
  );
};

export default EditProfile;
