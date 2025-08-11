import { createContext } from "react";
import { PokemonsListArray } from "./interface";

// Interface for context
interface SearchedPokemonsContext {
    searchedPokemons: PokemonsListArray | null;
    setSearchedPokemons: (pokemon: PokemonsListArray | null) => void;
}
export const SearchedPokemonsContext = createContext<SearchedPokemonsContext | undefined>(undefined);