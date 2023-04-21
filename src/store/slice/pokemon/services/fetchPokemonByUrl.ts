import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "../../pokemonData/services/fetchNextPokemon.ts";
import {Pokemon} from "../../pokemonData/pokemonsDataSlice.ts";

export const fetchPokemonByUrl = createAsyncThunk<
  Pokemon,
  string,
  ThunkConfig<string>
>("pokemonSlice/fetchPokemonByUrl", async (searchString, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    if (searchString) {
      const response = await extra.api.pokemon.get(searchString);
      if (!response.data) {
        throw new Error();
      }
      return response.data;
    }
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
