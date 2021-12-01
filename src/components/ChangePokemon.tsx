import { FC } from "react";
import { useDataContext } from "../contexts/data_context";

interface Props {
  id: number;
}

const ChangePokemon: FC<Props> = ({ id }) => {
  const { setSearchTerm } = useDataContext();
  function changeCurrentPokemon(e: any, direction: string) {
    e.preventDefault();
    let newPokemonId: number | string | undefined;
    if (direction === "previous" && id > 1) {
      newPokemonId = id - 1;
      setSearchTerm(newPokemonId.toString());
    }
    if (direction === "next" && id < 898) {
      newPokemonId = id + 1;
      setSearchTerm(newPokemonId.toString());
    }
    if (direction === "random") {
      newPokemonId = (Math.random() * 898).toFixed();
      setSearchTerm(newPokemonId.toString());
    }
  }

  return (
    <section className="change-pokemon">
      <button onClick={(e) => changeCurrentPokemon(e, "previous")}>
        Previous Pokemon
      </button>
      <button onClick={(e) => changeCurrentPokemon(e, "random")}>Random Pokemon</button>
      <button onClick={(e) => changeCurrentPokemon(e, "next")}>Next Pokemon</button>
    </section>
  );
};

export default ChangePokemon;
