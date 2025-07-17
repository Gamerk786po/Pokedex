import { motion } from "framer-motion"; // for using framer motion
import { lazy, Suspense } from "react";
import Stats from "./infoCardComponents/stats";
import Abilities from "./infoCardComponents/abilities";
const PhysicalInfo = lazy(() => import("./infoCardComponents/physicalInfo"));

// The component for info card about pokemons.
const InfoCard = () => {
  return (
    // The div containing the card
    <motion.div className="overflow-hidden bg-white shadow-md w-[25rem] md:w-[37rem] h-[80rem] rounded-xl mx-0">
      {/* THe div containing all the info */}
      <div className="my-10 flex flex-col">
        <Suspense fallback="">
          <PhysicalInfo />
          <Stats />
          <Abilities />
        </Suspense>
      </div>
    </motion.div>
  );
};
// Exporting the component.
export default InfoCard;
