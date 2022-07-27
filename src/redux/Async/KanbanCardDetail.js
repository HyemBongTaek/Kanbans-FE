import { createAsyncThunk } from "@reduxjs/toolkit";
import Apis from "../apis";
import {
  addProjectLabelReducer,
  cardInviteMembersReducer,
  deleteProjectLabelReducer,
  imageUploadReducer,
} from "../Slice/KanbanCardDetailSlice";

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
        console.log(res.data);
        return res.data.comment;
      }
    } catch (err) {
      throw thunkAPI.rejectWithValue();
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
      throw thunkAPI.rejectWithValue(err);
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
      throw thunkAPI.rejectWithValue(err);
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
      throw thunkAPI.rejectWithValue(err);
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
      throw thunkAPI.rejectWithValue(err);
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
      throw thunkAPI.rejectWithValue(err);
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
        credentials: "include",
      });
      if (res.data.ok) {
        return setTimeout(() => {
          thunkAPI.dispatch(imageUploadReducer(res.data.images));
        }, 1000);
      }
    } catch (err) {
      throw thunkAPI.rejectWithValue(err);
    }
  }
);

//카드 디테일 이미지 삭제
export const ImageDelete = createAsyncThunk(
  "kanbanCardDetail/ImageDelete",
  async ({ cardId, imageId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/card/${cardId}/image/${imageId}`,
        method: "DELETE",
      });
      if (res.data.ok) {
        return {
          imageId,
        };
      }
    } catch (err) {
      throw thunkAPI.rejectWithValue(err);
    }
  }
);

//카드디테일에서 라벨 프로젝트 전체에 등록하기
export const addProjectLabel = createAsyncThunk(
  "kanbanCardDetail/AddLabel",
  async ({ projectId, cardId, content, color }, thunkAPI) => {
    console.log("확인합니당", projectId, cardId, content, color);
    try {
      const res = await Apis({
        url: `/project/${projectId}/card/${cardId}/label`,
        method: "POST",
        data: {
          title: content,
          color: color,
        },
      });
      if (res.data.ok) {
        return thunkAPI.dispatch(addProjectLabelReducer(res.data.label));
      }
    } catch (err) {
      throw thunkAPI.rejectWithValue(err);
    }
  }
);

//프로젝트에 등록되어 있는 라벨 조회
export const searchLabel = createAsyncThunk(
  "kanbanCardDetail/searchLabel",
  async ({ projectId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/project/${projectId}/label`,
        method: "GET",
      });
      if (res.data.ok) {
        return res.data.labels;
      }
    } catch (err) {
      throw thunkAPI.rejectWithValue(err);
    }
  }
);

//프로젝트 공통적으로 사용하는 라벨 삭제
export const deleteProjectLabel = createAsyncThunk(
  "kanbanCardDetail/deleteProjectLabel",
  async ({ projectId, labelId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/project/${projectId}/label/${labelId}`,
        method: "DELETE",
      });
      if (res.data.ok) {
        return thunkAPI.dispatch(deleteProjectLabelReducer(labelId));
      }
    } catch (err) {
      throw thunkAPI.rejectWithValue(err);
    }
  }
);

//프로젝트에 등록되어있는 라벨 카드에 따로 추가하기
export const addCardLabels = createAsyncThunk(
  "KanbanCardDetail/addCardLabel",
  async ({ cardId, labelId }, thunkAPI) => {
    console.log(labelId);
    try {
      const res = await Apis({
        url: `/card/${cardId}/label`,
        method: "POST",
        data: {
          labelId,
        },
      });
      if (res.data.ok) {
        console.log(res.data);
      }
    } catch (err) {
      throw thunkAPI.rejectWithValue(err);
    }
  }
);

//카드에 추가되어 있지 않은 user확인하기.
export const cardShowMembers = createAsyncThunk(
  "kanbanCardDetail/cardShowMembers",
  async ({ projectId, cardId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/project/${projectId}/card/${cardId}`,
        method: "GET",
      });
      if (res.data.ok) {
        return res.data;
      }
    } catch (err) {
      throw thunkAPI.rejectWithValue(err);
    }
  }
);

//카드에 user초대하기
export const cardInviteMembers = createAsyncThunk(
  "kanbanCardDetail/cardInviteMembers",
  async ({ cardId, members }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/card/${cardId}/invite`,
        method: "POST",
        data: {
          members,
        },
      });
      if (res.data.ok) {
        return thunkAPI.dispatch(cardInviteMembersReducer(res.data.users));
      }
    } catch (err) {
      throw thunkAPI.rejectWithValue(err);
    }
  }
);

//카드에 등록된 라벨 삭제(프로젝트에 등록되어 있는 라벨 삭제가 아닌 카드에서만 삭제함)
export const deleteCardLabel = createAsyncThunk(
  "kanbanCardDetail/deleteCardLabel",
  async ({ cardId, labelId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `card/${cardId}/label/${labelId}`,
        method: "DELETE",
      });
      if (res.data.ok) {
        return labelId;
      }
    } catch (err) {
      throw thunkAPI.rejectWithValue(err);
    }
  }
);

//카드에 초대되어있는 유저 삭제하기
export const exitCardMember = createAsyncThunk(
  "kanbanCardDetail/exitCardMember",
  async ({ cardId, userId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/card/${cardId}/exit/${userId}`,
        method: "DELETE",
      });
      if (res.data.ok) {
        return userId;
      }
    } catch (err) {
      throw thunkAPI.rejectWithValue(err);
    }
  }
);
