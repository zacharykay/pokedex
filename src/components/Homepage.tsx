import { FC, useState } from "react";
import { PokemonData } from "../util/interfaces";
import { convertUnits } from "../util/conversionFunctions";
import EvolutionaryTree from "./EvolutionaryTree";
import { useDataContext } from "../contexts/data_context";
import SearchForm from "./SearchForm";
import { ChangePokemon } from "./ChangePokemon";
import pokeball from "../assets/8-bit-pokeball.png";

import { pokemonTypes as pokeTypes } from "../data/pokemonTypes";

const Homepage: FC<PokemonData> = (pokemonData) => {
  const {
    name,
    id,
    description,
    genus,
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

  const typeColors = pokemonTypes.map((pokemonType) => {
    let typeRecord: Record<string, string> = pokeTypes;
    let typeColor: string = typeRecord[pokemonType.type];
    return typeColor;
  });
  const themeColor1: string = typeColors[0];
  const themeColor2: string | null = typeColors[1] ? typeColors[1] : null;

  const addZerosToId = (id: number): string | number => {
    if (id < 10) {
      return `00${id}`;
    } else if (id < 100) {
      return `0${id}`;
    }
    return id;
  };

  return (
    <main>
      {/* Search for a Pokemon Form */}
      <nav>
        <SearchForm />
        <ChangePokemon id={id} />
      </nav>

      <article style={{ border: `10px solid ${themeColor1}` }}>
        {/* Titlecard */}
        <section className="titlecard">
          {/* // style={{ */}
          {/* //   borderBottom: `10px solid ${themeColor2 ? themeColor2 : themeColor1}`,
        // }} */}
          <img className="pokeball-sprite" src={pokeball} alt="8-bit pokeball" />
          <div className="vertically-center">
            <h1 className="capitalize">
              No. {addZerosToId(id)} {name}
            </h1>
          </div>
        </section>

        {/* Pokemon Images / Sprites */}
        <section className="sprites">
          <div className="flexbox">
            {
              <img
                src={sprites.front_default}
                alt="Pokemon Sprite Image"
                style={{ display: showShiny ? "none" : "block" }}
                className="pokemon-sprite"
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
        <section className="toggle-sprite">
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowShiny(!showShiny);
            }}
          >
            {showShiny ? "Show Normal Form" : "Show Shiny Form"}
          </button>
        </section>

        {/* List Pokemon's types (Max: 2) */}
        <section className="types">
          <ul>
            {pokemonTypes.map((pokemonType, index) => {
              // typeColors mapped at Top and will have same corresponding index
              let divStyle: { backgroundColor: string } = {
                backgroundColor: typeColors[index],
              };
              return (
                <li key={index} className="capitalize" style={divStyle}>
                  {pokemonType.type}
                </li>
              );
            })}
          </ul>
        </section>

        {/* Genus Data */}
        <section className="genus">
          <h3>{genus}</h3>
        </section>

        {/* Height & Weight */}
        <section className="measurements">
          {/* Display Converted Height and Weight units */}
          <div className="flexbox">
            <h3>Height: {metricUnits ? metric.height : imperial.height}</h3>
            <h3>Weight: {metricUnits ? metric.weight : imperial.weight}</h3>
          </div>

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
        {/* {(evolutionChain.preEv || evolutionChain.nextEv) && ( */}
        {evolutionChain.evolutions.length > 1 && (
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
      </article>
    </main>
  );
};

export default Homepage;
