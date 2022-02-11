import { FC, useState } from "react";
import { PokemonData } from "../util/interfaces";
import { convertUnits } from "../util/conversionFunctions";
import EvolutionaryTree from "./EvolutionaryTree";
import { useDataContext } from "../contexts/data_context";
import SearchForm from "./SearchForm";
import { ChangePokemon } from "./ChangePokemon";

import pokeball from "../assets/8-bit-pokeball.png";
// import {ReactComponent as LeftArrow} from "../icons/svg/arrow-left-svgrepo-com.svg"
// import {ReactComponent as RightArrow} from "../icons/svg/arrow-right-svgrepo-com.svg"

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

  const { showEvolutions, setShowEvolutions, showShiny, setShowShiny } = useDataContext();

  const [ metricUnits, setMetricUnits ] = useState(false);
  // const [ showShiny, setShowShiny ] = useState(false);

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
      <div className="blue-ball" />

      {/* Search for a Pokemon Form */}
      <nav>
        <SearchForm />
      </nav>

      <article style={{ border: `10px solid ${themeColor1}` }}>
        {/* Titlecard */}
        <section className="titlecard">
          <div className="flexbox" style={{ backgroundColor: themeColor1 }}>
            {/* // style={{ */}
            {/* //   borderBottom: `10px solid ${themeColor2 ? themeColor2 : themeColor1}`,
        // }} */}
            <img className="pokeball-sprite" src={pokeball} alt="8-bit pokeball" />
            <div className="vertically-center">
              <h1 className="capitalize">
                No.{addZerosToId(id)} {name}
              </h1>
            </div>
          </div>

          {/* Genus Data */}
          <div className="genus">
            <h2>{genus}</h2>
          </div>
        </section>

        <div className="flexbox" style={{ justifyContent: "space-around" }}>
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
          <div className="flexbox types-measurements">
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

            {/* Height & Weight */}
            <section className="measurements">
              {/* Display Converted Height and Weight units */}
              <div className="flexbox">
                <h3>
                  Height:{" "}
                  <span style={{ paddingLeft: "5px" }}>
                    {" "}
                    {metricUnits ? metric.height : imperial.height}
                  </span>
                </h3>
                <h3>
                  Weight:{" "}
                  <span style={{ paddingLeft: "2px" }}>
                    {metricUnits ? metric.weight : imperial.weight}
                  </span>
                </h3>
              </div>
            </section>

            {/* Pokemon from which currently displayed Pokemon evolves from, if it exists */}
            {preEvolution ? (
              <section className="pre-evolution">
                <hr style={{ backgroundColor: themeColor1, textAlign: "center" }} />
                <h4>
                  Evolves from:
                  {/* <span className="capitalize">{preEvolution.name}</span> */}
                </h4>
                <h4 className="capitalize pre-evolution-name">{preEvolution.name}</h4>
              </section>
            ) : null}
          </div>
        </div>

        {/* Pokedex description from first game Pokemon appears in */}
        <section
          className="description"
          style={{
            borderTop: `3px solid ${themeColor1}`,
            borderBottom: `3px solid ${themeColor1}`,
            borderLeft: `12px solid ${themeColor1}`,
            borderRight: `12px solid ${themeColor1}`,
            outline: `4px solid ${themeColor2 ? themeColor2 : "darkgrey"}`,
          }}
        >
          <p>{description}</p>
        </section>

        {/* Check if preEvolution or nextEvolution exists otherwise don't display button */}
        {/* {(evolutionChain.preEv || evolutionChain.nextEv) && ( */}
        {evolutionChain.evolutions.length > 1 && (
          <section className="evolutionary-tree">
            {/* Toggle to Show / Hide Pokemon's evolutionary line in order with sprites (images) */}
            <button
              style={{ backgroundColor: themeColor1 }}
              className="evolutions-btn"
              onClick={(e) => {
                e.preventDefault();
                setShowEvolutions(!showEvolutions);
                // console.log("evolutionChain", evolutionChain);
              }}
            >
              {showEvolutions ? "Hide Evolutions" : "See Evolutions"}
            </button>

            {showEvolutions && (
              <EvolutionaryTree
                themeColor1={themeColor1}
                themeColor2={themeColor2}
                {...evolutionChain}
              />
            )}
          </section>
        )}
      </article>

      {!showEvolutions ? (
        <div className="control-buttons-flexbox">
          <div className="arrow-buttons-flexbox">
            <ChangePokemon id={id} buttonType="next10" arrowDirection="up-btn" />
            <ChangePokemon id={id} buttonType="previous" arrowDirection="left-btn" />
            <div className="center-circle" />
            <ChangePokemon id={id} buttonType="next" arrowDirection="right-btn" />
            <ChangePokemon id={id} buttonType="previous10" arrowDirection="down-btn" />
            {/* <button className="left-btn arrow-btn"><LeftArrow/></button>
        <button className="right-btn arrow-btn"><RightArrow/></button> */}
          </div>
          <div className="round-buttons-flexbox">
            <ChangePokemon id={id} buttonType="random" />
            <ChangePokemon id={id} buttonType="back" />
          </div>
        </div>
      ) : null}

      <div className="btn-flexbox">
        {/* Toggle Shiny Button */}
        <button
          className="toggle-shiny-btn"
          onClick={(e) => {
            e.preventDefault();
            setShowShiny(!showShiny);
          }}
        >
          {showShiny ? "Show Normal Form" : "Show Shiny Form"}
        </button>

        {/* Toggle between Imperial and Metric units for height and weight */}
        <button
          className="convert-units-btn"
          onClick={(e) => {
            e.preventDefault();
            setMetricUnits(!metricUnits);
          }}
        >
          {metricUnits ? "Metric Units" : "Imperial Units"}
        </button>
      </div>
    </main>
  );
};

export default Homepage;
