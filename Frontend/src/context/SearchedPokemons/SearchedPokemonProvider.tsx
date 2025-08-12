import { ReactNode, useState } from "react";
import { PokemonsListArray } from "./interface";
import { SearchedPokemonsContext } from "./SearchedPokemonContext";

// Provider for SearchedPokemonsContext
export const SearchedPokemonsProvider = ({children}: {children: ReactNode}) => {
    // state for pageNumber
    const [pageIndex, setPageIndex] = useState<number>(0); 
    // State for searchedPokemons
    const [searchedPokemons, setSearchedPokemons] = useState<PokemonsListArray | null>(null)
    return(
        <SearchedPokemonsContext.Provider value={{pageIndex, setPageIndex, searchedPokemons, setSearchedPokemons}}>{ children }</SearchedPokemonsContext.Provider>
    )
}