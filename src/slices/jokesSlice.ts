import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface randomJoke {
  id: number;
  randomJoke: string;
  date: string;
  correctDate: string;
}

const initialState: randomJoke[] = [];

const generateId = (state: randomJoke[]) => {
  return state[state.length - 1] ? state[state.length - 1].id + 1 : 1;
};

const jokesSlice = createSlice({
  name: "jokes",
  initialState,
  reducers: {
    jokeToHistory: (state, action: PayloadAction<string>) => {
      const dateNow = new Date();
      state.push({
        id: generateId(state),
        randomJoke: action.payload,
        date: dateNow.toISOString(),
        correctDate: `${dateNow.toISOString().slice(11, 19)} ${dateNow.toISOString().slice(0, 10)}`,
      });
    },
    deleteJokeFromHistory: (state, action: PayloadAction<number>) => {
      return state.filter((fact) => fact.id !== action.payload);
    },
  },
});

export const { jokeToHistory, deleteJokeFromHistory } = jokesSlice.actions;
export default jokesSlice.reducer;
