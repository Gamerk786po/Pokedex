import { ReactNode, useState } from "react";
import { PokemonEvolutionsInterface } from "./interface";
import { PokemonEvolutionsContext } from "./PokemonEvolutionsContext";

// Provider for species
export const PokemonEvolutionsProvider = ({children} : {children: ReactNode}) => {
    // States
    const [pokemonEvolutions, setPokemonEvolutions] = useState<PokemonEvolutionsInterface | null>(null);
    // Returning
    return(
        <PokemonEvolutionsContext.Provider value={{pokemonEvolutions, setPokemonEvolutions}}>{children}</PokemonEvolutionsContext.Provider>
    )
}