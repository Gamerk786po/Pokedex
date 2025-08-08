import { createContext } from "react";
import { EffectivenessInterface } from "./interface";


// Interface for context
interface EffectivenessContextInterface {
    pokemonEffectiveness: EffectivenessInterface | null;
    setPokemonEffectiveness: (pokemon: EffectivenessInterface | null) => void;
}
export const PokemonEffectivenessContext = createContext<EffectivenessContextInterface | undefined>(undefined);