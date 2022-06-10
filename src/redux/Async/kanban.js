import { createAsyncThunk } from "@reduxjs/toolkit";
import Apis from "../apis";

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
      return console.log(err.response.data.message);
    }
  }
);

// 보드 추가하기
export const addKanbanBoard = createAsyncThunk(
  "kanban/addKanbanBoard",
  async ({ projectId, title }, thunkAPI) => {
    console.log("작성", projectId, title);
    try {
      const res = await Apis({
        url: `/board`,
        method: "POST",
        data: {
          title,
          projectId: projectId,
        },
      });
      if (res.data.ok) {
        thunkAPI.dispatch(getKanbanBoard({ projectId }));
      }
    } catch (err) {
      console.log("작성에러", err.response);
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);
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
        return { boardId: boardId };
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
        return { data: res.data };
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
        return { data: res.data.newCard, boardId };
      }
    } catch (err) {
      console.log("에러", err);
    }
  }
);

//카드 전체 삭제
export const clearAllKanbanCards = createAsyncThunk(
  "kanban/clearAllKanbanCards",
  async ({ boardId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/board/${boardId}/cards`,
        method: "DELETE",
      });
      if (res.data.ok) {
        return res.data;
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
        return { res: res.data, cardId };
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
        console.log("카드삭제", res.data);
        return { boardId, cardId };
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
        return { res: res.data, cardId };
      }
    } catch (err) {
      console.log(err);
    }
  }
);

//칸반보드 이동
export const sortKanbanBoard = createAsyncThunk(
  "kanban/sortKanban",
  async ({
    newBoardOrder,
    sourceId,
    destinationId,
    sourceIndex,
    destinationIndex,
    draggableId,
    type,
    columnOrder,
    projectId,
  }) => {
    try {
      if (type === "column") {
        const res = await Apis({
          url: `/project/${projectId}/board-location`,
          method: "PATCH",
          data: {
            boardOrder: newBoardOrder,
          },
        });
        if (res.data.ok) {
          return {
            sourceId,
            destinationId,
            sourceIndex,
            destinationIndex,
            draggableId,
            type,
            columnOrder,
            newBoardOrder,
          };
        }
      }
    } catch (err) {
      console.log("칸반보드 이동 에러");
    }
  }
);

export const sortKanbanCard = createAsyncThunk(
  "kanban/sortKanbanCard",
  async ({ boardId, newBoard, startCards }) => {
    try {
      const res = await Apis({
        url: `/board/card/location`,
        method: "PATCH",
        data: {
          start: {
            boardId,
            cards: startCards.cardId,
          },
          end: {
            boardId,
            cards: newBoard.cardId,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
);

export const moveSortKanbanCard = createAsyncThunk(
  "kanban/moveSortKanbanCard",
  async ({
    startBoardId,
    startCardIds,
    finishBoardId,
    finishCardIds,
    newFinish,
    newStartId,
    newStart,
    newFinishId,
  }) => {
    console.log("startBoardId", startBoardId);
    console.log("finishBoardId", finishBoardId);
    // console.log("확인용", newFinish);
    // console.log("sss", newStart);
    // console.log("sdfkdjsajasf", startCardId);
    // console.log("sdfkdjsajasf", finishCardId);
    // console.log("확인ㄴㄴㄴ", start, finish);
    //
    try {
      const res = await Apis({
        url: `/board/card/location`,
        method: "PATCH",
        data: {
          start: {
            boardId: startBoardId,
            cards: newStart.cardId,
          },
          end: {
            boardId: finishBoardId,
            cards: finishCardIds,
          },
        },
      });
      if (res.data.ok) {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }

    return {
      newFinish,
      newStartId,
      newStart,
      newFinishId,
    };
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
