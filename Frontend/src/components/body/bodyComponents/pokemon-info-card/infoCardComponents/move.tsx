import { useState } from "react";
import { motion } from "framer-motion"; // for using framer motion

// Props for Move component
interface MoveProps {
  name: string;
  url: string;
  learned_at_level: number;
  method: string;
}

// Reuseable component for moves
const Move: React.FC<MoveProps> = ({ name, url, learned_at_level, method }) => {
  // State for detail On or off
  const [isdetail, setIsDetail] = useState(false);
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
  <button className="text-center text-blue-500 lg:hover:cursor-pointer" onClick={() => setIsDetail((prev) => !prev)}>Details</button>
  {isdetail &&
  // Container for details of the move
  <motion.div
  className="absolute" 
  >
    <p>HEllo</p>

  </motion.div>
  }
</div>
  );
};
// Exporting the component
export default Move;
