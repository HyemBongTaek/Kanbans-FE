import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openNav: false,
  openLogin: false,
  isLoading: false,
  isRestTime: false,
};

const commonSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOpenNavReducer: (state) => {
      state.openNav = !state.openNav;
    },
    setOpenLoginReducer: (state, action) => {
      state.openLogin = action.payload;
    },
    isRestTimeReducer: (state, action) => {
      state.isRestTime = !state.isRestTime;
    },
  },
  extraReducers: (builder) => {},
});

export const { setOpenNavReducer, setOpenLoginReducer, isRestTimeReducer } =
  commonSlice.actions;

export default commonSlice;
