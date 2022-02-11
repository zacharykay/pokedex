import { useState, useEffect, FC } from "react";
import axios from "axios";
import Homepage from "../components/Homepage";
import Loading from "../Loading";
import { PokemonData } from "../util/interfaces";
import { useDataContext } from "../contexts/data_context";
import { fetchEvolutionData } from "../util/fetchEvolutionData";

interface Props {}

const Home: FC<Props> = () => {
  const [ pokemonData, setPokemonData ] = useState<PokemonData | null>(null);
  const [ dataLoading, setDataLoading ] = useState(true);

  const { searchTerm, setSearchTerm, setShowEvolutions, setShowShiny } = useDataContext();

  const baseUrl: string = "https://pokeapi.co/api/v2";
  const speciesDataUrlPostfix: string = "-species";

  const pokemonDataFetch = (id: number | string, midpoint?: string): string => {
    return `${baseUrl}/pokemon${midpoint ? midpoint : ""}/${id}`;
  };

  const fetchData = async (id: string = searchTerm) => {
    // Fetch Basic Pokemon Data
    const response = await axios.get(pokemonDataFetch(id));
    const data = await response.data;

    // Set Pokemon name based on species.name
    const name = data.species.name;

    // Map Pokemon types to simpler array
    const pokemonTypes = data.types.map((pokemonType: any) => {
      return {
        type: pokemonType.type.name,
        url: pokemonType.type.url,
      };
    });

    // API Flavor Text / Description Field Format
    interface FlavorText {
      flavor_text: string;
      language: {
        name: string;
        url: string;
      };
      version: {
        name: string;
        url: string;
      };
    }
    // Fetch Pokemon Description Field
    const pokemonId = data.id;
    const descResponse = await axios.get(
      pokemonDataFetch(pokemonId, speciesDataUrlPostfix)
    );
    const descData = await descResponse.data;
    const descriptions = descData.flavor_text_entries.filter((entry: FlavorText) => {
      return entry.language.name === "en";
    });
    const description: string = descriptions[0].flavor_text
      .replace("POKéMON", "Pokémon")
      .replace("STONEs", "stones");

    // Extract Pokemon's Genus Data
    const genus: string = descData.genera.filter((gen: any) => {
      return gen.language.name === "en";
    })[0].genus;

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

    // Fetch Evolution Data Passing off already fetchedData, descriptionData from secondary Fetch, and function to create fetch url for follow-up fetching
    const evolutionChain = await fetchEvolutionData(data, descData, pokemonDataFetch);

    setPokemonData({
      name,
      description,
      genus,
      pokemonTypes,
      preEvolution,
      evolutionChain,
      ...data,
    });
    setDataLoading(false);
    return data;
  };

  useEffect(
    () => {
      fetchData(searchTerm);
      setShowShiny(false);
      setShowEvolutions(false);
    },
    //eslint-disable-next-line
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
