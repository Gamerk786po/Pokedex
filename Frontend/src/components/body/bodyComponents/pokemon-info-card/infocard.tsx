import { motion } from "framer-motion"; // for using framer motion
import { lazy, Suspense } from "react";
import Stats from "./infoCardComponents/stats";
import Abilities from "./infoCardComponents/abilities";
import EvolutionSection from "./infoCardComponents/evolutionsSection";
import Varieties from "./infoCardComponents/varieties";
import MovesSection from "./infoCardComponents/moves";

const PhysicalInfo = lazy(() => import("./infoCardComponents/physicalInfo"));

// The component for info card about pokemons.
const InfoCard = () => {
  return (
    // The div containing the card
    <motion.div className="overflow-hidden bg-white shadow-md w-[25rem] md:w-[37rem] rounded-xl mx-0">
      {/* Thee div containing all the info */}
      <div className="my-10 flex flex-col">
        <Suspense fallback="">
          <PhysicalInfo />
          <Stats />
          <Abilities />
          <EvolutionSection />
          <Varieties />
          <MovesSection />
        </Suspense>
      </div>
    </motion.div>
  );
};
// Exporting the component.
export default InfoCard;
