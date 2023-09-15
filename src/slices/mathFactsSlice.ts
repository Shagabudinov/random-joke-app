import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface randomFact {
  id: number;
  randomFact: string;
  date: string;
  correctDate: string;
}

const initialState: randomFact[] = [];

const generateId = (state: randomFact[]) => {
  return state[state.length - 1] ? state[state.length - 1].id + 1 : 1;
};

const mathFactsSlice = createSlice({
  name: "mathFacts",
  initialState,
  reducers: {
    factToHistory: (state, action: PayloadAction<string>) => {
      const dateNow = new Date();
      state.push({
        id: generateId(state),
        randomFact: action.payload,
        date: dateNow.toISOString(),
        correctDate: `${dateNow.toISOString().slice(11, 19)} ${dateNow.toISOString().slice(0, 10)}`,
      });
    },
    deleteFactFromHistory: (state, action: PayloadAction<number>) => {
      return state.filter((fact) => fact.id !== action.payload);
    },
  },
});

export const { factToHistory, deleteFactFromHistory } = mathFactsSlice.actions;
export default mathFactsSlice.reducer;
