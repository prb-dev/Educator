import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    test: () => {},
  },
});

export const { test } = userSlice.actions;
export default userSlice.reducer;
