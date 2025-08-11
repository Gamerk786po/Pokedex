import { useEffect, useState, lazy, Suspense } from "react";
const Card = lazy(() => import("./bodyComponents/card"));
import { motion, AnimatePresence } from "framer-motion"; // for using framer motion
import PaginationButton from "./bodyComponents/Pagination-button";
import LoadingScreen from "./bodyComponents/loadingScreen";
import ErrorScreen from "./bodyComponents/errorScreen";
import { usePokemon } from "../../context/PokemonContext/usePokemon";
import InfoCard from "./bodyComponents/pokemon-info-card/infocard";
import { useSpecies } from "../../context/SpeciesContext/useSpecies";
import { useEvolutions } from "../../context/EvolutionsContext/useEvolutions";
import { useEffectiveness } from "../../context/EffectivenessContext/useEffectiveness";
import {
  EffectivenessInterface,
  PokemonType,
} from "../../context/EffectivenessContext/interface";
import { usePokemonsList } from "../../context/PokemonsListContext/usePokemonsList";

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
    url: string;
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
export interface EvolutionDetails {
  min_level: number | null;
  min_happiness: number | null;
  held_item: string | null;
  time_of_day: string;
  item: string | null;
  trigger: string | null;
}

// Interface for Pokemon Evolutions
export interface PokemonEvolutionsInterface {
  name: string;
  url: string;
  evo_details: EvolutionDetails;
  evolves_to: PokemonEvolutionsInterface[]; // Recursive branching support
}

interface PokemonDamageRelations {
  name: string;
  url: string;
}
// The component for body
const Body = () => {
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
  usePokemonsList for pokemonsList and setPokemonsList
   */
  const { pokemonsList, setPokemonsList } = usePokemonsList();
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
 useSpecies from PokemonSpeciesContext
 */
  const { setPokemonEvolutions } = useEvolutions();
  /*
  useEffectiveness for pokemonEffectivenessContext
   */
  const { setPokemonEffectiveness } = useEffectiveness();
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
      setPokemonsList(json.results);
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
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to fetch evolutions data: ${res.status}`);
      }

      const data = await res.json();

      const formatData = (
        chain: RawEvolutionChain
      ): PokemonEvolutionsInterface => {
        const name = chain.species.name;
        const url = chain.species.url;

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
          url,
          evo_details,
          evolves_to,
        };
      };

      const formatedEvolutions = formatData(data.chain);
      setPokemonEvolutions(formatedEvolutions);
    } catch (error) {
      console.error("Error fetching evolutions data:", error);
    }
  };

  // The function for API Call of species data of clickedPokemon
  const getSpeciesData = async () => {
    try {
      const id = pokemonApi.split("/")[6]; // extracting id from url
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}/`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch species data: ${res.status}`);
      }

      const data = await res.json();

      const pokemonSpecies = {
        egg_groups: (data.egg_groups as PokemonEggGroups[]).map(
          (egg_group) => ({
            name: egg_group.name,
          })
        ),
        evolution_chain_url: data.evolution_chain.url,
        flavor_text:
          (data.flavor_text_entries as FlavourTextEnteries[])
            .find((entry) => entry.language.name === "en")
            ?.flavor_text.replace(/[\n\f]/g, " ") || "",
        varieties: (data.varieties as PokemonVarieties[]).map((variety) => ({
          name: variety.pokemon.name,
          url: variety.pokemon.url,
        })),
      };

      setPokemonSpecies(pokemonSpecies);
      await getEvolutionsData(pokemonSpecies.evolution_chain_url);
    } catch (error) {
      console.error("Error fetching species data:", error);
    }
  };

  // The function for API Call for types effectiveness of clickedPokemon
  const getEffectivenessData = async (typeUrls: string[]) => {
    const typings: EffectivenessInterface = {
      normal: 1,
      fire: 1,
      water: 1,
      electric: 1,
      grass: 1,
      ice: 1,
      fighting: 1,
      poison: 1,
      ground: 1,
      flying: 1,
      psychic: 1,
      bug: 1,
      rock: 1,
      ghost: 1,
      dragon: 1,
      dark: 1,
      steel: 1,
      fairy: 1,
    };

    try {
      const results = await Promise.all(
        typeUrls.map(async (url) => {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`Failed to fetch ${url}: ${res.status}`);
          }
          return res.json();
        })
      );

      results.forEach((data) => {
        const damage_relations = data.damage_relations;
        // calculation of type effectiveness

        // mul by 2 on double damage from
        damage_relations.double_damage_from.forEach(
          (type: PokemonDamageRelations) => {
            const name = type.name as PokemonType;
            typings[name] *= 2;
          }
        );

        // mul by 0.5 on half damage from
        damage_relations.half_damage_from.forEach(
          (type: PokemonDamageRelations) => {
            const name = type.name as PokemonType;
            typings[name] *= 0.5;
          }
        );

        // mul by 0 on no damage from
        damage_relations.no_damage_from.forEach(
          (type: PokemonDamageRelations) => {
            const name = type.name as PokemonType;
            typings[name] *= 0;
          }
        );
      });

      setPokemonEffectiveness(typings);
    } catch (error) {
      console.error("Error fetching effectiveness data:", error);
    }
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
      const typeUrls = (data.types as PokemonTypes[]).map((t) => t.type.url); // Getting Types urls
      await getSpeciesData();
      await getEffectivenessData(typeUrls);
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
          <AnimatePresence mode="wait">
            {isCardClick ? (
              <div className="flex justify-center items-center flex-wrap gap-15 mt-10 w-full">
                <InfoCard
                  key="infocard"
                  onClose={() => setIsCardClick(false)}
                />
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center"
                key="pokemonlist"
              >
                {/* The div enclosing the deck of pokemons */}
                <div className="flex justify-center items-center flex-wrap gap-15 mt-10">
                  {pokemonsList?.map((pokemon) => {
                    const id = pokemon.url.split("/")[6]; // extracting id
                    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`; // the url for image
                    return (
                      // The div enclosing each pokemon
                      <motion.div
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
          </AnimatePresence>
        </Suspense>
      )}
    </>
  );
};
// Exporting the component
export default Body;
