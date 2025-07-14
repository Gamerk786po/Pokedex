import { useState, ReactNode } from "react";
import { PokemonContext } from "./PokemonContext";
import { ClickedPokemonInterface } from "./Interfaces";


// Provider for the Pokemon Context
export const PokemonProvider = ({children} : {children: ReactNode}) => {
    // The state for Pokemon
    const [clickedPokemon, setClickedPokemon] = useState<ClickedPokemonInterface | null>(null)
    // Returning the context
    return(
        <PokemonContext.Provider value={{clickedPokemon, setClickedPokemon}}>
            {children}
        </PokemonContext.Provider>
    ) 
}
