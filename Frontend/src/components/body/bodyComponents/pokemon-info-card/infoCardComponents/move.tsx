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

// Mapping Pokémon types to Tailwind background colors
const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400 text-black",
  ice: "bg-blue-200 text-black",
  fighting: "bg-red-700",
  poison: "bg-purple-600",
  ground: "bg-yellow-700",
  flying: "bg-sky-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-800",
  ghost: "bg-indigo-700",
  dark: "bg-gray-800",
  dragon: "bg-indigo-600",
  steel: "bg-gray-500",
  fairy: "bg-pink-300 text-black",
};

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
    try {
      const res = await fetch(url);
  
      if (!res.ok) {
        throw new Error(`Failed to fetch move details: ${res.status}`);
      }
  
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
    } catch (err) {
      console.error("Failed to fetch move details:", err);
    }
  };
  

  // useEffect when isDetail is changed
  useEffect(() => {
    if (isDetail == true) {
      getMoveDetails();
    } else {
      setIsFetched(false);
    }
  }, [isDetail]);

  const type = detail?.type ?? "";
  const typeClass = typeColors[type] || "bg-gray-300";

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
      {isDetail && detail && isFetched && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="col-span-2 sm:col-span-4 bg-gray-200 rounded-lg p-4 mt-2 shadow-md justify-center"
        >
          {/* Container for Accuracy, power and pp */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-4 sm:gap-10 text-center">
            <p className="sm:basis-1/4">
              <span className="font-medium">Accuracy:</span>{" "}
              {detail.accuracy ?? "N/A"}
            </p>
            <p className="sm:basis-1/4">
              <span className="font-medium">Power:</span>{" "}
              {detail.power ?? "N/A"}
            </p>
            <p className="sm:basis-1/4">
              <span className="font-medium">PP:</span> {detail.pp}
            </p>
          </div>
          {/* Effect of the move */}
          <div className="flex justify-center mt-4">
            <p className="text-center">{detail.effect}</p>
          </div>
          {/* Stat changes */}
          {detail.stat_changes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-center">
                📊 Stat Changes
              </h3>
              <ul className="space-y-2">
                {detail.stat_changes.map((statChange, index) => (
                  <li
                    key={index}
                    className={`flex justify-between px-4 py-2 rounded-lg shadow ${
                      statChange.change > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <span className="capitalize">{statChange.name}</span>
                    <span>
                      {statChange.change > 0 ? "+" : ""}
                      {statChange.change}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
         {/* Typing */}
          <div className="flex justify-center mt-6">
            <span
              className={`px-4 py-1 rounded-full font-semibold capitalize shadow ${typeClass}`}
            >
              {type}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
// Exporting the component
export default Move;
