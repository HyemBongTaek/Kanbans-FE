// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import styled from 'styled-components';
// import axios from 'axios';
// import jwtDecode from 'jwt-decode';
//
// // const socket = io('http://localhost:4000');
//
// let socket;
// // const token =
// //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IuyEoO2DnTEyIiwiaWF0IjoxNjU2NzY4OTcyLCJleHAiOjE2NTY3NzYxNzJ9.ypF5eYAuqx8DEIChHZvdd8becSbB-XxNw9tQNXU-k8w';
//
// const SocketTest2 = (props) => {
//   const { room } = props.match.params;
//   console.log('방', room);
//
//   const [selectElement, setSelectElement] = useState('');
//   const [draggable, setDraggable] = useState(true);
//
//   useEffect(() => {
//     socket = io.connect('http://localhost:4000', {
//       extraHeaders: {
//         authorization: `Bearer ${localStorage.getItem('access_token')}`,
//       },
//     });
//     console.log(socket);
//
//     socket.emit('join', room);
//   }, []);
//
//   useEffect(() => {
//     socket?.on('connect', () => {
//       console.log('Socket connect!');
//     });
//
//     socket?.on('connect_error', (err) => {
//       console.log('Socket error!');
//       console.log(err);
//       console.log(err.message);
//     });
//
//     socket?.on('draggable', (payload) => {
//       setDraggable(payload);
//     });
//
//     socket?.on('duplicatedDrag', ({ message }) => {
//       console.log('드래그 중복');
//       console.log(message);
//     });
//
//     socket?.on('test', (payload) => {
//       console.log(payload);
//     });
//   }, [socket]);
//
//   const leaveRoomHandler = () => {
//     props.history.replace('/');
//     socket.emit('leave', room);
//     socket.disconnect();
//   };
//
//   const onDragStartEvent = (e) => {
//     console.log('DRAG START');
//
//     const { textContent } = e.target;
//     setSelectElement(textContent);
//
//     if (textContent === '보드') {
//       socket.emit('dragStart', { type: 'board', id: 1, room: 1 });
//     } else if (textContent === '카드') {
//       socket.emit('dragStart', { type: 'card', id: 1, room: 1 });
//     }
//   };
//
//   const onDragEndEvent = (e) => {
//     console.log('DRAG END');
//     console.log(selectElement);
//
//     if (draggable && selectElement === '보드') {
//       socket.emit('dragEnd', { type: 'board', id: 1 });
//     } else if (draggable && selectElement === '카드') {
//       socket.emit('dragEnd', { type: 'card', id: 1 });
//     }
//
//     setDraggable(true);
//     setSelectElement('');
//   };
//
//   return (
//     <>
//       <button onClick={leaveRoomHandler}>방 나가기</button>
//
//       <div>
//         <BoardBox
//           draggable
//           onDragStart={onDragStartEvent}
//           onDragEnd={onDragEndEvent}
//         >
//           보드
//         </BoardBox>
//         <CardBod
//           draggable
//           onDragStart={onDragStartEvent}
//           onDragEnd={onDragEndEvent}
//         >
//           카드
//         </CardBod>
//       </div>
//     </>
//   );
// };
//
// const BoardBox = styled.div`
//   width: 100px;
//   height: 100px;
//   background-color: black;
//   color: white;
// `;
//
// const CardBod = styled.div`
//   width: 100px;
//   height: 100px;
//   background-color: wheat;
// `;
//
// export default SocketTest2;
