import { FC, useState } from "react";
import { PokemonData } from "../util/interfaces";
import { convertUnits } from "../util/conversionFunctions";
import EvolutionaryTree from "./EvolutionaryTree";
import { useDataContext } from "../contexts/data_context";

import { pokemonList } from "../data/pokemonList";

const Homepage: FC<PokemonData> = (pokemonData) => {
  const {
    name,
    id,
    description,
    height,
    weight,
    pokemonTypes,
    preEvolution,
    evolutionChain,
    sprites,
  } = pokemonData;

  const {
    pokemonSearch,
    setPokemonSearch,
    setSearchTerm,
    showEvolutions,
    setShowEvolutions,
  } = useDataContext();

  const [ metricUnits, setMetricUnits ] = useState(false);
  const [ showShiny, setShowShiny ] = useState(false);

  const [ searchError, setSearchError ] = useState(false);

  const [ metric, imperial ] = convertUnits(height, weight);

  const searchForPokemon = async (e: any) => {
    e.preventDefault();

    // Sanitize search term
    const searchQuery = pokemonSearch.trim().toLowerCase();

    // Check if search term is Number format and if so set as search query
    let pokemonNumberSearch = false;
    if (pokemonSearch == parseInt(pokemonSearch)) {
      const pokemonNumber: number = parseInt(pokemonSearch);
      if (pokemonNumber >= 1 && pokemonNumber <= 898) {
        pokemonNumberSearch = true;
      }
    }

    // Capitalize search term to check spelling against database of existing Pokemon
    const validationTerm = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);
    const searchValidation = pokemonList.find((pokemon) => pokemon === validationTerm);

    // If validated, set search term globally otherwise show error
    if (searchValidation || pokemonNumberSearch) {
      setSearchTerm(searchQuery);
      setPokemonSearch("");
    } else {
      setSearchError(true);
    }
  };

  return (
    <main>
      {/* Search for a Pokemon Form */}
      <section className="search-form">
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search">Search for a Pokemon</label>
          <input
            style={{ display: "block" }}
            type="text"
            placeholder="Type Name or #"
            value={pokemonSearch}
            onChange={(e) => {
              setSearchError(false);
              setPokemonSearch(e.target.value);
            }}
          />
          <button onClick={(e) => searchForPokemon(e)}>Search</button>
          {searchError && (
            <p>
              Pokemon does not exist... Please check spelling or try a number between 1 -
              898.
            </p>
          )}
        </form>
      </section>

      {/* Titlecard */}
      <section className="titlecard">
        <h1 className="capitalize">
          {name} #{id}
        </h1>
      </section>

      {/* Pokemon Images / Sprites */}
      <section className="sprites">
        <div className="flexbox">
          {
            <img
              src={sprites.front_default}
              alt="Pokemon Sprite Image"
              style={{ display: showShiny ? "none" : "block" }}
            />
          }
          {sprites.front_shiny && (
            <img
              src={sprites.front_shiny}
              alt="Pokemon Shiny Sprite Image"
              style={{ display: showShiny ? "block" : "none" }}
            />
          )}
        </div>
      </section>

      {/* Toggle to show regular or shiny version of Pokemon */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowShiny(!showShiny);
        }}
      >
        {showShiny ? "Show Normal Form" : "Show Shiny Form"}
      </button>

      {/* List Pokemon's types (Max: 2) */}
      <section className="types">
        <ul>
          {pokemonTypes.map((pokemonType, index) => {
            return (
              <li key={index}>
                <a href={pokemonType.url} className="capitalize">
                  {pokemonType.type}
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Height & Weight */}
      <section className="measurements">
        {/* Display Converted Height and Weight units */}
        <h3>Height: {metricUnits ? metric.height : imperial.height}</h3>
        <h3>Weight: {metricUnits ? metric.weight : imperial.weight}</h3>

        {/* Toggle between Imperial and Metric units for height and weight */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setMetricUnits(!metricUnits);
          }}
        >
          Change Units
        </button>
      </section>

      {/* Pokedex description from first game Pokemon appears in */}
      <section className="description">
        <p>{description}</p>
      </section>

      {/* Pokemon from which currently displayed Pokemon evolves from, if it exists */}
      {preEvolution && (
        <section className="pre-evolution">
          <h4>
            Evolves from: <span className="capitalize">{preEvolution.name}</span>
          </h4>
        </section>
      )}

      {/* Check if preEvolution or nextEvolution exists otherwise don't display button */}
      {(evolutionChain.preEv || evolutionChain.nextEv) && (
        <section className="evolutionary-tree">
          {/* Toggle to Show / Hide Pokemon's evolutionary line in order with sprites (images) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowEvolutions(!showEvolutions);
              console.log("evolutionChain", evolutionChain);
            }}
          >
            Show Evolutions
          </button>

          {showEvolutions && <EvolutionaryTree {...evolutionChain} />}
        </section>
      )}
    </main>
  );
};

export default Homepage;
