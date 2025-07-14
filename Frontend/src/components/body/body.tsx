import { useEffect, useState, lazy, Suspense } from "react";
const Card = lazy(() => import("./card"));
import { motion } from "framer-motion"; // for using framer motion
import { Typewriter } from "react-simple-typewriter"; // for using typing animation
import PaginationButton from "./Pagination-button";
import { usePokemon } from "../../context/PokemonContext/usePokemon"; // The custom hook for PokemonContext

// Interface for the 20 got pokemons
interface PokemonsInterface {
  name: string;
  url: string;
}
// Interface for Pokemon Types
interface PokemonTypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
// Interface for Pokemon stats
interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
// Interface for Pokemon moves
interface PokemonMoves {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
  }[];
}
interface PokemonAbilities{
  ability: {
    name: string,
    url: string
  },
  is_hidden: boolean,
  slot: number
}

// The component for body
const Body = () => {
  // State managements:+

  // Pokemons data
  const [pokemons, setPokemons] = useState<PokemonsInterface[]>([]);

  // Storring the error for extracting pokemons data
  const [error, setError] = useState<string>("");

  // Offset of API which will be altered by 20
  const [offset, setOffSet] = useState<number>(() => {
    const offsetLocalStored = localStorage.getItem(`offset`);
    return offsetLocalStored ? parseInt(offsetLocalStored) : 0;
  });

  // isLoading
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Is pokemon card clicked
  const [isCardClick, setIsCardClick] = useState<boolean>(false);

  /* 
  Pokemon info
  UsePokemon for PokemonContext
  */
  const { setClickedPokemon, clickedPokemon } = usePokemon();

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
      setTimeout(() => setIsLoading(false), 1000);
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

  // The handleClick function for each pokemon card
  const handleClick = async (api: string) => {
    // setIsLoading(true) // enable this after making the process of getting data.
    getPokemonInfo(api);
  };

  // The function for API call  of the clicked pokemon data
  const getPokemonInfo = async (api: string) => {
    const res = await fetch(api);
    const data = await res.json();
    const pokemonData = {
      name: data.species.name,
      img: data.sprites.front_default,
      height: data.height,
      weight: data.weight,
      types: (data.types as PokemonTypes[]).map((t) => t.type.name),
      stats: (data.stats as PokemonStats[]).map((s) => ({
        base_stat: s.base_stat,
        effort: s.effort,
        stat: s.stat.name,
      })),
      moves: (data.moves as PokemonMoves[]).map((m) => ({
        move: {
          name: m.move.name,
          url: m.move.url,
        },
        level_learned_at: m.version_group_details[0].level_learned_at,
        move_learn_method: m.version_group_details[0].move_learn_method.name,
      })),
      abilities: (data.abilities as PokemonAbilities[]).map((a) => ({
        ability:{
          name: a.ability.name,
          url: a.ability.url
        },
        is_hidden: a.is_hidden
      }))
    };
    console.log(pokemonData);
    setClickedPokemon(pokemonData);
    console.log(clickedPokemon);
  };

  // The useEffect for API requests
  useEffect(() => {
    localStorage.setItem("offset", `${offset}`);
    getPokemons();
    setIsLoading(true);
  }, [offset]);

  return (
    <>
      {isLoading ? (
        // The container for loading screen
        <div className="flex justify-center items-center flex-col overflow-auto">
          <img
            className="h-40 [filter:drop-shadow(var(--drop-shadow-lightning))] animate-electric"
            src="/loading-gif/Pikachu-running.gif"
            alt="loading"
            loading="lazy"
          ></img>
          <span>
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
            {/* The div enclosing the deck of pokemons */}
            <div className="flex justify-center items-center flex-wrap gap-15 mt-10">
              {pokemons.map((pokemon) => {
                const id = pokemon.url.split("/")[6]; // extracting id
                const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`; // the url for image
                return (
                  // The div enclosing each pokemon
                  <motion.div
                    className=""
                    onClick={() => handleClick(pokemon.url)}
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
