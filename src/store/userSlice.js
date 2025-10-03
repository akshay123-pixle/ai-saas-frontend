import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { userLogin } = userSlice.actions;
export default userSlice.reducer;
