import { useState } from "react";
import { useDataContext } from "../contexts/data_context";

import { pokemonList } from "../data/pokemonList";

const SearchForm = () => {
  const { pokemonSearch, setPokemonSearch, setSearchTerm } = useDataContext();

  const [ searchError, setSearchError ] = useState(false);
  const searchForPokemon = async (e: any) => {
    e.preventDefault();

    // Sanitize search term
    const searchQuery: string = pokemonSearch.trim().toLowerCase();

    // Check if search term is Number format and if so set as search query
    let pokemonNumberSearch: boolean = false;
    if (pokemonSearch == parseInt(pokemonSearch)) {
      const pokemonNumber: number = parseInt(pokemonSearch);
      if (pokemonNumber >= 1 && pokemonNumber <= 898) {
        pokemonNumberSearch = true;
      }
    }

    // Capitalize search term to check spelling against database of existing Pokemon
    const validationTerm: string =
      searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);
    const searchValidation: string | undefined = pokemonList.find(
      (pokemon) => pokemon === validationTerm
    );

    // If validated, set search term globally otherwise show error
    if (searchValidation || pokemonNumberSearch) {
      setSearchTerm(searchQuery);
      setPokemonSearch("");
    } else {
      setSearchError(true);
    }
  };
  return (
    <div className="search-form">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search Pokemon by Name or #"
          value={pokemonSearch}
          onChange={(e) => {
            setSearchError(false);
            setPokemonSearch(e.target.value);
          }}
        />
        <button className="search-btn" onClick={(e) => searchForPokemon(e)}>
          Search
        </button>
        <button className="small-search-btn" onClick={(e) => searchForPokemon(e)}>
          GO
        </button>
      </form>
      {searchError && (
        <p className="incorrect-search-text">
          Check spelling or try a number from 1 - 898.
        </p>
      )}
    </div>
  );
};

export default SearchForm;
