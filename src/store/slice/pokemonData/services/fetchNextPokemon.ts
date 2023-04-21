import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import api from "../../../../services";
import { StateSchema } from "../../../store.ts";
import {Pokemon} from "../pokemonsDataSlice.ts";

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}

const getPokemonsWithPhoto = async (pokemons: any[]) => {
  const arrayWithPhoto = [];
  for (const pokemon of pokemons) {
    const { data } = await api.pokemon.get(pokemon.url);
    arrayWithPhoto.push({ ...pokemon, avatar: data?.sprites?.front_default });
  }
  return arrayWithPhoto;
};
export const fetchNextPokemon = createAsyncThunk<
  Pokemon,
  string,
  ThunkConfig<string>
>("pokemonsDataSlice/fetchPokemonByUrl", async (searchString, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    // @ts-ignore
    const response = await extra.api.pokemon.get(searchString);
    console.log(response);
    const arrayWithPhoto = Array.isArray(response?.data?.results)
      ? await getPokemonsWithPhoto(response.data.results)
      : [response.data];
    if (!response.data) {
      throw new Error();
    }
    return { ...response.data, results: arrayWithPhoto };
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
