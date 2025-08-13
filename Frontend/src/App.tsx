import Body from "./components/body/body";
import Header from "./components/header/header";
import { PokedexContexts } from "./PokedexContexts";

function App() {
  return (
    <>
      {/* The main div containing everything */}
      <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400">
        <PokedexContexts>
          <Header />
          <Body />
        </PokedexContexts>
      </div>
    </>
  );
}

export default App;
