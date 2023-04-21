import {combineReducers, configureStore } from '@reduxjs/toolkit';
import api from '../services';
import { useDispatch } from 'react-redux'

import { pokemonsDataReducer, PokemonsDataSchema } from "./slice/pokemonData/pokemonsDataSlice.ts";
import { pokemonReducer, PokemonSchema } from "./slice/pokemon/pokemonSlice.ts";
const rootReducer = combineReducers({
  pokemonsData: pokemonsDataReducer,
  pokemon: pokemonReducer
})
export interface StateSchema {
  pokemonsData: PokemonsDataSchema,
  pokemon?: PokemonSchema
}
export function createReduxStore() {
  const extraArg = {
    api,
  };

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
    }),
  });

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>()