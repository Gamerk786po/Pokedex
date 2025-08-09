import { useEffectiveness } from "../../../../../context/EffectivenessContext/useEffectiveness";

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

const TypeEffectiveness = () => {
  const { pokemonEffectiveness } = useEffectiveness();

  return (
    <>
    {/* Main heading */}
    <h2 className="font-bold text-xl ml-8 my-1 md:my-5">Damage Taken</h2>
    <div className="mx-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-4">
      {Object.entries(pokemonEffectiveness ?? {}).map(([type, multiplier]) => (
        <div
          key={type}
          className={`${typeColors[type] || "bg-gray-300"} py-1 text-center rounded-xl capitalize text-white font-bold text-[15px]
                transition-transform duration-300 ease-in-out lg:hover:scale-105`}
        >
          <span className="px-1">{type}</span>
          <span className="px-1">
            {multiplier}x
          </span>
        </div>
      ))}
    </div>
    </>
  );
};

export default TypeEffectiveness;