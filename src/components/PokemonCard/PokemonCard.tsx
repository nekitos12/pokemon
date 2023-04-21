import React from "react";
import "./PokemonCard.scss";
import InfoIcon from "@mui/icons-material/Info";
import {setPokemonUrl} from "../../store/slice/pokemon/pokemonSlice.ts";
import {useAppDispatch} from "../../store/store.ts";

interface IPokemonCardProps {
  img: string
  name?: string
  toggleIsOpen: () => void
  url?: string
}

export default function PokemonCard({
  img,
  name,
  toggleIsOpen,
 url
}: IPokemonCardProps) {
  const dispatch = useAppDispatch();
  const handleInfoClick = (pokemonInfo: string) => {
    toggleIsOpen()
    dispatch(setPokemonUrl({ pokemonInfo, name }));
  }
  return (
    <article className="pokemonCard">
      {name}
      <img src={img}/>
      <InfoIcon onClick={() => handleInfoClick(url)} />
    </article>
  );
}
