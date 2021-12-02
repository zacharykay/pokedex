import { FC } from "react";
import { useDataContext } from "../contexts/data_context";

interface Props {
  id: number;
}

export const ChangePokemon: FC<Props> = ({ id }) => {
  const { setSearchTerm, randomPokemonNumber } = useDataContext();
  function changeCurrentPokemon(e: any, direction: string) {
    e.preventDefault();
    let newPokemonId: number | string;
    if (direction === "previous" && id > 1) {
      newPokemonId = id - 1;
      setSearchTerm(newPokemonId.toString());
    }
    if (direction === "next" && id < 898) {
      newPokemonId = id + 1;
      setSearchTerm(newPokemonId.toString());
    }
    if (direction === "random") {
      newPokemonId = randomPokemonNumber();
      setSearchTerm(newPokemonId.toString());
    }
  }

  return (
    <div className="change-pokemon">
      <button onClick={(e) => changeCurrentPokemon(e, "previous")}>
        Previous Pokemon
      </button>
      <button onClick={(e) => changeCurrentPokemon(e, "random")}>Random Pokemon</button>
      <button onClick={(e) => changeCurrentPokemon(e, "next")}>Next Pokemon</button>
    </div>
  );
};
