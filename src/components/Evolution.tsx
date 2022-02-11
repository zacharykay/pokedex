import { FC } from "react";
import { useDataContext } from "../contexts/data_context";

export interface Evo {
  name: string;
  img: string;
  id: number;
  // arrow: string | null;
}

const Evolution: FC<Evo> = (evolution) => {
  const { setSearchTerm } = useDataContext();

  const { name, img, id } = evolution;

  return (
    <div className="evolution-container">
      <div
        className="capitalize evolution-block"
        onClick={(e) => {
          e.preventDefault();
          setSearchTerm(id.toString());
        }}
      >
        <img src={img} alt={`${name} Sprite`} />
        <p>
          {name} #{id}
        </p>
      </div>
      {/* {arrow === "after" && <div className="arrow"> {">"} </div>} */}
    </div>
  );
};

export default Evolution;
