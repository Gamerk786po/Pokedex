import { motion } from "framer-motion";
import { lazy, Suspense, useState, useEffect } from "react";
import Stats from "./infoCardComponents/stats";
import Abilities from "./infoCardComponents/abilities";
import EvolutionSection from "./infoCardComponents/evolutionsSection";
import Varieties from "./infoCardComponents/varieties";
import MovesSection from "./infoCardComponents/moves";
import TypeEffectiveness from "./infoCardComponents/typeEffectiveness";

const PhysicalInfo = lazy(() => import("./infoCardComponents/physicalInfo"));

interface InfoCardProps {
  onClose: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ onClose }) => {
  const [isReady, setIsReady] = useState(false);

  // Trigger when all children have been rendered
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 0); // next tick, after Suspense resolves
    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={null}>
      {isReady && (
        <motion.div
          initial={{scale: 0.8 }}
          animate={{scale: 1 }}
          exit={{scale: 0.8 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden bg-white shadow-md w-[25rem] md:w-[37rem] rounded-xl mx-0"
        >
          <button
            onClick={onClose}
            className="self-end m-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 lg:hover:cursor-pointer w-[4rem] shadow-black shadow-2xl"
          >
            ✖
          </button>

          <div className="my-10 flex flex-col">
            <PhysicalInfo />
            <Stats />
            <Abilities />
            <EvolutionSection />
            <Varieties />
            <TypeEffectiveness />
            <MovesSection />
          </div>
        </motion.div>
      )}
    </Suspense>
  );
};

export default InfoCard;