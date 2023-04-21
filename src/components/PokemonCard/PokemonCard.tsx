import "./PokemonCard.scss";
import InfoIcon from "@mui/icons-material/Info";
import { setPokemonUrl } from "../../store/slice/pokemon/pokemonSlice.ts";
import { useAppDispatch } from "../../store/store.ts";

interface IPokemonCardProps {
  img: string;
  name?: string;
  toggleIsOpen: () => void;
  url?: string;
}

export default function PokemonCard({
  img,
  name,
  toggleIsOpen,
  url,
}: IPokemonCardProps) {
  const dispatch = useAppDispatch();
  const handleInfoClick = (pokemonInfo: string) => {
    toggleIsOpen();
    // @ts-ignore
    dispatch(setPokemonUrl({ pokemonInfo, name }));
  };
  return (
    <article className="pokemonCard">
      {name}
      <img src={img} />
      {/* @ts-ignore */}
      <InfoIcon onClick={() => handleInfoClick(url)} />
    </article>
  );
}
