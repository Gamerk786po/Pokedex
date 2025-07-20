import { createContext } from "react";
import { PokemonEvolutionsInterface } from "./interface";

// Interface for context
interface SpeciesContextInterface {
    pokemonEvolutions: PokemonEvolutionsInterface | null;
    setPokemonEvolutions: (pokemon: PokemonEvolutionsInterface | null) => void;
}
export const PokemonEvolutionsContext = createContext<SpeciesContextInterface | undefined>(undefined);