import { FC, useState } from "react";
import { PokemonData } from "../util/interfaces";
import { convertUnits } from "../util/conversionFunctions";
import EvolutionaryTree from "./EvolutionaryTree";
import { useDataContext } from "../contexts/data_context";
import SearchForm from "./SearchForm";
import ChangePokemon from "./ChangePokemon";

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

  const { showEvolutions, setShowEvolutions } = useDataContext();

  const [ metricUnits, setMetricUnits ] = useState(false);
  const [ showShiny, setShowShiny ] = useState(false);

  // Imported Function with custom names for returning height and weight
  const [ metric, imperial ] = convertUnits(height, weight);

  return (
    <main>
      {/* Search for a Pokemon Form */}
      <SearchForm />
      <ChangePokemon id={id} />

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
