import { createContext } from "react";
import { PokemonsListInterface } from "./interface";

// Interface for PokemonsListContext
interface PokemonsListContextInterface {
    pokemonsList: PokemonsListInterface[] | null;
    setPokemonsList: (pokemon: PokemonsListInterface[] | null) => void;
}
export const PokemonsListContext = createContext<PokemonsListContextInterface | undefined>(undefined);