import { FC } from "react";
import { useDataContext } from "../contexts/data_context";

interface Evolution {
  name: string;
  img: string;
  url: string;
  id: number;
  arrow: string | null;
}

const Evolution: FC<Evolution> = ({ name, img, url, id, arrow }) => {
  const { setSearchTerm } = useDataContext();

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
      {arrow === "after" && <div className="arrow"> {">"} </div>}
    </div>
  );
};

export default Evolution;
