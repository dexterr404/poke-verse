import { typeColors } from "../utils/typeColors";
import { typeIconClasses } from "../utils/typeIcons";
import { formatStats } from "../utils/formatStats";
import PokemonStatsRadar from "./PokemonStatsRadar";
import { GenderIcons } from "../utils/genderIcons";
import { useState } from "react";
import EvolutionChain from "./EvolutionChain";
import PokeballAnimation from "./animation/PokeballAnimation";
import CatchIcon from "../assets/catch.png";
import { usePokemonContext } from "../contexts/PokemonContext";

function PokemonModal({ pokemon, onClose, setPickedPokemon, handleTypeClick, setSearchParams }) {
  const { addToPokemonCollection, isCollected } = usePokemonContext();
  const [selectedAbility, setSelectedAbility] = useState(null);
  const [isCatching, setIsCatching] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [catchMessage, setCatchMessage] = useState(null);
  const [throwCount, setThrowCount] = useState(0);

  if (!pokemon) return null;

  const getCatchProbability = (pokemon) => {
    switch (pokemon.rarity) {
      case "mythical": return 100;
      case "legendary": return 50;
      case "rare": return 20;
      case "uncommon": return 10;
      default: return 5;
    }
  };

  const handleCatch = async () => {
    setThrowCount((c) => c + 1);
    setIsCatching(true);
    const probability = getCatchProbability(pokemon);
    const success = Math.random() < (1 / probability);

    if (success) {
      await addToPokemonCollection(pokemon);
      setCatchMessage(`✅ You caught ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}!`);
    } else {
      setCatchMessage(`❌ ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} escaped!`);
    }

    setTimeout(() => setIsMessageOpen(true), 4000);
    setTimeout(() => {
      setIsCatching(false);
      setIsMessageOpen(false);
      setCatchMessage(null);
    }, 5000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-200">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-xl p-6 relative over max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl font-bold cursor-pointer text-red-600"
        >
          <i className="fas fa-window-close"></i>
        </button>

        <h2 className="text-2xl font-bold mb-3 capitalize">{`${pokemon.id} -  ${pokemon.name}`}</h2>

        <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:place-items-center">
          <div className="relative flex flex-col justify-center gap-2 items-center">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-32 h-32 mx-auto mb-4"
            />
            {isCatching && <PokeballAnimation key={`throw-${throwCount}`} isCatching={isCatching} />}
            <div>
              {isMessageOpen && catchMessage && (
                <p
                  className={`text-[10px] font-bold mt-2 px-3 py-1 rounded absolute left-[-80px] bottom-[37%] md:left-0 md:bottom-[35%] ${
                    catchMessage.startsWith("✅")
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {catchMessage}
                </p>
              )}
            </div>
            <button
              onClick={handleCatch}
              disabled={isCatching || isCollected(pokemon.id)}
              className={`px-4 py-1 text-xs rounded-md flex items-center ${
                isCatching || isCollected(pokemon.id)
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-500 text-white"
              }`}
            >
              <img src={CatchIcon} className="w-4 mr-1" />
              {isCollected(pokemon.id) ? "Collected" : isCatching ? "Catching..." : "Catch!"}
            </button>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {pokemon.types?.map((typeObj, index) => {
                const type = typeObj.type.name;
                const iconClass = typeIconClasses[type];
                const colorClass = typeColors[type];
                return (
                  <div
                    key={index}
                    title={type.charAt(0).toUpperCase() + type.slice(1)}
                    onClick={() => {
                      onClose();
                      handleTypeClick(type);
                      setSearchParams((prev) => {
                        const newParams = new URLSearchParams(prev);
                        newParams.set("type", type);
                        return newParams;
                      });
                    }}
                    className={`flex items-center gap-2 px-2 py-1 text-white text-[12px] ${colorClass} cursor-pointer`}
                  >
                    <i className={`${iconClass} text-gray-800`}></i>{" "}
                    <span className="capitalize">{type}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4">
            <p className="text-xs">{pokemon.flavor_text}</p>
            <div className="grid grid-cols-3 grid-rows-2 gap-3 mt-2 text-xs max-md:px-4 capitalize">
              <div className="flex flex-col">
                <div className="bg-gray-500 text-white px-2 pt-1 mb-1 rounded-t-[5px]">Height</div>
                <div>{pokemon.height}m</div>
              </div>
              <div className="flex flex-col">
                <div className="bg-gray-500 text-white px-2 pt-1 mb-1 rounded-t-[5px]">Weight</div>
                <div>{pokemon.weight}kg</div>
              </div>
              <div className="flex flex-col">
                <div className="bg-gray-500 text-white px-2 pt-1 mb-1 rounded-t-[5px]">Capture Rate</div>
                <div>{pokemon.capture_rate}</div>
              </div>
              <div className="flex flex-col">
                <div className="bg-gray-500 text-white px-2 pt-1 mb-1 rounded-t-[5px]">Category</div>
                <div className="text-xs">{pokemon.category}</div>
              </div>
              <div className="flex flex-col">
                <div className="bg-gray-500 text-white px-2 pt-1 mb-1 rounded-t-[5px]">Rarity</div>
                <div className="text-xs">{pokemon.rarity}</div>
              </div>
              <div className="flex flex-col">
                <div className="bg-gray-500 text-white px-2 pt-1 mb-1 rounded-t-[5px]">Gender</div>
                <GenderIcons genderRate={pokemon.gender_rate} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex max-sm:flex-col max-sm:gap-5 max-sm:items-center gap-3 mt-4 border-gray-400 border-t-2 py-7 border-b-2">
          <PokemonStatsRadar stats={formatStats(pokemon.stats)} pokemon={pokemon} />

          <div className="flex-col py-3 px-2 border-2 break-all w-full text-xs pt-2 relative rounded-xs">
            {selectedAbility ? (
              <>
                <button
                  onClick={() => setSelectedAbility(null)}
                  className="text-white px-2 py-1 bg-red-500 text-[12px] mb-2 absolute right-0 top-0 cursor-pointer"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 15% 100%, 0 75%)" }}
                >
                  <i className="fas fa-arrow-left"></i> Back
                </button>
                <div className="border-b-2 font-bold capitalize mt-4">{selectedAbility.name}</div>
                <div className="text-xs mt-3 break-normal">{selectedAbility.effect}</div>
                <div className="font-bold mb-1 mt-3">Weakness</div>
                <div className="grid grid-cols-2 gap-2">
                  {pokemon.weaknesses.map((weakness, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        onClose();
                        handleTypeClick(weakness);
                      }}
                      title={weakness.charAt(0).toUpperCase() + weakness.slice(1)}
                      className={`${typeColors[weakness]} capitalize px-2 py-1 cursor-pointer`}
                    >
                      <i className={`${typeIconClasses[weakness]} text-black pr-2`}></i>
                      <span className="text-white">{weakness}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="font-bold mb-1">Abilities</div>
                <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 mb-3">
                  {pokemon.abilities.map((abilityObj, index) => (
                    <div key={index} className="border">
                      <div className="flex gap-1 capitalize p-1 rounded break-normal justify-between">
                        <div>
                          {abilityObj.name}
                          {abilityObj.is_hidden && (
                            <i title="Hidden Ability" className="fa-solid fa-eye-slash ml-1"></i>
                          )}
                        </div>
                        <div>
                          <i
                            title="More info"
                            onClick={() => setSelectedAbility(abilityObj)}
                            className="fa-solid fa-circle-info hover:cursor-pointer"
                          ></i>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="font-bold mb-1">Weakness</div>
                <div className="grid grid-cols-2 gap-2">
                  {pokemon.weaknesses.map((weakness, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        onClose();
                        handleTypeClick(weakness);
                      }}
                      title={weakness.charAt(0).toUpperCase() + weakness.slice(1)}
                      className={`${typeColors[weakness]} capitalize px-2 py-1 cursor-pointer`}
                    >
                      <i className={`${typeIconClasses[weakness]} text-black pr-2`}></i>
                      <span className="text-white">{weakness}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="font-bold mt-5">Evolution</div>
        <EvolutionChain stages={pokemon.evolutions} setPickedPokemon={setPickedPokemon} setSearchParams={setSearchParams} />
      </div>
    </div>
  );
}

export default PokemonModal;