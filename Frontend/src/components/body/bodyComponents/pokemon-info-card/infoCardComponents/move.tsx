import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // for using framer motion

// Props for Move component
interface MoveProps {
  name: string;
  url: string;
  learned_at_level: number;
  method: string;
}

// Interface for detail about moves
interface MoveDetail {
  effect: string;
  accuracy: number | null;
  power: number | null;
  pp: number;
  stat_changes:
    | {
        change: number;
        name: string;
      }[]
    | [];
  type: string;
}

// interface for stat_change
interface StatChange {
  change: number;
  stat: {
    name: string;
    url: string;
  };
}

// interface for Entries
interface EffectEntries {
  effect: string;
  language: {
    name: string;
    url: string;
  };
  short_effect: string;
}

// Reuseable component for moves
const Move: React.FC<MoveProps> = ({ name, url, learned_at_level, method }) => {
  // State for detail On or off
  const [isDetail, setIsDetail] = useState<boolean>(false);
  // State for storing the detail about pokemons
  const [detail, setDetail] = useState<MoveDetail | null>(null);
  // State for if data has been fetched
  const [isFetched, setIsFetched] = useState<boolean>(false);

  // Geting details for moves on click
  const getMoveDetails = async () => {
    const res = await fetch(url);
    const data = await res.json();
    const formatedData = {
      effect:
        (data.effect_entries as EffectEntries[]).find(
          (entry) => entry.language.name === "en"
        )?.effect ?? "No effect found",
      accuracy: data?.accuracy ?? null,
      power: data?.power ?? null,
      pp: data.pp,
      stat_changes: (data.stat_changes as StatChange[]).map((stat_change) => ({
        change: stat_change.change,
        name: stat_change.stat.name,
      })),
      type: data.type.name,
    };
    setDetail(formatedData);
    setIsFetched(true);
  };

  // useEffect when isDetail is changed
  useEffect(() => {
    if (isDetail == true) {
      getMoveDetails();
    } else {
      setIsFetched(false);
    }
  }, [isDetail]);
  return (
    // Container for each move
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 px-4 py-3 border-b relative">
      {/* Name of Move */}
      <p className="text-center capitalize">{name}</p>
      {/* Learned at level */}
      <p className="text-center">{learned_at_level} Lv</p>
      {/* Method for learning */}
      <p className="text-center capitalize">{method}</p>
      {/* Detail button */}
      <button
        className="text-center text-blue-500 lg:hover:cursor-pointer"
        onClick={() => setIsDetail((prev) => !prev)}
      >
        Details
      </button>
      {isDetail && (
        // Container for details of the move
        <motion.div className="absolute">
          <p>HEllo</p>
        </motion.div>
      )}
    </div>
  );
};
// Exporting the component
export default Move;
