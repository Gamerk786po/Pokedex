import { useContext } from "react"
import { PokemonSpeciesContext } from "./SpeciesContext"

export const useSpecies = () => {
    const context = useContext(PokemonSpeciesContext);
    if (!context) throw new Error("usePokemon must be used within SpeciesProvider")
    return context;
}