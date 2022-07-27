import { createAsyncThunk } from "@reduxjs/toolkit";
import Apis from "../apis";
import {
  cardAllDeleteReducer,
  cardCheckReducer,
  cardStatusChangeReducer,
  changeBoardTitleReducer,
  changeOwnerReducer,
  createBoardReducer,
  deleteBoardReducer,
  deleteCardReducer,
  deleteProjectUserReducer,
  moveKanbanBoardReducer,
  sortKanbanCardMoveReducer,
  sortKanbanCardReducer,
} from "../Slice/kanbanSlice";

//칸반보드 불러오기
export const getKanbanBoard = createAsyncThunk(
  "kanban/getKanbanBoard",
  async ({ projectId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/board/${projectId}`,
        method: "GET",
      });
      if (res.data.ok) {
        console.log(res.data);
        return res.data;
      }
    } catch (err) {
      if (err.response.status === 400) {
        return thunkAPI.rejectWithValue(err.response);
      }
      return console.log(err.response.data.message);
    }
  }
);

// // 보드 추가하기
// export const addKanbanBoard = createAsyncThunk(
//   "kanban/addKanbanBoard",
//   async ({ projectId, title }, thunkAPI) => {
//     console.log("작성", projectId, title);
//     try {
//       const res = await Apis({
//         url: `/board`,
//         method: "POST",
//         data: {
//           title,
//           projectId: projectId,
//         },
//       });
//       if (res.data.ok) {
//         console.log("보드만들기", res.data);
//         return thunkAPI.dispatch(createBoardReducer(res.data.newBoard));
//       }
//     } catch (err) {
//       console.log("작성에러", err.response);
//       return thunkAPI.rejectWithValue(err.response);
//     }
//   }
// );
// 보드 삭제하기
export const deleteBoard = createAsyncThunk(
  "kanban/deleteBoard",
  async ({ boardId, boards }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/board/${boardId}`,
        method: "DELETE",
      });
      if (res.data.ok) {
        return thunkAPI.dispatch(deleteBoardReducer({ boardId }));
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

//보드 타이틀 변경
export const changeBoardTitle = createAsyncThunk(
  "kanban/changeBoardTitle",
  async ({ boardId, title }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/board/${boardId}`,
        method: "PATCH",
        data: {
          title,
        },
      });
      if (res.data.ok) {
        console.log("데이터확인", res.data);
        thunkAPI.dispatch(
          changeBoardTitleReducer({
            boardId: res.data.updateBoards.id,
            title: res.data.updateBoards.title,
          })
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

//카드 등록
export const addKanbanCard = createAsyncThunk(
  "kanban/addKanbanCard",
  async ({ boardId, title }) => {
    try {
      const res = await Apis({
        url: `board/${boardId}/card`,
        method: "POST",
        data: {
          title,
        },
      });
      if (res.data.ok) {
        return { data: res.data.newCard };
      }
    } catch (err) {
      console.log("에러", err);
    }
  }
);

//카드 전체 삭제
export const cardAllDelete = createAsyncThunk(
  "kanban/cardAllDelete",
  async ({ boardId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/board/${boardId}/cards`,
        method: "DELETE",
      });
      if (res.data.ok) {
        console.log(res.data);
        return thunkAPI.dispatch(cardAllDeleteReducer({ boardId }));
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//카드 체크박스 변경
export const checkKanbanCard = createAsyncThunk(
  "kanban/checkKanbanCard",
  async ({ boardId, cardId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/board/${boardId}/card/${cardId}/check`,
        method: "PATCH",
      });
      if (res.data.ok) {
        return thunkAPI.dispatch(
          cardCheckReducer({
            res: res.data,
            cardId,
          })
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//카드 삭제
export const deleteKanbanCard = createAsyncThunk(
  "kanban/deleteKanbanCard",
  async ({ boardId, cardId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/board/${boardId}/card/${cardId}`,
        method: "DELETE",
      });
      if (res.data.ok) {
        return thunkAPI.dispatch(
          deleteCardReducer({
            boardId,
            cardId: res.data.cardId,
          })
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//카드 status 변경
export const statusChangeKanbanCard = createAsyncThunk(
  "kanban/statusChangeKanbanCard",
  async ({ boardId, cardId, status }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/board/${boardId}/card/${cardId}/status`,
        method: "PATCH",
        data: {
          status,
        },
      });
      if (res.data.ok) {
        console.log("카드상태변경", res.data);
        return thunkAPI.dispatch(
          cardStatusChangeReducer({
            check: res.data.check,
            status: res.data.changedStatus,
            cardId,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
);

//칸반보드 이동
export const sortKanbanBoard = createAsyncThunk(
  "kanban/sortKanban",
  async ({ newBoardOrder, projectId }, thunkAPI) => {
    try {
      thunkAPI.dispatch(
        moveKanbanBoardReducer({
          order: newBoardOrder,
        })
      );
      await Apis({
        url: `/project/${projectId}/board-location`,
        method: "PATCH",
        data: {
          boardOrder: newBoardOrder,
        },
      });
    } catch (err) {
      thunkAPI.rejectWithValue();
    }
  }
);

//같은 보드에서 카드끼리 이동
export const sortKanbanCard = createAsyncThunk(
  "kanban/sortKanbanCard",
  async ({ boardId, newBoard, startPoint }, thunkAPI) => {
    console.log("리덕스", boardId, newBoard, startPoint);
    try {
      thunkAPI.dispatch(
        sortKanbanCardReducer({
          endPoint: boardId,
          endOrder: newBoard.cardId,
        })
      );
      await Apis({
        url: `/board/card/location`,
        method: "PATCH",
        data: {
          start: {
            boardId,
            cards: startPoint,
          },
          end: {
            boardId,
            cards: newBoard.cardId,
          },
        },
      });
    } catch (err) {
      thunkAPI.rejectWithValue();
    }
  }
);

//카드가 다른 보드로 이동할 경우
export const moveSortKanbanCard = createAsyncThunk(
  "kanban/moveSortKanbanCard",
  async ({ startPoint, endPoint, endOrder, startOrder }, thunkAPI) => {
    console.log("startBoardId", startPoint);
    console.log("finishBoardId", endOrder);
    console.log("카드가 보드를 이동할 경우 리덕스");
    //
    try {
      thunkAPI.dispatch(
        sortKanbanCardMoveReducer({
          startPoint,
          endPoint,
          startOrder,
          endOrder,
        })
      );
      const res = await Apis({
        url: `/board/card/location`,
        method: "PATCH",
        data: {
          start: {
            boardId: startPoint,
            cards: startOrder,
          },
          end: {
            boardId: endPoint,
            cards: endOrder,
          },
        },
      });
      if (res.data.ok) {
        console.log("아니왜?", res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
);

//칸반 초대코드 확인하기
export const getKanbanInviteCode = createAsyncThunk(
  "kanban/getKanbanInviteCode",
  async ({ projectId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/project/${projectId}/invite-code`,
        method: "GET",
      });
      if (res.data.ok) {
        return res.data.inviteCode;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

//프로젝트 참가자 조회
export const getProjectUserList = createAsyncThunk(
  "kanban/getProjectUserList",
  async ({ projectId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/project/${projectId}/members`,
        method: "GET",
      });
      if (res.data.ok) {
        console.log("redux확인", res.data);
        return res.data.members;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

//프로젝트에서 참가자 제외하기
export const deleteProjectUser = createAsyncThunk(
  "kanban/deleteProjectUser",
  async ({ projectId, userId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/project/${projectId}/kick-out/${userId}`,
        method: "DELETE",
      });
      if (res.data.ok) {
        thunkAPI.dispatch(
          deleteProjectUserReducer({
            userId,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
);

//프로젝트 owner변경하기
export const changeOwnerDB = createAsyncThunk(
  "kanban/changeOwner",
  async ({ projectId, sender, receiver }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/project/${projectId}/change-owner`,
        method: "PATCH",
        data: {
          sender,
          receiver,
        },
      });
      if (res.data.ok) {
        thunkAPI.dispatch(changeOwnerReducer({ sender, receiver }));
      }
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  }
);
