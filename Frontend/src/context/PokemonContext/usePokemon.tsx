import { useContext } from "react";
import { PokemonContext } from "./PokemonContext";

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) throw new Error("usePokemon must be used within PokemonProvider");
  return context;
};