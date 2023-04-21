import { useEffect, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import "./App.css";
import { useAppDispatch } from "./store/store.ts";
import { fetchNextPokemon } from "./store/slice/pokemonData/services/fetchNextPokemon.ts";
import { useSelector } from "react-redux";
import {
  getPokemonsData,
  getPokemonsDataCount,
  getPokemonsDataIsLoading,
} from "./store/slice/pokemonData/selectors/pokemonsData.ts";
import useModal from "./hooks/useModal.ts";
import PokemonModal from "./components/PokemonModal/PokemonModal.tsx";
import PokemonCard from "./components/PokemonCard/PokemonCard.tsx";

function App() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const pokemonsData = useSelector(getPokemonsData);
  const [searchInputOptions, setSearchInputOptions] = useState([]);
  const pokemonsDataIsLoading = useSelector(getPokemonsDataIsLoading);
  const pokemonsDataCount = useSelector(getPokemonsDataCount);
  const { isOpen, toggleIsOpen } = useModal();
  const [searchInput, setSearchInput] = useState("");
  const s = useSelector((state) => state);
  console.log(pokemonsData);
  const isFirstRender = useRef(true);
  useEffect(() => {
    dispatch(fetchNextPokemon("https://pokeapi.co/api/v2/pokemon?limit=10"));
    isFirstRender.current = false;
  }, []);
  useEffect(() => {
    dispatch(
      fetchNextPokemon(
        `https://pokeapi.co/api/v2/pokemon?offset=${page * 10}&limit=10`
      )
    );
  }, [dispatch, page]);
  useEffect(() => {
    console.log(isFirstRender);
    if (!isFirstRender.current && searchInput) {
      console.log(searchInput);
      dispatch(
        fetchNextPokemon(
          `https://pokeapi.co/api/v2/pokemon-form/${searchInput}`
        )
      );
    }
  }, [dispatch, searchInput]);
  useEffect(() => {
    if (pokemonsData?.length && !searchInputOptions.length) {
      setSearchInputOptions(pokemonsData.map(({ name }) => name));
    }
  }, [isFirstRender, pokemonsData]);
  return (
    <>
      <Select
        label="With normal TextField"
        onChange={(e) => {
          console.log(e);
          setSearchInput(e.target.value);
        }}
        value={searchInput}
      >
        {searchInputOptions?.map(name => (
          <MenuItem value={name}>{name}</MenuItem>
        ))}
      </Select>
      {pokemonsDataIsLoading ? (
        <Box
          sx={{
            display: "flex",
            mt: 3,
            justifyContent: "center",
            position: "absolute",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <ul style={{ width: "100%", minWidth: 200 }}>
          {pokemonsData?.map((pokemon) => (
            <li key={pokemon?.name}>
              <Box
                alignItems="center"
                display="flex"
                width="fit-content"
                margin="0 auto"
              >
                <PokemonCard
                  toggleIsOpen={toggleIsOpen}
                  name={pokemon?.name}
                  img={pokemon?.avatar || pokemon?.sprites?.front_default}
                  url={pokemon?.url || pokemon?.pokemon?.url}
                />
              </Box>
            </li>
          ))}
        </ul>
      )}
      {pokemonsData?.length && !pokemonsDataIsLoading && (
        <Pagination
          sx={{ mx: "auto", width: "fit-content" }}
          count={Math.floor((pokemonsDataCount || 0) / 10)}
          page={page || 1}
          onChange={(_, num) => setPage(num)}
          shape="rounded"
          color="primary"
        />
      )}
      {isOpen && <PokemonModal toggleIsOpen={toggleIsOpen} isOpen={isOpen} />}
    </>
  );
}

export default App;
