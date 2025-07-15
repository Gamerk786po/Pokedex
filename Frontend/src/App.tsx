import Body from "./components/body/body";
import Header from "./components/header/header";
import { PokemonProvider } from "./context/PokemonContext/PokemonProvider";

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
          <Body />
        </PokemonProvider>
      </div>
    </>
  );
}

export default App;
