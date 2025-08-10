import { useContext } from "react"
import { PokemonsListContext } from "./PokemonsListContext"

export const usePokemonsList = () => {
    const context = useContext(PokemonsListContext);
    if(!context) throw new Error("usePokemonsList must be used within PokemonsListProvider");
    return context;
}