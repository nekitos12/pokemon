import { StateSchema } from "../../../store.ts";

export const getPokemonsData = (state: StateSchema) => state.pokemonsData.data;
export const getPokemonsDataIsLoading = (state: StateSchema) => state.pokemonsData.isLoading || false;
export const getPokemonsDataCount = (state: StateSchema) => state.pokemonsData.count;
