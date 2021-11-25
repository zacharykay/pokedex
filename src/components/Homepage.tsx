import { FC } from "react";
import { PokemonData } from "../interfaces";

// interface Props {
//   name: string;
// }

const convertDecimetersToFeet = (decimeters: number): string => {
  const inches: number = decimeters * 3.937;
  const feet: number = inches / 12;
  console.log("FEET", feet, inches);
  return `${feet.toFixed()}' ${(inches % 12).toFixed()}"`;
};

const convertHectogramsToPounds = (hectograms: number): string => {
  const ounces: number = hectograms * 3.527;
  const pounds: number = ounces / 16;
  return `${pounds.toFixed(1)} lbs.`;
};

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

  const { firstPreEv, preEv, currentPokemon, nextEv, lastNextEv } = evolutionChain;
  return (
    <main>
      <h1 className="capitalize">
        {name} #{id}
      </h1>
      <div className="flexbox">
        <img src={sprites.front_default} alt="Pokemon Sprite Image" />
        <img src={sprites.front_shiny} alt="Pokemon Shiny Sprite Image" />
      </div>

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
      <h3>Height: {convertDecimetersToFeet(height)}</h3>
      <h3>Weight: {convertHectogramsToPounds(weight)}</h3>
      <p>{description}</p>
      {preEvolution && (
        <h4>
          Evolves from: <span className="capitalize">{preEvolution.name}</span>
        </h4>
      )}
      <div className="flexbox">
        {firstPreEv ? (
          <div className="capitalize">
            <img src={firstPreEv.img} alt={`${firstPreEv.name} Sprite`} />
            <p>
              <a href={firstPreEv.url}>{firstPreEv.name}</a>
              {" > "}
            </p>
          </div>
        ) : null}
        {preEv ? (
          <div className="capitalize">
            <img src={preEv.img} alt={`${preEv.name} Sprite`} />
            <p>
              <a href={preEv.url}>{preEv.name}</a>
              {" > "}
            </p>
          </div>
        ) : null}
        {currentPokemon ? (
          <div className="capitalize">
            <img src={currentPokemon.img} alt={`${currentPokemon.name} Sprite`} />
            <p>
              <a href={currentPokemon.url}>{currentPokemon.name}</a>
            </p>
          </div>
        ) : null}
        {nextEv ? (
          <div className="capitalize">
            <img src={nextEv.img} alt={`${nextEv.name} Sprite`} />
            <p>
              {" > "}
              <a href={nextEv.url}>{nextEv.name}</a>
            </p>
          </div>
        ) : null}
        {lastNextEv ? (
          <div className="capitalize">
            <img src={lastNextEv.img} alt={`${lastNextEv.name} Sprite`} />
            <p>
              {" > "}
              <a href={lastNextEv.url}>{lastNextEv.name}</a>
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Homepage;
