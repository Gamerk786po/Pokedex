import { useContext } from "react"
import { PokemonSpeciesContext } from "./SpeciesContext"

export const useSpecies = () => {
    const context = useContext(PokemonSpeciesContext);
    if (!context) throw new Error("useSpecies must be used within SpeciesProvider")
    return context;
}