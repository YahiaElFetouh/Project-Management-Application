import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: {
    data: {},
    isFetching: false,
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.details.data = action.payload;
    },
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

