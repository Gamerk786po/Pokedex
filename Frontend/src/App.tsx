import Body from "./components/body/body";
import Header from "./components/header/header";
import { PokemonEffectivenessProvider } from "./context/EffectivenessContext/EffectivnessProvider";
import { PokemonEvolutionsProvider } from "./context/EvolutionsContext/EvolutionsProvider";
import { PokemonProvider } from "./context/PokemonContext/PokemonProvider";
import { PokemonSpeciesProvider } from "./context/SpeciesContext/SpeciesProvider";

function App() {
  return (
    <>
      {/* The main div containing everything */}
      <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400">
        <Header />
        {/*
         The Pokemon Provider for Pokemon state 
        for storing the info of particular
         clicked pokemons
          */}
        <PokemonProvider>
          <PokemonEffectivenessProvider>
            <PokemonSpeciesProvider>
              <PokemonEvolutionsProvider>
                <Body />
              </PokemonEvolutionsProvider>
            </PokemonSpeciesProvider>
          </PokemonEffectivenessProvider>
        </PokemonProvider>
      </div>
    </>
  );
}

export default App;
