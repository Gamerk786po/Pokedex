import { usePokemon } from "../../../../../context/PokemonContext/usePokemon";

// The component for stats
const Stats = () => {
  const { clickedPokemon } = usePokemon();
  const totalStats = clickedPokemon
    ? clickedPokemon.stats.reduce((total, s) => total + s.base_stat, 0)
    : 0;
  return (
    <>
      <div className="mx-13 my-6">
        <h2 className="text-xl font-bold mb-4">Base Stats</h2>
        {/* Container containing all rows */}
        <div className="flex flex-col gap-3">
          {clickedPokemon?.stats.map((s) => {
            const statPercentage = (s.base_stat / 255) * 100;

            return (
              // Container for stat name, bar container and value
              <div key={s.stat} className="flex items-center gap-4 w-full">
                {/* Stat name */}
                <label className="w-24 font-medium">
                  {s.stat.toUpperCase()}
                </label>

                {/* Bar container */}
                <div className="w-full bg-gray-300 h-4 rounded">
                  <div
                    className="h-4 bg-orange-600 rounded"
                    style={{ width: `${statPercentage}%` }}
                  ></div>
                </div>

                {/* Stat value */}
                <span className="w-10 text-right">{s.base_stat}</span>
              </div>
            );
          })}
          {/* Total stats */}
          <span className="w-full text-center mt-4 flex flex-row justify-center items-center gap-10">
            <p className="uppercase font-medium">Total:</p>
            <p>{totalStats}</p>
          </span>
        </div>
      </div>
    </>
  );
};

export default Stats;
