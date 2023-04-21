import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPokemonByUrl } from "./services/fetchPokemonByUrl.ts";

export interface PokemonSchema {
  url?: string;
  data?: any;
  isLoading: boolean;
  error?: undefined | string;
}

const initialState: PokemonSchema = {
  url: undefined,
  data: {},
  isLoading: false,
  error: undefined,
};

export const pokemonSlice = createSlice({
  name: "pokemonSlice",
  initialState,
  reducers: {
    setPokemonUrl: (
      state,
      action: PayloadAction<{ pokemonInfo: string; name: string }>
    ) => {
      state.url = action.payload.pokemonInfo;
      state.data = { name: action.payload.name };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonByUrl.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchPokemonByUrl.fulfilled,
        (state, action) => {
          state.data = { ...state.data, ...action.payload };
          state.isLoading = false;
          state.error = undefined;
        }
      )
      .addCase(fetchPokemonByUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setPokemonUrl } = pokemonSlice.actions;
export const { reducer: pokemonReducer } = pokemonSlice;

