import React from "react";
import { motion } from "framer-motion"; // for using framer motion

// Props for ErrorScreen
interface ErrorScreenProps{
    error: string;
}
// The component for ErrorScreen
const ErrorScreen: React.FC<ErrorScreenProps> = ({error}) => {
    return(
                // The container for errors
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center text-red-600 font-semibold mt-10 text-xl"
              >
                {error}
              </motion.div>
    )
}
// Exporting
export default ErrorScreen;