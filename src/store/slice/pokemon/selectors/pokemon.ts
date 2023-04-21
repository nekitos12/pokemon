import { StateSchema } from "../../../store.ts";

export const getPokemonInfo = (state: StateSchema) => state.pokemon?.data;
export const getPokemonUrl = (state: StateSchema) => state.pokemon?.url;
