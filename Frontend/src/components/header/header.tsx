import { useEffect, useState } from "react";
import { useSearchedPokemons } from "../../context/SearchedPokemons/useSearchedPokemons";
import { PokemonsList } from "../../context/SearchedPokemons/interface";
import SocialContact from "./socialContacts";

// The main component for header
const Header = () => {
    // contacts
    const contacts = [
      {name: "discord", url: "https://discord.com/users/gamerk_786po"},
      {name: "instagram", url: "https://www.instagram.com/gamerk786po/"},
      {name: "github", url: "https://github.com/Gamerk786po"},
      { name: "gmail", url: "https://mail.google.com/mail/?view=cm&fs=1&to=abdullahpper@gmail.com" }
    ]
  // Getting searchedPokemons and setSearchedPokemons from SearchedPokemonsContext
  const { setSearchedPokemons, setPageIndex } = useSearchedPokemons();

  // State for storing the searched keyword
  const [searchedQuerry, setSearchedQuerry] = useState<string>("");
  // useEffect that will run after searchedPokemon is changed
  useEffect(() => {
    // if search query is empty, reset results immediately
    if (!searchedQuerry.trim()) {
      setSearchedPokemons([]);
      return;
    }
    const debouncerTimeout = setTimeout(async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");
      const data = await res.json();
      const pokemonsData = data.results;
      // Filtering the pokemonData
      const filteredPokemons = pokemonsData.filter((pokemon: PokemonsList) => {
        return pokemon.name
          .toLowerCase()
          .includes(searchedQuerry.toLowerCase());
      });
      // Formating
      const searchedPokemonsList = [];
      for (let i = 0; i < filteredPokemons.length; i += 20) {
        const sliced = filteredPokemons.slice(i, i + 20);
        searchedPokemonsList.push(sliced);
      }
      // Setting the formated data in context state
      setSearchedPokemons(searchedPokemonsList);
    }, 500);
    return () => clearTimeout(debouncerTimeout);
  }, [searchedQuerry, setSearchedPokemons]);
  // Returning the header component
  return (
    // The header tag containing the contents of header
    <header className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between 2xl:justify-around 2xl:gap-50 items-center lg:sticky top-0 z-50 bg-white shadow-md p-10">
      {/* Div containing the heading */}
      <div>
        <h1 className="text-2xl md:text-4xl xl:text-5xl 2xl:text-7xl font-bold">
          POKEDEX
        </h1>
      </div>
      {/* Div Containing contacts */}
      <div className="flex flex-row gap-6 md:translate-y-6 lg:translate-x-9 justify-center items-center">
      {contacts.map((contact) => (
          <SocialContact
            key={contact.name}
            name={contact.name}
            url={contact.url}
          />
        ))}
      </div>
      {/* The div containing the searching field */}
      <input
        type="text"
        value={searchedQuerry}
        placeholder="Search for Pokemons"
        className="ring-2 focus:ring-2 rounded-md py-1 lg:py-2 xl:py-3 px-2 md:w-66 lg:w-75 xl:w-85 2xl:w-120 text-[13px] xl:text-xl 2xl:text-3xl outline-none"
        onChange={(e) => {
          setSearchedQuerry(e.target.value);
          setPageIndex(0);
        }}
      ></input>
    </header>
  );
};
// Exporting the component
export default Header;
