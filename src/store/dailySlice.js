import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  humor: "",
  dificuldade: null,
  desejo: null,
  imagem: null,
};

const dailySlice = createSlice({
  name: "diario",
  initialState,
  reducers: {
    setHumor: (state, action) => { state.humor = action.payload; },
    setDificuldade: (state, action) => { state.dificuldade = action.payload; },
    setDesejo: (state, action) => { state.desejo = action.payload; },
    setImagem: (state, action) => { state.imagem = action.payload; },
    resetDiario: () => initialState,
  },
});

export const { setHumor, setDificuldade, setDesejo, setImagem, resetDiario } = dailySlice.actions;
export default dailySlice.reducer;