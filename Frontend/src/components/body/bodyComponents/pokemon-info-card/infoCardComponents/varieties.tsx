import { useSpecies } from "../../../../../context/SpeciesContext/useSpecies";
import { motion } from "framer-motion";
import { useState } from "react";
// Component for Varieties of Pokemons
const Varieties = () => {
  const { pokemonSpecies } = useSpecies();
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <>
    <h2 className="font-bold text-xl ml-8 my-1 md:my-5">Alternate Forms</h2>
    {/* Container for all alternate form */}
    <div className="flex flex-wrap justify-center items-center mx-5 gap-8">
      {pokemonSpecies?.varieties.map((variety) => {
        const id = variety.url.split("/")[6];
        return (
          // Container for each Variety
          <div key={id} id={id} className="flex flex-col items-center justify-center">
            <motion.img
              key={id}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt={variety.name}
              onLoad={() => setImgLoaded(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: imgLoaded ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-[7rem] object-contain drop-shadow-xl rounded-xl drop-sha transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer"
            />
            {!imgLoaded && (
              <div className="h-[8rem] w-[8rem] rounded-xl bg-gray-200 animate-pulse absolute"></div>
            )}
            <p className="font-medium mt-2 capitalize">{variety.name}</p>
          </div>
        );
      })}
    </div>
    </>
  );
};
// Exporting the Component
export default Varieties;
