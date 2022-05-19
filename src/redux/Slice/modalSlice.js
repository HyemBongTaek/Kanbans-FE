import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openNav: false,
  openLogin: false,
  isLoading: false,
};

const modalSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOpenNavReducer: (state) => {
      state.openNav = !state.openNav;
    },
    setOpenLoginReducer: (state, action) => {
      state.openLogin = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setOpenNavReducer, setOpenLoginReducer } = modalSlice.actions;

export default modalSlice;
