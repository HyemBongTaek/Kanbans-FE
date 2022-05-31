// import React from "react";
// import Swal from "sweetalert2";
// import { deleteProject } from "../redux/Async/projects";
// import { useDispatch } from "react-redux";
//
// export const useNotification = (props) => {
//   const dispatch = useDispatch();
//   const { items } = props;
//
//   Swal.fire({
//     title: "정말로 삭제하시겠습니까?",
//     // text: "다시는 되돌릴 수 없습니다!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       dispatch(
//         deleteProject({
//           projectId: items.projectId,
//         })
//       );
//       Swal.fire("프로젝트가 삭제되었습니다!", "", "success");
//     }
//   });
// };
