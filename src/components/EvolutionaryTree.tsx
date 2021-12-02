import { FC } from "react";
import { EvolutionChain, Evolution } from "../util/interfaces";
import SingleEvolution from "./Evolution";

const EvolutionaryTree: FC<EvolutionChain> = (evolutionChain) => {
  const { evolutions } = evolutionChain;

  return (
    <div className="flexbox evolutions">
      {evolutions ? (
        evolutions.map((evolution: Evolution, index: number) => {
          return (
            <SingleEvolution
              key={index}
              {...evolution}
              //   Add arrow showing Evolutionary Pattern only if not Multiple evolutions at same level and not last Pokemon in evolutionary chain
              arrow={
                !evolution.multiple && index !== evolutions.length - 1 ? "after" : null
              }
            />
          );
        })
      ) : null}
    </div>
  );
};

export default EvolutionaryTree;
