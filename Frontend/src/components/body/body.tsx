import { useEffect, useState, lazy, Suspense } from "react";
const Card = lazy(() => import("./bodyComponents/card"));
import { motion } from "framer-motion"; // for using framer motion
import PaginationButton from "./bodyComponents/Pagination-button";
import LoadingScreen from "./bodyComponents/loadingScreen";
import ErrorScreen from "./bodyComponents/errorScreen";
import { usePokemon } from "../../context/PokemonContext/usePokemon";
import InfoCard from "./bodyComponents/pokemon-info-card/infocard";
import { useSpecies } from "../../context/SpeciesContext/useSpecies";
import { useEvolutions } from "../../context/EvolutionsContext/useEvolutions";

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
// Interface for Pokemon abilities
interface PokemonAbilities {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

// Interface for Pokemon egg_groups
interface PokemonEggGroups {
  name: string;
  url: string;
}

// Interface for Pokemon Varieties
interface PokemonVarieties {
  is_default: boolean;
  pokemon: {
    name: string;
    url: string;
  };
}

// Interface for Pokemon Flavour-Text-Interies
interface FlavourTextEnteries {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

// Interface for RawEvolutionChain
interface RawEvolutionChain {
  species: {
    name: string;
  };
  evolution_details: {
    min_level: number | null;
    min_happiness: number | null;
    held_item: { name: string } | null;
    time_of_day: string;
    item: { name: string } | null;
    trigger: { name: string } | null;
  }[];
  evolves_to?: RawEvolutionChain[];
}

// Interface for Evo Details
interface EvolutionDetails {
  min_level: number | null;
  min_happiness: number | null;
  held_item: string | null;
  time_of_day: string;
  item: string | null;
  trigger: string | null;
}

// Interface for Pokemon Evolutions
interface PokemonEvolutionsInterface {
  name: string;
  evo_details: EvolutionDetails;
  evolves_to: PokemonEvolutionsInterface[]; // Recursive branching support
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

  // API of clicked pokemon
  const [pokemonApi, setpokemonApi] = useState<string>("");

  /* 
  Pokemon info
  UsePokemon for PokemonContext
  */
  const { setClickedPokemon } = usePokemon();
  /*
 useSpecies for PokemonSpeciesContext
  */
  const { setPokemonSpecies } = useSpecies();
  /*
 useSpecies for PokemonSpeciesContext
 */
  const { setPokemonEvolutions } = useEvolutions();
  // Functions

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
  const handleClick = (api: string) => {
    // setIsLoading(true) // enable this after making the process of getting data.
    setpokemonApi(api);
    setIsCardClick(true);
  };

  // The function for API call of the Evolutions of the clickedpokemon
  const getEvolutionsData = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    const formatData = (
      chain: RawEvolutionChain
    ): PokemonEvolutionsInterface => {
      const name = chain.species.name;
      const details =
        chain.evolution_details && chain.evolution_details.length > 0
          ? chain.evolution_details
          : null;
      const evo_details = {
        min_level: details?.[0].min_level ?? null,
        min_happiness: details?.[0].min_happiness ?? null,
        held_item: details?.[0].held_item?.name ?? null,
        time_of_day: details?.[0].time_of_day ?? "",
        item: details?.[0].item?.name ?? null,
        trigger: details?.[0].trigger?.name ?? null,
      };
      const evolves_to = chain.evolves_to?.length
        ? chain.evolves_to.map((evo: RawEvolutionChain) => formatData(evo))
        : [];
      return {
        name,
        evo_details,
        evolves_to,
      };
    };
    const formatedEvolutions = formatData(data.chain);
    console.log(JSON.stringify(formatedEvolutions, null, 2));
    setPokemonEvolutions(formatedEvolutions);
  };

  // The function for API Call of species data of clickedPokemon
  const getSpeciesData = async () => {
    const id = pokemonApi.split("/")[6]; // extracting id from url
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const data = await res.json();
    const pokemonSpecies = {
      egg_groups: (data.egg_groups as PokemonEggGroups[]).map((egg_group) => ({
        name: egg_group.name,
      })),
      evolution_chain_url: data.evolution_chain.url,
      flavor_text:
        (data.flavor_text_entries as FlavourTextEnteries[]).find(
          (entry) => entry.language.name === "en"
        )?.flavor_text || "",
      varieties: (data.varieties as PokemonVarieties[]).map((variety) => ({
        name: variety.pokemon.name,
        url: variety.pokemon.url,
      })),
    };
    setPokemonSpecies(pokemonSpecies);
    await getEvolutionsData(pokemonSpecies.evolution_chain_url);
  };

  // The function for API call  of the clicked pokemon data
  const getPokemonInfo = async () => {
    try {
      const res = await fetch(pokemonApi);

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      const pokemonData = {
        // for understanding this structure check out PokemonContext/clickedPokemon interface.
        id: data.id,
        name: data.species.name,
        img: data.sprites.front_default,
        height: data.height,
        weight: data.weight,
        types: (data.types as PokemonTypes[]).map((t) => t.type.name),
        stats: (data.stats as PokemonStats[]).map((s) => ({
          base_stat: s.base_stat,
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
          ability: {
            name: a.ability.name,
            url: a.ability.url,
          },
          is_hidden: a.is_hidden,
        })),
      };
      setClickedPokemon(pokemonData); // setting the clickedPokemon data
      await getSpeciesData();
      setTimeout(() => setIsLoading(false), 1000); // setting the loading to be false
    } catch (err: unknown) {
      // Error handling
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
      setIsLoading(false);
      console.error(err);
    }
  };

  // The useEffect for API requests
  useEffect(() => {
    setIsLoading(true);
    localStorage.setItem("offset", `${offset}`);
    getPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);
  //  The useEffect for API request for clickedPokemon
  useEffect(() => {
    if (isCardClick && pokemonApi) {
      setIsLoading(true);
      getPokemonInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCardClick, pokemonApi]);
  // The returning statement of Body component
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : error ? (
        <ErrorScreen error={error} />
      ) : (
        // The container for containing body components
        <Suspense fallback={<></>}>
          {isCardClick ? (
            <div className="flex justify-center items-center flex-wrap gap-15 mt-10 w-full">
              <InfoCard />
            </div>
          ) : (
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
          )}
        </Suspense>
      )}
    </>
  );
};
// Exporting the component
export default Body;
