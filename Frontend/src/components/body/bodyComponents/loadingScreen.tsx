import { Typewriter } from "react-simple-typewriter"; // for using typing animation

// The component for loadingScreen
const LoadingScreen = () => {
  return (
    // The container for loading screen
    <div className="flex justify-center items-center flex-col overflow-auto">
      <img
        className="h-40 2xl:h-50 [filter:drop-shadow(var(--drop-shadow-lightning))] animate-electric"
        src="/loading-gif/Pikachu-running.gif"
        alt="loading"
        loading="lazy"
      ></img>
      <span className="2xl:text-[30px]">
        <Typewriter
          words={["Hang tight! Pikachu's almost there.."]}
          cursor
          loop={0}
          typeSpeed={30}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </span>
    </div>
  );
};
// exporting
export default LoadingScreen;