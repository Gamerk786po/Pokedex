import { createContext } from "react";
import { PokemonSpeciesInterface } from "./interface";

// Interface for context
interface SpeciesContextInterface {
    pokemonSpecies: PokemonSpeciesInterface | null;
    setPokemonSpecies: (pokemon: PokemonSpeciesInterface | null) => void;
}
export const PokemonSpeciesContext = createContext<SpeciesContextInterface | undefined>(undefined);