import { createSlice } from '@reduxjs/toolkit';
import {fetchNextPokemon} from "./services/fetchNextPokemon.ts";
export interface Pokemon {
  [key: string]: any
}
export interface PokemonsDataSchema {
  isLoading: boolean,
  error: undefined | string,
  data: undefined | Pokemon[],
  count: undefined | number,
  next: null | string
}

const initialState: PokemonsDataSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
  count: undefined,
  next: null
};
export const pokemonsDataSlice = createSlice({
  name: 'pokemonsDataSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNextPokemon.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchNextPokemon.fulfilled, (
        state,
        action,
      ) => {
        state.isLoading = false;
        state.data = action.payload.results;
        state.next = action.payload.next;
        state.count = action.payload.count;
      })
      .addCase(fetchNextPokemon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: pokemonsDataActions } = pokemonsDataSlice;
export const { reducer: pokemonsDataReducer } = pokemonsDataSlice;
