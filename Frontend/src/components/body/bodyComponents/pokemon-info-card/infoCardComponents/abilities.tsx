import { usePokemon } from "../../../../../context/PokemonContext/usePokemon";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AbilityInterface {
  effect: string;
  language: {
    name: string;
    url: string;
  };
  short_effect: string;
}

const Abilities = () => {
  const { clickedPokemon } = usePokemon();

  const [selectedAbilityUrl, setSelectedAbilityUrl] = useState<string | null>(
    null
  );
  const [selectedAbilityName, setSelectedAbilityName] = useState<string | null>(
    null
  );
  const [ability, setAbility] = useState<AbilityInterface | null>(null);

  const getAbility = async (url: string) => {
    try {
      const res = await fetch(url);
  
      if (!res.ok) {
        throw new Error(`Failed to fetch ability: ${res.status}`);
      }
  
      const data = await res.json();
  
      const abilityEntry = data.effect_entries.find(
        (entry: AbilityInterface) => entry.language.name === "en"
      );
  
      setAbility(abilityEntry);
    } catch (err) {
      console.error("Failed to fetch ability:", err);
    }
  };

  useEffect(() => {
    if (selectedAbilityUrl) {
      getAbility(selectedAbilityUrl);
    }
  }, [selectedAbilityUrl]);

  const handleClick = (url: string, name: string) => {
    setSelectedAbilityUrl(url);
    setSelectedAbilityName(name);
  };

  const handleClose = () => {
    setSelectedAbilityUrl(null);
    setSelectedAbilityName(null);
    setAbility(null);
  };

  return (
    <div className="mx-8 my-6">
      <h2 className="text-xl font-bold mb-4">Abilities</h2>

      <div className="flex flex-wrap gap-4 justify-start">
        {clickedPokemon?.abilities.map((a) => (
          <div
            key={a.ability.name}
            onClick={() => handleClick(a.ability.url, a.ability.name)}
            className={`py-1 px-4 rounded-xl capitalize text-white font-semibold text-sm xl:text-[17px] cursor-pointer transition-transform duration-300 hover:scale-105
              ${
                a.is_hidden
                  ? "bg-yellow-400 text-yellow-900"
                  : "bg-gray-600 text-white"
              }
            `}
          >
            {a.ability.name} {a.is_hidden ? "(Hidden)" : "(Normal)"}
          </div>
        ))}
      </div>

      <div className="mt-6 border p-4 rounded-md bg-gray-100 min-h-[120px] relative">
        {ability ? (
          <>
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition lg:hover:cursor-pointer"
            >
              ✕
            </button>
            {/* Info of selected abilities */}
            <motion.div
              key={selectedAbilityName}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "linear" }}
            >
              <h3 className="text-lg font-semibold capitalize">
                {selectedAbilityName}
              </h3>
              <p className="mt-2">{ability.effect}</p>
            </motion.div>
          </>
        ) : (
          <p className="text-gray-500 italic">
            Click on an ability to view its effect.
          </p>
        )}
      </div>
    </div>
  );
};

export default Abilities;
