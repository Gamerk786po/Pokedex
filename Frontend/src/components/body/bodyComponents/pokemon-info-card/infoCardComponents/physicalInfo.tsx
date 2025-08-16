import { useEffect, useState } from "react";
import { usePokemon } from "../../../../../context/PokemonContext/usePokemon";
import { motion } from "framer-motion";
import { useSpecies } from "../../../../../context/SpeciesContext/useSpecies";

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

const PhysicalInfo = () => {
  const { clickedPokemon } = usePokemon();
  const { pokemonSpecies } = useSpecies();
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (!clickedPokemon?.id) return;
    setImgLoaded(false); // reset state

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${clickedPokemon.id}.png`;
    img.onload = () => setImgLoaded(true);
  }, [clickedPokemon]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-5 md:gap-15 justify-center 2xl:justify-evenly items-center">
        {/* Info block */}
        <motion.div
          className="flex flex-col justify-center items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={clickedPokemon?.id}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-bold font-pokemon text-3xl md:text-4xl 2xl:text-5xl capitalize tracking-wide">
            {clickedPokemon?.name}
          </h1>

          {/* Types */}
          <div className="flex flex-row gap-4 mx-4 my-2">
            {clickedPokemon?.types.map((t) => {
              const bgColor = typeColors[t] || "bg-gray-300";
              return (
                <div
                  className={`${bgColor} py-1 px-4 2xl:py-2 2xl:px-5 rounded-xl capitalize text-white font-bold text-[15px] md:text-[17px] xl:text-[19px] 2xl:text-[22px]
                transition-transform duration-300 ease-in-out lg:hover:scale-105`}
                  key={t}
                >
                  <label>{t}</label>
                </div>
              );
            })}
          </div>

          {/* The container for height and weight */}
          {/* Height */}
          <div className="flex flex-row justify-between items-center gap-13">
            <div className="flex flex-col">
              <p className="font-bold text-[19px] xl:text-[22px] 2xl:text-[25px]">
                {clickedPokemon
                  ? (clickedPokemon.height / 10).toFixed(1)
                  : "--"}{" "}
                m
              </p>
              <p className="xl:text-[17px] 2xl:text-[21px]">Length</p>
            </div>
            {/* Weight */}
            <div className="flex flex-col">
              <p className="font-bold text-[19px] xl:text-[22px] 2xl:text-[25px]">
                {clickedPokemon
                  ? (clickedPokemon.weight / 10).toFixed(1)
                  : "--"}{" "}
                kg
              </p>
              <p className="xl:text-[17px] 2xl:text-[21px]">Weight</p>
            </div>
          </div>

          {/* The container for egg groups */}
          <div className="flex flex-row justify-between items-center gap-13">
            {pokemonSpecies?.egg_groups.map((egg_group) => (
              <div className="flex flex-col" key={egg_group.name}>
                <p className="font-bold text-[19px] xl:text-[22px] capitalize 2xl:text-[25px]">
                  {egg_group.name}
                </p>
                <p className="xl:text-[17px] 2xl:text-[21px]">Group</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pokémon image */}
        <div className="relative h-[224px] w-[224px] md:h-[14rem] lg:h-[16rem] lg:w-[16rem] 2xl:h-[20rem] 2xl:w-[22rem]">
          {/* Placeholder while loading */}
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl z-10" />
          )}

          <motion.img
            key={clickedPokemon?.id}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${clickedPokemon?.id}.png`}
            alt={clickedPokemon?.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: imgLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full w-full object-contain drop-shadow-xl/50 rounded-xl
          transition-transform duration-500 ease-in-out lg:hover:scale-105 hover:cursor-pointer"
          />
        </div>
      </div>
      {/* Pokedex entry flavour text  */}
      <div className="flex flex-col mx-12 mt-5 justify-center">
        <p className="leading-relaxed text-center 2xl:text-2xl">{pokemonSpecies?.flavor_text}</p>
      </div>
    </>
  );
};

export default PhysicalInfo;
