export type State = {
    pokeSearch: string
}

export interface Evolution {
    name: string,
    url: string,
    img: string
    id: number,
    multiple: boolean,
    themeColor1?: string
}

export interface EvolutionChain {
    themeColor1?: string,
    themeColor2?: string | null,
    evolutions: Evolution[]
}

export interface PokemonData {
    name: string,
    id: number,
    height: number,
    weight: number,
    description: string,
    genus: string,
    preEvolution: {
        name: string,
        url: string
    } | null,
    evolutionChain: {
        evolutions: any
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
