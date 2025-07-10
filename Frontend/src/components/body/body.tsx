import { useEffect, useState, lazy, Suspense } from "react";
const Card = lazy(() => import("./card"));
import { motion } from "framer-motion"; // for using framer motion
import { Typewriter } from "react-simple-typewriter"; // for using typing animation
import PaginationButton from "./Pagination-button";

// Interface for the 20 got pokemons
interface fetchedPokemonsInterface {
  name: string;
  url: string;
}

// The component for body
const Body = () => {
  // State managements:

  // Pokemons data
  const [pokemons, setPokemons] = useState<fetchedPokemonsInterface[]>([]);

  // Offset of API which will be altered by 20
  const [offset, setOffSet] = useState<number>(0);

  // isLoading
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Storring the error
  const [error, setError] = useState<string>("");

  // The function for api call of 20 pokemons in pagination.
  const getPokemons = async () => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();
      setPokemons(json.results);
      setTimeout(() => setIsLoading(false), 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      setIsLoading(false);
      console.error(err);
    }
  };

  // The useEffect for API requests
  useEffect(() => {
    getPokemons();
    setIsLoading(true);
  }, [offset]);

  return (
    <>
      {isLoading ? (
        // The container for loading screen
        <div className="flex justify-center items-center flex-col overflow-auto">
          <img
            className="h-40"
            src="/loading-gif/Pikachu-running.gif"
            alt="loading"
            loading="lazy"
          ></img>
          <span>
            <Typewriter
              words={["Hang tight! Pikachu's almost there.."]}
              cursor
              loop={0}
              typeSpeed={35}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </div>
      ) : error ? (
        // The container for errors
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center text-red-600 font-semibold mt-10 text-xl"
        >
          {error}
        </motion.div>
      ) : (
        // The container for containing body components
        <Suspense fallback={<></>}>
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center items-center flex-wrap gap-15 mt-10">
              {pokemons.map((pokemon) => {
                const id = pokemon.url.split("/")[6]; // extracting id
                const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`; // the url for image
                return (
                  <motion.div
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9 }}
                    key={pokemon.name}
                  >
                    <Card name={`${pokemon.name}`} imgUrl={`${imgUrl}`} />
                  </motion.div>
                );
              })}
            </div>
            {/* The container for buttons for back, first page and next */}
            <div className="mt-7 md:10 p-5 flex flex-row justify-center items-center gap-5">
              {/* The back button */}
              <PaginationButton
                label="Back"
                disabled={offset === 0}
                onClick={() => setOffSet(offset - 20)}
              />
              {/* The first page button */}
              <PaginationButton
                label="First-Page"
                disabled={false}
                onClick={() => setOffSet(0)}
              />
              {/* The next button */}
              <PaginationButton
                label="Next"
                disabled={false}
                onClick={() => setOffSet(offset + 20)}
              />
            </div>
          </div>
        </Suspense>
      )}
    </>
  );
};
// Exporting the component
export default Body;
