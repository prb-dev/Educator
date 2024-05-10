import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    signinFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutStart: (state) => {
      state.loading = true;
    },
    signoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    },
    signoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  signinStart,
  signinSuccess,
  signinFail,
  signoutStart,
  signoutSuccess,
  signoutFail,
} = userSlice.actions;

export default userSlice.reducer;
