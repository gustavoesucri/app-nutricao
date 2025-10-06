import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weight: "",
  height: "",
  waist: "",
  biceps: "",
  hip: "",
};

const anthropometrySlice = createSlice({
  name: "anthropometry",
  initialState,
  reducers: {
    setAnthropometry: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetAnthropometry: () => initialState,
  },
});

export const { setAnthropometry, resetAnthropometry } = anthropometrySlice.actions;
export default anthropometrySlice.reducer;
