import { createAsyncThunk } from "@reduxjs/toolkit";
import Apis from "../apis";

//칸반카드디테일 내용 불러오기
export const getKanbanCardDetail = createAsyncThunk(
  "kanbanCardDetail/getKanbanCardDetail",
  async ({ cardId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/card/${cardId}`,
        method: "GET",
      });
      if (res.data.ok) {
        return res.data;
      }
    } catch (err) {
      thunkAPI.rejectWithValue();
      console.log("데이터를 불러오는 도중에 에러가 발생하였습니다.");
    }
  }
);

//카드 테스크(progressbar) 등록
export const addCardTask = createAsyncThunk(
  "KanbanCardDetail/addCardTask",
  async ({ cardId, content, checked }, thunkAPI) => {
    try {
      const res = await Apis({
        url: "/task",
        method: "POST",
        data: {
          content,
          checked,
          cardId,
        },
      });
      if (res.data.ok) {
        return res.data.task;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

//카드 테스크(progressbar) 삭제
export const deleteCardTask = createAsyncThunk(
  "KanbanCardDetail/deleteCardTask",
  async ({ id }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/task/${id}`,
        method: "DELETE",
      });
      if (res.data.ok) {
        return { res: res.data, id };
      }
    } catch (err) {
      console.log(err);
    }
  }
);

//카드 테스크(progressbar) 체크
export const checkCardTask = createAsyncThunk(
  "KanbanCardDetail/checkCardTask",
  async ({ id, check }, thunkAPI) => {
    console.log("이거 체크", check);
    try {
      const res = await Apis({
        url: `/task/${id}`,
        method: "PATCH",
        data: {
          check,
        },
      });
      if (res.data.ok) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

//카드 디테일 댓글 조회
export const getCardComment = createAsyncThunk(
  "kanbanCardDetail/getCardTasks",
  async ({ cardId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/comment/${cardId}`,
        method: "GET",
      });
      if (res.data.ok) {
        return res.data;
      }
    } catch (err) {
      thunkAPI.rejectWithValue();
      console.log(err.res.message);
    }
  }
);

//카드 디테일 댓글 작성
export const addCardComment = createAsyncThunk(
  "kanbanCardDetail/addCardComment",
  async ({ content, cardId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/comment`,
        method: "POST",
        data: {
          content,
          cardId,
        },
      });
      if (res.data.ok) {
        return res.data.comment;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

//카드 디테일 댓글 삭제하기
export const deleteCardComment = createAsyncThunk(
  "kanbanCardDetail/deleteCardComment",
  async ({ id }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/comment/${id}`,
        method: "DELETE",
      });
      if (res.data.ok) {
        console.log(res.data);
        return id;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

//카드 디테일 댓글 수정하기
export const editCardComment = createAsyncThunk(
  "kanbanCardDetail/editCardComment",
  async ({ id, content, index }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/comment/${id}`,
        method: "PATCH",
        data: {
          content,
        },
      });
      if (res.data.ok) {
        console.log(res.data);
        return res.data.comment;
      }
    } catch (err) {
      thunkAPI.rejectWithValue();
    }
  }
);

//D-day설정날짜 서버에 저장하기
export const addDaySelected = createAsyncThunk(
  "kanbanCardDetail/addDaySelected",
  async ({ cardId, dDay }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/card/${cardId}/card-details`,
        method: "PATCH",
        data: {
          dDay: dDay,
        },
      });
      if (res.data.ok) {
        console.log(res.data);
      }
    } catch (err) {
      thunkAPI.rejectWithValue();
    }
  }
);

//카드 디테일 title, subtitle, description 설정하기.
export const editContent = createAsyncThunk(
  "KanbanCardDetail/editContent",
  async ({ cardId, title, subTitle, description, type }, thunkAPI) => {
    console.log("타입", subTitle);
    try {
      switch (type) {
        case "title": {
          const res = await Apis({
            url: `/card/${cardId}/card-details`,
            method: "PATCH",
            data: {
              title,
            },
          });
          return console.log(res.data);
        }
        case "subTitle": {
          const res = await Apis({
            url: `/card/${cardId}/card-details`,
            method: "PATCH",
            data: {
              subtitle: subTitle,
            },
          });
          return console.log(res.data);
        }
        case "description": {
          const res = await Apis({
            url: `/card/${cardId}/card-details`,
            method: "PATCH",
            data: {
              description,
            },
          });
          return console.log(res.data);
        }
      }
    } catch (err) {
      thunkAPI.rejectWithValue();
    }
  }
);

//카드 디테일 이미지 업로드

export const imageUpload = createAsyncThunk(
  "kanbanCardDetail/imageUpload",
  async ({ cardId, formData }, thunkAPI) => {
    console.log(formData);
    console.log(cardId);
    try {
      const res = await Apis({
        url: `/card/${cardId}/images`,
        method: "POST",
        data: formData,
      });
      if (res.data.ok) {
        console.log(res.data);
      }
    } catch (err) {
      thunkAPI.rejectWithValue();
    }
  }
);
