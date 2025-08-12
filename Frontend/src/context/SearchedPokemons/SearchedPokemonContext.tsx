import { createContext } from "react";
import { PokemonsListArray } from "./interface";

// Interface for context
interface SearchedPokemonsContext {
    pageIndex: number;
    setPageIndex: React.Dispatch<React.SetStateAction<number>>;
    searchedPokemons: PokemonsListArray | null;
    setSearchedPokemons: (pokemon: PokemonsListArray | null) => void;
}
export const SearchedPokemonsContext = createContext<SearchedPokemonsContext | undefined>(undefined);