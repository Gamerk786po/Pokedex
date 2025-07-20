import { useContext } from "react"
import { PokemonEvolutionsContext } from "./PokemonEvolutionsContext"

export const useEvolutions = () => {
    const context = useContext(PokemonEvolutionsContext);
    if (!context) throw new Error("useEvolutions must be used within EvolutionsProvider")
    return context;
}