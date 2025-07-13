import { createContext } from "react";
import { ClickedPokemonInterface } from "./Interfaces";
// Interface for Pokemon Context
interface PokemonContextInterface{
    clickedPokemon: ClickedPokemonInterface | null;
    setClickedPokemon: (pokemon: ClickedPokemonInterface | null) => void;
}

// Interface for Pokemon Context
interface PokemonContextInterface{
    clickedPokemon: ClickedPokemonInterface | null;
    setClickedPokemon: (pokemon: ClickedPokemonInterface | null) => void;
}

// Ceating the PokemonContext
export const PokemonContext = createContext<PokemonContextInterface | undefined>(undefined)
