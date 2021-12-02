import axios from "axios";
import Evolution from "../components/Evolution";

export const fetchEvolutionData = async (
  data: any,
  descData: any,
  pokemonDataFetch: any
) => {
  // Fetch Pokemon Evolution Data
  const evolutionUrl: string = descData.evolution_chain.url;
  const evolutionResponse = await axios.get(evolutionUrl);
  const evolutionData = await evolutionResponse.data;

  let firstEvolution, secondEvolution, thirdEvolution;

  const ev1: { name: string; url: string } = evolutionData.chain.species;
  firstEvolution = {
    name: ev1.name,
    url: ev1.url,
    multiple: false,
  };

  // Check to see if Multiple evolutions exist based on data structure, 2 checks for each level of evolution they could exist at
  let multipleEv: any | null;
  if (evolutionData.chain.evolves_to.length > 1) {
    multipleEv = evolutionData.chain.evolves_to;
  }

  if (evolutionData.chain.evolves_to[0]) {
    if (evolutionData.chain.evolves_to[0].evolves_to.length > 1) {
      multipleEv = evolutionData.chain.evolves_to[0].evolves_to;
    }
  }

  let multipleEvolutions: any = [];

  if (multipleEv) {
    multipleEv.map((evolution: any) => {
      multipleEvolutions.push({
        name: evolution.species.name,
        url: evolution.species.url,
        multiple: true,
      });
    });
  }

  // Check to see if regular evolutions exist and if so assign them
  const evolution2: any | null = evolutionData.chain.evolves_to[0];
  const evolution3: any | null = evolution2
    ? evolutionData.chain.evolves_to[0].evolves_to[0]
    : null;

  if (evolution2) {
    const ev2: { name: string; url: string } = evolution2.species;
    secondEvolution = {
      name: ev2.name,
      url: ev2.url,
      multiple: false,
    };
  }

  if (evolution3) {
    const ev3: { name: string; url: string } = evolution3.species;
    thirdEvolution = {
      name: ev3.name,
      url: ev3.url,
      multiple: false,
    };
  }

  // Combine evolutions and spread in multiple evolutions
  const unfilteredEvolutions: Evolution[] = [
    firstEvolution,
    secondEvolution,
    thirdEvolution,
    ...multipleEvolutions,
  ];

  // Filter thru evolutions to remove duplicates if multiple evolutions at same level exist, due to how API call works
  let filteredNames: (string | undefined)[] = [];
  const evolutions: any[] = unfilteredEvolutions.filter(
    (evolution: any, index: number) => {
      // Filter out possible undefined arrays
      if (evolution !== undefined) {
        if (
          // Apply multiple: true to Pokemon that classify as evolutions and multiples for arrows
          // Check to make sure not first Pokemon in evolution tree, that the Pokemon is not the current Pokemon in Pokedex, that evolution.multiple is not false, and that multiple evolutions do exist for this Pokemon's evolutionary tree
          index !== 0 &&
          evolution.name !== data.name &&
          !evolution.multiple &&
          multipleEvolutions.length >= 1
        ) {
          evolution.multiple = true;
        }
        // Add the id property (#) to current Pokemon in pokedex
        if (evolution.name === data.name) {
          evolution.id = data.id;
        }
        if (!filteredNames.includes(evolution.name)) {
          filteredNames.push(evolution.name);
          return evolution;
        }
      }
    }
  );

  // Extract Pokemon's id based on its url in order to make additional fetch for more information on Pokemon
  const evolutionId = (speciesLink: string): string => {
    const speciesId = speciesLink
      .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
      .slice(0, -1);

    return speciesId;
  };

  // Find Pokemon's place in evolution chain
  const pokemonName: string = data.name;

  let pokemonIndex = 0;
  evolutions.forEach(async (evolution, index) => {
    if (evolution && evolution.name === pokemonName) {
      pokemonIndex = index;
      evolutions[pokemonIndex].img = data.sprites.front_default;
    } else if (evolution && evolution.name !== pokemonName) {
      const url = evolutions[index].url;
      const id = evolutionId(url);

      const res = await axios.get(pokemonDataFetch(id));
      const data = await res.data;
      const image_url = data.sprites.front_default;

      evolutions[index].id = id;
      evolutions[index].img = image_url;
    }
  });

  const evolutionChain = {
    evolutions,
  };

  return evolutionChain;
};
