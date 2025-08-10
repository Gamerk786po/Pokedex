import { ReactNode, useState } from "react";
import { PokemonsListContext } from "./PokemonsListContext";
import { PokemonsListInterface } from "./interface";

export const PokemonsListProvider = ({children} : {children: ReactNode}) => {
    // State for PokemonsList
    const [pokemonsList, setPokemonsList] = useState<PokemonsListInterface[] | null>(null);
    return(
        <PokemonsListContext.Provider value={{pokemonsList, setPokemonsList}}>{children}</PokemonsListContext.Provider>
    )
}