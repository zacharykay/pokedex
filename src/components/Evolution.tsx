import { FC, useState } from "react";
import { useDataContext } from "../contexts/data_context";

interface Evolution {
  name: string;
  img: string;
  url: string;
  id: number;
  arrow: string | null;
}

const Evolution: FC<Evolution> = (evolution, themeColor1) => {
  const { setSearchTerm } = useDataContext();

  const [ hovering, setHovering ] = useState(false);

  const { name, img, url, id, arrow } = evolution;

  return (
    <div className="evolution-container">
      <div
        className="capitalize evolution-block"
        style={hovering ? { backgroundColor: themeColor1 } : { backgroundColor: "" }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
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
