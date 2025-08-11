import { useEffect, useState } from "react";

// The main component for header
const Header = () =>{
    // State for storing the searched keyword
    const [searchedPokemon, setSearchedPokemon] = useState<string | null>(null);
    // useEffect that will run after searchedPokemon is changed
    useEffect()
    return(
        // The header tag containing the contents of header
        <header className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between 2xl:justify-around 2xl:gap-50 items-center sticky top-0 z-50 bg-white shadow-md p-10">
            {/* Div containing the heading */}
            <div>
                <h1 className="text-2xl md:text-4xl xl:text-5xl 2xl:text-7xl font-bold">POKEDEX</h1>
            </div>
            {/* The div containing the searching field */}
            <input type="text" placeholder="Search for Pokemons" className="ring-2 focus:ring-2 rounded-md py-1 lg:py-2 xl:py-3 px-2 md:w-66 lg:w-75 xl:w-85 2xl:w-120 text-[13px] xl:text-xl 2xl:text-3xl outline-none"></input>
        </header>
    )
}
// Exporting the component
export default Header;