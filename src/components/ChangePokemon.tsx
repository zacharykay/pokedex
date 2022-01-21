import { FC } from "react";
import { useDataContext } from "../contexts/data_context";

import {ReactComponent as LeftArrow} from "../icons/svg/arrow-left-svgrepo-com.svg"
import {ReactComponent as RightArrow} from "../icons/svg/arrow-right-svgrepo-com.svg"

interface Props {
  id: number;
  buttonType?: string
}

export const ChangePokemon: FC<Props> = ({ id, buttonType }) => {
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
      {buttonType === "previous" && <button className='arrow-btn' onClick={(e) => changeCurrentPokemon(e, "previous")}>
        <LeftArrow/>
      </button>}
      {buttonType === "random" && <button onClick={(e) => changeCurrentPokemon(e, "random")}>Random Pokemon</button>}
      {buttonType === "next" && <button className='arrow-btn' onClick={(e) => changeCurrentPokemon(e, "next")}><RightArrow /></button>}
    </div>
  );
};
