import { configureStore, createSlice } from "@reduxjs/toolkit";
import anthropometryReducer from "./anthropometrySlice";

// Slice extra opcional para mensagem do app
const appSlice = createSlice({
  name: "app",
  initialState: { message: "Hello Redux!" },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setMessage } = appSlice.actions;

// Store unificada
export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    anthropometry: anthropometryReducer,
  },
});

