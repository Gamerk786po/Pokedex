import { useEvolutions } from "../../../../../context/EvolutionsContext/useEvolutions";
import { PokemonEvolutionsInterface } from "../../../body";
import Evolution from "./evolution";

const renderEvolutions = (evolution: PokemonEvolutionsInterface | null) => {
  if (!evolution) return null;

  const currentId = Number(evolution.url.split("/")[6]);

  return (
    <div className="flex flex-col md:flex-row items-center my-4">
      {/* Current Evolution */}
      <Evolution
        key={currentId}
        name={evolution.name}
        id={currentId}
        evoDetails={evolution.evo_details}
      />

      {/* Next Evolutions - show branches in a col */}
      {evolution.evolves_to.length > 0 && (
        <div className="flex flex-row md:flex-col gap-6 flex-wrap justify-center">
          {evolution.evolves_to.map((nextEvo, index) => (
            <div key={index}>{renderEvolutions(nextEvo)}</div>
          ))}
        </div>
      )}
    </div>
  );
};

// Component for Sections
const EvolutionSection = () => {
  const { pokemonEvolutions } = useEvolutions();
  return (
    <>
      <div className="flex flex-row gap-5 mt-6 mx-10 justify-center items-center">
        {renderEvolutions(pokemonEvolutions)}
      </div>
    </>
  );
};

export default EvolutionSection;
