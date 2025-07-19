import { ReactNode, useState } from "react";
import { PokemonSpeciesInterface } from "./interface";
import { PokemonSpeciesContext } from "./SpeciesContext";

// Provider for species
export const PokemonSpeciesProvider = ({children} : {children: ReactNode}) => {
    // States
    const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpeciesInterface | null>(null);
    // Returning
    return(
        <PokemonSpeciesContext.Provider value={{pokemonSpecies, setPokemonSpecies}}>{children}</PokemonSpeciesContext.Provider>
    )
}