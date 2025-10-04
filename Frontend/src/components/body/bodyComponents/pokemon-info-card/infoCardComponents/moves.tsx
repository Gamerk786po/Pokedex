import { useState } from "react";
import { usePokemon } from "../../../../../context/PokemonContext/usePokemon";
import Move, { MoveProps } from "./move";
import { motion, AnimatePresence } from "framer-motion";

// Interface for MoveCategoryProps
interface MoveCategoryProps {
  title: string;
  moves: MoveProps[] | undefined;
}

// Interface for orignal raw structure of moves
interface RawMoveInterface {
  move: {
    name: string;
    url: string;
  };
  level_learned_at: number;
  move_learn_method: string;
}

// Fuction for formating moves in to format of MoveProps
function formatMoves(rawMoves: RawMoveInterface[] = []): MoveProps[] {
  return rawMoves.map((m) => ({
    name: m.move.name,
    url: m.move.url,
    learned_at_level: m.level_learned_at ?? 0,
    method: m.move_learn_method,
  }));
}

// MoveCategory containing each move setion
const MoveCategory: React.FC<MoveCategoryProps> = ({ title, moves }) => {
  // State for storing value of open
  const [open, setOpen] = useState<boolean>(false);

  if (!moves || moves.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-3 rounded-lg font-medium hover:bg-gray-300 hover:cursor-pointer transition-all ease-in-out"
      >
        <span>{title}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="mt-2 space-y-2 overflow-hidden"
          >
            {moves.map((move) => (
              <Move
                key={move.name}
                name={move.name}
                url={move.url}
                learned_at_level={move.learned_at_level}
                method={move.method}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Component for Moves
const MovesSection = () => {
  // Getting the data of clicked pokemon
  const { clickedPokemon } = usePokemon();
  // Separating of the learning methods of moves

  // Leveling moves
  const levelingMoves = formatMoves(
    clickedPokemon?.moves
      .filter((move) => move.move_learn_method === "level-up")
      .sort((a, b) => a.level_learned_at - b.level_learned_at)
  );

  // Machine moves
  const machineMoves = formatMoves(
    clickedPokemon?.moves.filter((move) => move.move_learn_method === "machine")
  );

  // Tutor moves
  const tutorMoves = formatMoves(
    clickedPokemon?.moves.filter((move) => move.move_learn_method === "tutor")
  );

  // Egg moves
  const eggMoves = formatMoves(
    clickedPokemon?.moves.filter((move) => move.move_learn_method === "egg")
  );
  return (
    <div className="mx-5">
      <h2 className="font-bold text-xl 2xl:text-3xl ml-3 my-4">Moves</h2>
      <MoveCategory title="Level-up Moves" moves={levelingMoves} />
      <MoveCategory title="Machine Moves" moves={machineMoves} />
      <MoveCategory title="Tutor Moves" moves={tutorMoves} />
      <MoveCategory title="Egg Moves" moves={eggMoves} />
    </div>
  );
};

export default MovesSection;
