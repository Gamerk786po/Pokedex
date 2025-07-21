// Interface for PokemonSpecies
export interface PokemonSpeciesInterface {
    egg_groups: {
        name: string
    }[];
    evolution_chain_url: string;
    flavor_text: string;
    varieties: {
        name: string,
        url: string
    }[]
}