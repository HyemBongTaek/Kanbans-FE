import { createAsyncThunk } from "@reduxjs/toolkit";
import Apis from "../apis";
import {
  cardAllDeleteReducer,
  cardCheckReducer,
  cardStatusChangeReducer,
  changeBoardTitleReducer,
  changeOwnerReducer,
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
        return res.data;
      }
    } catch (err) {
      if (err.response.status === 400) {
        return thunkAPI.rejectWithValue(err.response);
      }
    }
  }
);

// 보드 삭제하기
export const deleteBoard = createAsyncThunk(
  "kanban/deleteBoard",
  async ({ boardId, boards, cardOrder }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/board/${boardId}`,
        method: "POST",
        data: {
          cardIds: cardOrder,
        },
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

//카드 전체 삭제
export const cardAllDelete = createAsyncThunk(
  "kanban/cardAllDelete",
  async ({ boardId, cardOrder }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/board/${boardId}/cards`,
        method: "POST",
        data: {
          cardIds: cardOrder,
        },
      });
      if (res.data.ok) {
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
        return thunkAPI.dispatch(
          cardStatusChangeReducer({
            check: res.data.check,
            status: res.data.changedStatus,
            cardId,
          })
        );
      }
    } catch (err) {
      throw err;
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
    } catch (err) {
      throw err;
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
      throw err;
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
        return res.data.members;
      }
    } catch (err) {
      throw err;
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
      throw err;
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
