import { FC } from "react";
import { EvolutionChain } from "../util/interfaces";
import Evolution from "./Evolution";

const EvolutionaryTree: FC<EvolutionChain> = (evolutionChain) => {
  const { firstPreEv, preEv, currentPokemon, nextEv, lastNextEv } = evolutionChain;

  return (
    <div className="flexbox">
      {firstPreEv ? <Evolution {...firstPreEv} arrow={"after"} /> : null}
      {preEv ? <Evolution {...preEv} arrow={"after"} /> : null}
      {currentPokemon ? <Evolution {...currentPokemon} arrow={null} /> : null}
      {nextEv ? <Evolution {...nextEv} arrow={"before"} /> : null}
      {lastNextEv ? <Evolution {...lastNextEv} arrow={"before"} /> : null}
    </div>
  );
};

export default EvolutionaryTree;
