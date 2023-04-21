import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import {
  getPokemonInfo,
  getPokemonUrl,
} from "../../store/slice/pokemon/selectors/pokemon.ts";
import { useAppDispatch } from "../../store/store.ts";
import { fetchPokemonByUrl } from "../../store/slice/pokemon/services/fetchPokemonByUrl.ts";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function PokemonModal({
  isOpen,
  toggleIsOpen,
}: {
  isOpen: boolean;
  toggleIsOpen: () => void;
}) {
  const pokemonUrl = useSelector(getPokemonUrl);
  const { sprites, name, stats } = useSelector(getPokemonInfo);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPokemonByUrl(pokemonUrl));
  }, [pokemonUrl]);
  return (
    <div>
      <Modal open={isOpen} onClose={toggleIsOpen}>
        <Box sx={{ ...style, width: 400 }}>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" flexDirection="column" alignItems="center">
              <img src={sprites?.front_default} />
              {name}
            </Box>
            <Box display="flex" flexWrap="wrap" gap="10px">
              {stats &&
                stats.map(({ base_stat: baseStat, stat }) => (
                  <Box key={stat} display="flex" flexDirection="column" alignItems="center" >
                    <span>{baseStat}</span>
                    {stat.name}
                  </Box>
                ))}
            </Box>

          </Box>
        </Box>
      </Modal>
    </div>
  );
}
