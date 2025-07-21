
// Interface for EvolutionDetails
interface EvolutionDetails{
    min_level: number | null;
    min_happiness: number | null;
    held_item: string | null;
    time_of_day: string;
    item: string | null;
    trigger: string;
}


// Interface for PokemonEvolutions
export interface PokemonEvolutionsInterface {
    name: string;
    evo_details: EvolutionDetails;
    evo_to: PokemonEvolutionsInterface;
}
