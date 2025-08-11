import { ReactNode, useState } from "react";
import { PokemonsListArray } from "./interface";
import { SearchedPokemonsContext } from "./SearchedPokemonContext";

// Provider for SearchedPokemonsContext
export const SearchedPokemonsProvider = ({children}: {children: ReactNode}) => {
    // States
    const [searchedPokemons, setSearchedPokemons] = useState<PokemonsListArray | null>(null)
    return(
        <SearchedPokemonsContext.Provider value={{searchedPokemons, setSearchedPokemons}}>{ children }</SearchedPokemonsContext.Provider>
    )
}