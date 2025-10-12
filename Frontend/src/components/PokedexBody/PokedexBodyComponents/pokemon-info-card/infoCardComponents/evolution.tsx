import { motion } from "framer-motion";
import { useState } from "react";
import { EvolutionDetails } from "../../../PokedexBodyInterface";

// Props for each evolution
interface EvolutionProps {
  id: number | undefined;
  name: string | undefined;
  evoDetails: EvolutionDetails | undefined;
}
// The reuseable component for each evolution
const Evolution: React.FC<EvolutionProps> = ({ id, name, evoDetails }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <>
      {evoDetails && (
        <div className="text-xs 2xl:text-2xl text-gray-600 mt-1 text-center max-w-[8rem]">
          {evoDetails.trigger === "level-up" && evoDetails.min_level
            ? `Evolves at level ${evoDetails.min_level} ${
                evoDetails.held_item
                  ? `while holding ${evoDetails.held_item}`
                  : ""
              }`
            : evoDetails.trigger === "use-item" && evoDetails.item
            ? `Use item: ${evoDetails.item}`
            : evoDetails.trigger === "trade"
            ? `Evolves by trading ${
                evoDetails.held_item
                  ? `while holding ${evoDetails.held_item}`
                  : ""
              }`
            : evoDetails.min_happiness
            ? "Evolves by happiness"
            : evoDetails.held_item
            ? `While holding ${evoDetails.held_item}`
            : evoDetails.trigger
            ? `Trigger: ${evoDetails.trigger}`
            : ""}
        </div>
      )}
      <div className="flex flex-col justify-center items-center">
        <motion.img
          key={id}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt={name}
          onLoad={() => setImgLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: imgLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-[5rem] md:h-[7rem] 2xl:h-[11rem] object-contain drop-shadow-xl rounded-xl drop-sha transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer"
        />
        {!imgLoaded && (
          <div className="h-[8rem] w-[8rem] 2xl:h-[11rem] 2xl:w-[11rem] rounded-xl bg-gray-200 animate-pulse absolute"></div>
        )}
        <p className="font-medium mt-2 capitalize 2xl:text-xl">{name}</p>
      </div>
    </>
  );
};
export default Evolution;
