import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openNav: false,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOpenNavReducer: (state) => {
      state.openNav = !state.openNav;
    },
  },
  extraReducers: {},
});

export const { setOpenNavReducer } = navSlice.actions;

export default navSlice;
