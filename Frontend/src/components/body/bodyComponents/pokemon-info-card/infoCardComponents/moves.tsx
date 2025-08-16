import { usePokemon } from "../../../../../context/PokemonContext/usePokemon";
import Move from "./move";
// Component for Moves
const MovesSection = () => {
  // Getting the data of clicked pokemon
  const { clickedPokemon } = usePokemon();
  // Separating of the learning methods of moves

  // Leveling moves
  const levelingMoves = clickedPokemon?.moves
    .filter((move) => move.move_learn_method === "level-up")
    .sort((a, b) => a.level_learned_at - b.level_learned_at);

  // Machine moves
  const machineMoves = clickedPokemon?.moves.filter(
    (move) => move.move_learn_method === "machine"
  );

  // Tutor moves
  const tutorMoves = clickedPokemon?.moves.filter(
    (move) => move.move_learn_method === "tutor"
  );

  // Egg moves
  const eggMoves = clickedPokemon?.moves.filter(
    (move) => move.move_learn_method === "egg"
  );
  return (
    <>
      <h2 className="font-bold text-xl 2xl:text-3xl ml-8 my-1 md:my-5">Moves</h2>
      {/* Container for all the Moves */}
      <div className="flex flex-col mx-5">
        {/* Level up moves */}
        {Array.isArray(levelingMoves) && levelingMoves.length > 0 && (
          <>
            <h3 className="font-medium 2xl:text-2xl text-center mb-5">Level-up Moves</h3>
            {levelingMoves?.map((move) => {
              return (
                <Move
                  key={move.move.name}
                  name={move.move.name}
                  url={move.move.url}
                  learned_at_level={move.level_learned_at}
                  method={move.move_learn_method}
                />
              );
            })}
          </>
        )}
        {/* Machine moves */}
        {Array.isArray(machineMoves) && machineMoves.length > 0 && (
          <>
            <h3 className="font-medium 2xl:text-2xl text-center mb-5 mt-5">Machine moves</h3>
            {machineMoves?.map((move) => {
              return (
                <Move
                  key={move.move.name}
                  name={move.move.name}
                  url={move.move.url}
                  learned_at_level={move.level_learned_at}
                  method={move.move_learn_method}
                />
              );
            })}
          </>
        )}
        {/* Tutor moves */}
        {Array.isArray(tutorMoves) && tutorMoves.length > 0 && (
          <>
            <h3 className="font-medium 2xl:text-2xl text-center mb-5 mt-5">Tutor moves</h3>
            {tutorMoves?.map((move) => {
              return (
                <Move
                  key={move.move.name}
                  name={move.move.name}
                  url={move.move.url}
                  learned_at_level={move.level_learned_at}
                  method={move.move_learn_method}
                />
              );
            })}
          </>
        )}
        {/* Egg moves */}
        {Array.isArray(eggMoves) && eggMoves?.length > 0 && (
          <>
            <h3 className="font-medium 2xl:text-2xl text-center mb-5 mt-5">Egg</h3>
            {eggMoves?.map((move) => {
              return (
                <Move
                  key={move.move.name}
                  name={move.move.name}
                  url={move.move.url}
                  learned_at_level={move.level_learned_at}
                  method={move.move_learn_method}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default MovesSection;
