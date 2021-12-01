import React, {
  FC,
  useState,
  useEffect,
  useContext,
  useReducer,
  createContext,
} from "react";
// import reducer from "../reducers/data_reducer";
import { State } from "../util/interfaces";
import { ActionKind } from "../util/actions";

const initialState: State = {
  pokeSearch: "",
};

export const DataContext = createContext<any>({} as any);

export const DataProvider: FC = ({ children }) => {
  const [ pokemonSearch, setPokemonSearch ] = useState("");
  const [ searchTerm, setSearchTerm ] = useState("charizard");
  const [ showEvolutions, setShowEvolutions ] = useState(false);

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
