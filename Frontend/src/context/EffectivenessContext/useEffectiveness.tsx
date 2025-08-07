import { useContext } from "react"
import { PokemonEffectivenessContext } from "./EffectivenessContext";

export const useEvolutions = () => {
    const context = useContext(PokemonEffectivenessContext);
    if (!context) throw new Error("useEvolutions must be used within EvolutionsProvider")
    return context;
}