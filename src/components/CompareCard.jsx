import { typeColors } from "../utils/typeColors";
import { typeIconClasses } from "../utils/typeIcons";
import { formatStats } from "../utils/formatStats";
import PokemonStatsRadar from "./PokemonStatsRadar";
import { GenderIcons } from "../utils/genderIcons";
import { useState } from "react";
import EvolutionChain
 from "./EvolutionChain";
function CompareCard({ pokemon,removeComparedPokemon,onSelectEvolution }) {
  const [selectedAbility, setSelectedAbility] = useState(null);

  if (!pokemon) return null;

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white/60 backdrop-blur-md relative">
      <button 
      onClick={ () => removeComparedPokemon(pokemon)}
       className="absolute top-3 right-4 text-xl font-bold cursor-pointer text-red-600">
        <i className="fas fa-window-close"></i>
      </button>
      {/* ✅ Image and Basic Info */}
      <div className="flex flex-col items-center mb-3">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-28 h-28 mb-2"
        />
        <p className="text-gray-600 font-bold text-sm">#{pokemon.id}</p>
        <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
      </div>

      {/* ✅ Types */}
      <div className="flex flex-wrap justify-center gap-2 mb-3">
        {pokemon.types?.map((typeObj, index) => {
          const type = typeObj.type.name;
          const colorClass = typeColors[type];
          const iconClass = typeIconClasses[type];
          return (
            <div
              key={index}
              className={`flex items-center gap-1 px-2 py-1 text-white text-xs ${colorClass} rounded`}
            >
              <i className={`${iconClass} text-black`}></i>
              <span className="capitalize">{type}</span>
            </div>
          );
        })}
      </div>

      {/* ✅ Height, Weight, Gender */}
      <div className="flex justify-between text-xs mb-3">
        <div className="text-center">
          <div className="bg-gray-500 text-white px-2 rounded-t">Height</div>
          <div>{pokemon.height}m</div>
        </div>
        <div className="text-center">
          <div className="bg-gray-500 text-white px-2 rounded-t">Weight</div>
          <div>{pokemon.weight}kg</div>
        </div>
        <div className="text-center">
          <div className="bg-gray-500 text-white px-2 rounded-t">Gender</div>
          <GenderIcons genderRate={pokemon.gender_rate} />
        </div>
      </div>

      {/* ✅ Stats Radar */}
      <div className="border-t py-5 mb-3 flex justify-center">
        <PokemonStatsRadar stats={formatStats(pokemon.stats)} pokemon={pokemon} />
      </div>

      {/* ✅ Abilities */}
      <div className="border-t pt-3 mb-3">
        {selectedAbility ? (
          <div>
            <button
              onClick={() => setSelectedAbility(null)}
              className="text-white px-2 py-1 bg-red-500 text-xs mb-2 rounded cursor-pointer"
            >
              ← Back
            </button>
            <div className="border-b font-bold capitalize">{selectedAbility.name}</div>
            <div className="text-xs mt-2">{selectedAbility.effect}</div>
          </div>
        ) : (
          <div>
            <div className="font-bold text-sm mb-2">Abilities</div>
            <div className="grid grid-cols-1 gap-2">
              {pokemon.abilities.map((abilityObj, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border p-1 text-xs"
                >
                  <div className="capitalize">
                    {abilityObj.name}
                    {abilityObj.is_hidden && (
                      <i title="Hidden Ability" className="fa-solid fa-eye-slash ml-1"></i>
                    )}
                  </div>
                  <i
                    title="More info"
                    onClick={() => setSelectedAbility(abilityObj)}
                    className="fa-solid fa-circle-info cursor-pointer"
                  ></i>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ✅ Weaknesses */}
      <div className="border-t pt-3">
        <div className="font-bold text-sm mb-2">Weaknesses</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {pokemon.weaknesses.map((weakness, index) => (
            <div
              key={index}
              className={`flex items-center gap-1 px-2 py-1 rounded capitalize ${typeColors[weakness]}`}
            >
              <i className={`${typeIconClasses[weakness]} text-black`}></i>
              <span className="text-white">{weakness}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t mt-4 pt-3">
        <div className="font-bold text-sm mb-2">Evolution</div>
        <EvolutionChain stages={pokemon.evolutions} onSelectEvolution={onSelectEvolution}/>
      </div>
      
    </div>
  );
}

export default CompareCard;
