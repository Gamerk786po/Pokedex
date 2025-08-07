import { ReactNode, useState } from "react";
import { Effectiveness } from "./interface";
import { PokemonEffectivenessContext } from "./EffectivenessContext";


// Provider for species
export const PokemonEffectivenessProvider = ({children} : {children: ReactNode}) => {
    // States
    const [pokemonEffectiveness, setPokemonEffectiveness] = useState<Effectiveness | null>(null);
    // Returning
    return(
        <PokemonEffectivenessContext.Provider value={{pokemonEffectiveness, setPokemonEffectiveness}}> {children}</PokemonEffectivenessContext.Provider>
    )}