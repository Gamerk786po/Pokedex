
// Interface for EvolutionDetails
export interface EvolutionDetails{
    min_level: number | null ;
    min_happiness: number | null;
    held_item: string | null;
    time_of_day: string;
    item: string | null;
    trigger: string | null;
}


// Interface for PokemonEvolutions
export interface PokemonEvolutionsInterface {
    name: string;
    evo_details: EvolutionDetails;
    evolves_to: PokemonEvolutionsInterface[];
}
