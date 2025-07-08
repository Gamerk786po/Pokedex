import { useEffect, useState } from "react";
import Card from "./card";
import { motion } from "framer-motion"; // for using framer motion 
import { Typewriter } from "react-simple-typewriter"; // for using typing animation

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

  // Offset of api which will be altered by 20
  const [offset, setOffSet] = useState<number>(0);

  // isLoading
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // The function for api call of 20 pokemons in pagination.
  const getPokemons = async () => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=20&${offset}`
    );
    const json = await res.json();
    setPokemons(json.results);
    setTimeout(() => setIsLoading(false), 1700);
  };

  // The useEffect for API requests
  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <>
      {isLoading ? (
        // The container for loading screen
        <div className="flex justify-center items-center flex-col overflow-auto">
          <img
            className="h-40"
            src="/loading-gif/Pikachu-running.gif"
            alt="loading"
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
      ) : (
        // The container for pokemon cards
        <div className="flex justify-center items-center flex-wrap gap-15 mt-10">
          {pokemons.map((pokemon) => {
            const id = pokemon.url.split("/")[6]; // extracting id
            const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`; // the url for image
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                key={pokemon.name}
              >
                <Card name={`${pokemon.name}`} imgUrl={`${imgUrl}`} />
              </motion.div>
            );
          })}
        </div>
      )}
    </>
  );
};
// Exporting the component
export default Body;
