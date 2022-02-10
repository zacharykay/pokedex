import { FC } from "react";
import { useDataContext } from "../contexts/data_context";

import { ReactComponent as LeftArrow } from "../icons/svg/arrow-left-svgrepo-com.svg";
import { ReactComponent as RightArrow } from "../icons/svg/arrow-right-svgrepo-com.svg";
import { ReactComponent as DownArrow } from "../icons/svg/arrow-down-svgrepo-com.svg";
import { ReactComponent as UpArrow } from "../icons/svg/arrow-up-svgrepo-com.svg";

interface Props {
  id: number;
  buttonType?: string;
  arrowDirection?: string;
}

export const ChangePokemon: FC<Props> = ({ id, buttonType, arrowDirection }) => {
  const {
    setSearchTerm,
    randomPokemonNumber,
    prevPokemon,
    setPrevPokemon,
  } = useDataContext();

  const arrowClass: string = arrowDirection ? "arrow-btn" : "";

  function changeCurrentPokemon(e: any, direction: string) {
    e.preventDefault();
    setPrevPokemon(id);

    let newPokemonId: number | string;
    if (direction === "random") {
      newPokemonId = randomPokemonNumber();
      setSearchTerm(newPokemonId.toString());
    } else if (direction === "back") {
      if (prevPokemon === 0) {
        return;
      }
      setSearchTerm(prevPokemon);
      setPrevPokemon(0);
    } else if (direction === "previous" && id > 1) {
      newPokemonId = id - 1;
      setSearchTerm(newPokemonId.toString());
    } else if (direction === "next" && id < 898) {
      newPokemonId = id + 1;
      setSearchTerm(newPokemonId.toString());
    } else if (direction === "previous10" && id) {
      if (id > 10) {
        newPokemonId = id - 10;
        setSearchTerm(newPokemonId.toString());
      } else if (id <= 10) {
        setSearchTerm(setSearchTerm("1"));
      }
    } else if (direction === "next10" && id < 888) {
      if (id < 888) {
        newPokemonId = id + 10;
        setSearchTerm(newPokemonId.toString());
      } else if (id >= 888) {
        setSearchTerm("898");
      }
    }
  }

  return (
    <div className={`change-pokemon ${arrowDirection}`}>
      {/* Random */}
      {buttonType === "random" && (
        <div className="button-circle" onClick={(e) => changeCurrentPokemon(e, "random")}>
          <p>A</p>
        </div>
      )}
      {/* Go Back */}
      {buttonType === "back" && (
        <div className="button-circle" onClick={(e) => changeCurrentPokemon(e, "back")}>
          <p>B</p>
        </div>
      )}
      {/* Previous */}
      {buttonType === "previous" && (
        <button
          className={arrowClass}
          onClick={(e) => changeCurrentPokemon(e, "previous")}
        >
          <LeftArrow />
        </button>
      )}
      {/* Next */}
      {buttonType === "next" && (
        <button className={arrowClass} onClick={(e) => changeCurrentPokemon(e, "next")}>
          <RightArrow />
        </button>
      )}
      {/* Next 10 */}
      {buttonType === "next10" && (
        <button className={arrowClass} onClick={(e) => changeCurrentPokemon(e, "next10")}>
          <UpArrow />
        </button>
      )}
      {/* Previous 10 */}
      {buttonType === "previous10" && (
        <button
          className={arrowClass}
          onClick={(e) => changeCurrentPokemon(e, "previous10")}
        >
          <DownArrow />
        </button>
      )}
    </div>
  );
};
