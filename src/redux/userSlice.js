import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({

  // initial state
  name: "user",
  initialState: {
    userInfo: {
      name: "",
      photo: "",
      gId: "",
    },
    pending: false,
    error: false,
  },
  //type of action can perform
  reducers: {
    updateStart: (state) => {
      state.pending = true;
    },
    updateSuccess: (state, action) => {
      state.pending = false;
      state.userInfo.name = action.payload?.name;
      state.userInfo.photo = action.payload?.photo;
      state.userInfo.gId = action.payload?._id;

    },
    updateError: (state) => {
      state.error = true;
      state.pending = false;
    },
  },
});

// can access by any place to manuplicate data
export const { updateStart, updateSuccess, updateError } = userSlice.actions;
// reducer export for cases for reducer
export default userSlice.reducer;


export const userDetail = (stat) => stat;
