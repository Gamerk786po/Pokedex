import { createContext } from "react";
import { Effectiveness } from "./interface";


// Interface for context
interface EffectivenessContextInterface {
    pokemonEffectiveness: Effectiveness | null;
    setPokemonEffectiveness: (pokemon: Effectiveness | null) => void;
}
export const PokemonEffectivenessContext = createContext<EffectivenessContextInterface | undefined>(undefined);