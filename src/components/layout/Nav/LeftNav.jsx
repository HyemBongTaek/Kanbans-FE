// import { Icon } from "@iconify/react";
// import React from "react";
// import { useNavigate } from "react-router-dom";
//
// import LogoImage from "../../../image/cocoli_white.png";
// import { setOpenNavReducer } from "../../../redux/Slice/commonSlice";
//
// import styles from "../styles/_LeftNav.module.scss";
// import { useDispatch } from "react-redux";
//
// const LeftNav = (props) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { items } = props;
//
//   const navHandler = () => {
//     dispatch(setOpenNavReducer());
//   };
//
//   return (
//     <div>
//       <div className={styles.left_nav_big}>
//         <div className={styles.layout} />
//         <div className={styles.big_logo}>
//           <img
//             src={LogoImage}
//             alt="logo_image"
//             onClick={() => {
//               navigate(`/`, { replace: true });
//             }}
//           />
//         </div>
//         <div>
//           <div className={styles.user}>
//             <div
//               className={styles.user_image}
//               onClick={() => {
//                 navigate(`/Profile`, { replace: true });
//               }}
//             >
//               <img src={items.profileImage} alt="profile_image" />
//             </div>
//             <div className={styles.user_name}>{items.name}님 어서오세요</div>
//           </div>
//           <div>
//             <Icon
//               className={styles.nav_icon}
//               icon="fa:home"
//               onClick={() => {
//                 navigate(`/project`, { replace: true });
//               }}
//             />
//           </div>
//           <div>
//             <Icon className={styles.nav_icon} icon="bi:kanban" />
//           </div>
//           <div>
//             <Icon className={styles.nav_icon} icon="ant-design:heart-filled" />
//           </div>
//           <div>
//             <Icon
//               className={styles.nav_icon}
//               icon="bi:calendar-check"
//               onClick={() => {
//                 navigate(`/timer`, { replace: true });
//               }}
//             />
//           </div>
//           <div>
//             <Icon className={styles.nav_icon} icon="bi:chat-text" />
//           </div>
//           <div>
//             <Icon
//               className={styles.nav_icon}
//               icon="ph:users"
//               onClick={() => {
//                 navigate(`/login`, { replace: true });
//               }}
//             />
//           </div>
//
//           <div>
//             <Icon
//               onClick={navHandler}
//               className={styles.nav_icon}
//               icon="bi:arrow-left-circle"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default LeftNav;
