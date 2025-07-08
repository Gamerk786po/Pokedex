import { useEffect, useState } from "react";
import Card from "./card";
// Interface for the 20 got pokemons
interface fetchedPokemonsInterface {
  name: string;
  url: string;
}

// The component for body https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0
const Body = () => {
  // State management

  // For pokemons data
  const [pokemons, setPokemons] = useState<fetchedPokemonsInterface[]>([]);

  // For offset of api which will be altered by 20
  const [offset, setOffSet] = useState<number>(0);

  // The function for api calls for 20 pokemons in pagination.
  const getPokemons = async () => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=20&${offset}`
    );
    const json = await res.json();
    setPokemons(json.results);
  };

  // The useEffect for api requests
  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <>
      {/* The container for containing the pokemon cards */}
      <div className="flex justify-center items-center flex-wrap gap-15 mt-10">
        {pokemons.map((pokemon) => {
          const id = pokemon.url.split("/")[6];
          const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          return <Card name={`${pokemon.name}`} imgUrl={`${url}`} />;
        })}
      </div>
    </>
  );
};
// Exporting the component
export default Body;
