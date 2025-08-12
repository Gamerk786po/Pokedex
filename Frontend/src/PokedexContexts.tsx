import { ReactNode } from "react";
import { PokemonEffectivenessProvider } from "./context/EffectivenessContext/EffectivnessProvider";
import { PokemonEvolutionsProvider } from "./context/EvolutionsContext/EvolutionsProvider";
import { PokemonProvider } from "./context/PokemonContext/PokemonProvider";
import { PokemonsListProvider } from "./context/PokemonsListContext/PokemonsListProvider";
import { PokemonSpeciesProvider } from "./context/SpeciesContext/SpeciesProvider";
import { SearchedPokemonsProvider } from "./context/SearchedPokemons/SearchedPokemonProvider";

export const PokedexContexts: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <PokemonsListProvider>
      <SearchedPokemonsProvider>
        <PokemonProvider>
          <PokemonEffectivenessProvider>
            <PokemonSpeciesProvider>
              <PokemonEvolutionsProvider>{children}</PokemonEvolutionsProvider>
            </PokemonSpeciesProvider>
          </PokemonEffectivenessProvider>
        </PokemonProvider>
      </SearchedPokemonsProvider>
    </PokemonsListProvider>
  );
};
