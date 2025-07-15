import { usePokemon } from "../../../../context/PokemonContext/usePokemon";

// 1. Mapping types to Tailwind BG colors
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

// The component for physical info pokemons
const PhysicalInfo = () => {
  // getting clickedPokemon data from usePokemon
  const { clickedPokemon } = usePokemon();
  return (
    // The container containing physical info of pokemons
    <div className="flex flex-col md:flex-row gap-5 md:gap-20 justify-center items-center">
      {/* The div containing text info */}
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="font-bold text-3xl md:text-4xl xl:text-5xl capitalize tracking-wide">
          {clickedPokemon?.name}
        </h1>
        {/* The div containing types of pokemons */}
        <div className="flex flex-row gap-4 mx-4 my-2">
          {clickedPokemon?.types.map((t) => {
            const bgColor = typeColors[t] || "bg-gray-300";
            return (
              <div
                className={`${bgColor} py-1 px-4 rounded-xl capitalize text-white font-bold text-[15px] md:text-[17px] xl:text-[19px]`}
                key={t}
              >
                <label>{t}</label>
              </div>
            );
          })}
        </div>
        {/* The div containing height adn weight */}
        <div className="flex flex-row justify-between items-center gap-13">
          {/* The div containing the height */}
          <div className="flex flex-col">
            <p className="font-bold text-[19px] xl:text-[22px]">
              {clickedPokemon ? (clickedPokemon.height / 10).toFixed(1) : "--"}{" "}
              m
            </p>
            <p className="xl:text-[17px]">Lenght</p>
          </div>
          {/* The div containing the height */}
          <div className="flex flex-col">
            <p className="font-bold text-[19px] xl:text-[22px]">
              {clickedPokemon ? (clickedPokemon.weight / 10).toFixed(1) : "--"}{" "}
              kg
            </p>
            <p className="xl:text-[17px]">Weight</p>
          </div>
        </div>
      </div>
      {/* The div containing the img of the pokemon */}
      <div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${clickedPokemon?.id}.png`}
          className="h-[10rem] md:h-[14rem] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
        ></img>
      </div>
    </div>
  );
};
// Exporting
export default PhysicalInfo;
