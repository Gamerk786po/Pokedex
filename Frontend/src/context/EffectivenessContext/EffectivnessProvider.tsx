import { ReactNode, useState } from "react";
import { EffectivenessInterface } from "./interface";
import { PokemonEffectivenessContext } from "./EffectivenessContext";


// Provider for species
export const PokemonEffectivenessProvider = ({children} : {children: ReactNode}) => {
    // States
    const [pokemonEffectiveness, setPokemonEffectiveness] = useState<EffectivenessInterface | null>(null);
    // Returning
    return(
        <PokemonEffectivenessContext.Provider value={{pokemonEffectiveness, setPokemonEffectiveness}}> {children}</PokemonEffectivenessContext.Provider>
    )}