export type State = {
    pokeSearch: string
}

export interface Evolution {
    name: string,
    url: string,
    img: string
    id: number
}

export interface EvolutionChain {
  firstPreEv: Evolution;
  preEv: Evolution;
  currentPokemon: Evolution;
  nextEv: Evolution;
  lastNextEv: Evolution;
}

export interface PokemonData {
    name: string,
    id: number,
    height: number,
    weight: number,
    description: string,
    preEvolution: {
        name: string,
        url: string
    } | null,
    evolutionChain: {
        firstPreEv: Evolution , preEv: Evolution , currentPokemon: Evolution, nextEv: Evolution , lastNextEv: Evolution 
    } ,
    sprites: {
        front_default: string,
        front_shiny: string,
    },
    pokemonTypes: [{
        type: string,
        url: string
    }]
    species: {url: string},
}