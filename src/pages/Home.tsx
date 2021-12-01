import { useState, useEffect, FC } from "react";
import axios from "axios";
import Homepage from "../components/Homepage";
import Loading from "../Loading";
import { PokemonData } from "../util/interfaces";
import { useDataContext } from "../contexts/data_context";

interface Props {}

const Home: FC<Props> = () => {
  const [ pokemonData, setPokemonData ] = useState<PokemonData | null>(null);
  // const [ pokemonData, setPokemonData ] = useState([] as any);
  const [ dataLoading, setDataLoading ] = useState(true);

  const { searchTerm, setSearchTerm, setShowEvolutions } = useDataContext();

  const baseUrl: string = "https://pokeapi.co/api/v2";
  const speciesDataUrl: string = "pokemon-species";

  const speciesDataFetch = (midpoint: string, id: number | string): string => {
    return `${baseUrl}/${midpoint}/${id}`;
  };

  const fetchData = async (
    endpoint: string = "charizard",
    category: string = "pokemon"
  ) => {
    const fetchUrl: string = `${baseUrl}/${category}/${endpoint}`;

    // Fetch Basic Pokemon Data
    const response = await axios.get(fetchUrl);
    const data = await response.data;

    // Map Pokemon types to simpler array
    const pokemonTypes = data.types.map((pokemonType: any) => {
      return {
        type: pokemonType.type.name,
        url: pokemonType.type.url,
      };
    });

    // Fetch Pokemon Description Field
    const pokemonId = data.id;
    const descResponse = await axios.get(speciesDataFetch(speciesDataUrl, pokemonId));
    const descData = await descResponse.data;
    const description: string = descData.flavor_text_entries[0].flavor_text;

    // Extract Pokemon Pre-evolution data from speciesData
    const evolvesFrom: { name: string; url: string } | null =
      descData.evolves_from_species;
    let preEvolution;
    if (evolvesFrom) {
      preEvolution = {
        name: evolvesFrom.name,
        url: evolvesFrom.url,
      };
    }

    // Fetch Pokemon Evolution Data (url obtained from species endpoint)
    const evolutionUrl: string = descData.evolution_chain.url;
    const evolutionResponse = await axios.get(evolutionUrl);
    const evolutionData = await evolutionResponse.data;

    let firstEvolution, secondEvolution, thirdEvolution;

    const ev1: { name: string; url: string } = evolutionData.chain.species;
    firstEvolution = {
      name: ev1.name,
      url: ev1.url,
    };

    const evolution2: any | null = evolutionData.chain.evolves_to[0];
    const evolution3: any | null = evolution2
      ? evolutionData.chain.evolves_to[0].evolves_to[0]
      : null;

    if (evolution2) {
      const ev2: { name: string; url: string } = evolution2.species;
      secondEvolution = {
        name: ev2.name,
        url: ev2.url,
      };
    }

    if (evolution3) {
      const ev3: { name: string; url: string } = evolution3.species;
      thirdEvolution = {
        name: ev3.name,
        url: ev3.url,
      };
    }

    const evolutions: any[] = [ firstEvolution, secondEvolution, thirdEvolution ];

    const evolutionId = (speciesLink: string): string => {
      const speciesId = speciesLink
        .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
        .slice(0, -1);
      console.log("speciesId", speciesId);
      return speciesId;
    };

    // Find Pokemon's place in evolution chain
    const pokemonName = data.name;

    let pokemonIndex = 0;
    evolutions.forEach(async (evolution, index) => {
      if (evolution && evolution.name === pokemonName) {
        pokemonIndex = index;
        evolutions[pokemonIndex].img = data.sprites.front_default;
      } else if (evolution && evolution.name !== pokemonName) {
        const url = evolutions[index].url;
        const id = evolutionId(url);
        console.log("URL", url);
        const evoFetchUrl: string = `${baseUrl}/${category}/${id}`;
        const res = await axios.get(evoFetchUrl);
        const data = await res.data;
        const image_url = data.sprites.front_default;

        evolutions[index].id = id;
        evolutions[index].img = image_url;
      }
    });

    // Assign Pokemon to Evolution Chain spots, if they exist
    const currentPokemon = evolutions[pokemonIndex];
    currentPokemon.id = pokemonId;

    const firstPreEv = evolutions[pokemonIndex - 2] ? evolutions[pokemonIndex - 2] : null;
    const preEv = evolutions[pokemonIndex - 1] ? evolutions[pokemonIndex - 1] : null;
    const nextEv = evolutions[pokemonIndex + 1] ? evolutions[pokemonIndex + 1] : null;
    const lastNextEv = evolutions[pokemonIndex + 2] ? evolutions[pokemonIndex + 2] : null;

    const evolutionChain = {
      firstPreEv,
      preEv,
      currentPokemon,
      nextEv,
      lastNextEv,
    };

    setPokemonData({ description, pokemonTypes, preEvolution, evolutionChain, ...data });
    setDataLoading(false);
    return data;
  };

  useEffect(
    () => {
      fetchData(searchTerm);
      setShowEvolutions(false);
    },
    [ searchTerm, setSearchTerm ]
  );

  if (dataLoading) {
    return <Loading />;
  }

  if (pokemonData) {
    return <Homepage {...pokemonData} />;
  }

  return (
    <main>
      <h1>Wow. Such empty.</h1>
    </main>
  );
};

export default Home;
