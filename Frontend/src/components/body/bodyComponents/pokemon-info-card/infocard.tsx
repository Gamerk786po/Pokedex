import { motion } from "framer-motion"; // for using framer motion
import PhysicalInfo from "./infoCardComponents/physicalInfo";

// The component for info card about pokemons.
const InfoCard = () => {
  return (
    // The div containing the card
    <motion.div className="bg-white shadow-md w-[25rem] md:w-[37rem] h-[60rem] rounded-xl">
        {/* THe div containing all the info */}
        <div className="my-10 flex flex-col">
            <PhysicalInfo />
        </div>
        
    </motion.div>
  );
};
// Exporting the component.
export default InfoCard;
