import { useContext } from "react"
import { SearchedPokemonsContext } from "./SearchedPokemonContext"

export const useSearchedPokemons = () => {
    const context = useContext(SearchedPokemonsContext);
    if (!context) throw new Error("useSearchedPokemons must be used within SearchedPokemonsProvider")
}