import { FC, useState, useContext, createContext } from "react";
import { State } from "../util/interfaces";

const initialState: State = {
  pokeSearch: "",
};

export const DataContext = createContext<any>({} as any);

export const DataProvider: FC = ({ children }) => {
  const randomPokemonNumber = () => {
    return (Math.random() * 897 + 1).toFixed();
  };

  const [ pokemonSearch, setPokemonSearch ] = useState("");
  const [ searchTerm, setSearchTerm ] = useState(randomPokemonNumber());
  const [ showEvolutions, setShowEvolutions ] = useState(false);
  const [ showShiny, setShowShiny ] = useState(false);

  return (
    <DataContext.Provider
      value={{
        ...initialState,
        pokemonSearch,
        setPokemonSearch,
        searchTerm,
        setSearchTerm,
        showEvolutions,
        setShowEvolutions,
        showShiny,
        setShowShiny,
        randomPokemonNumber,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
