import React from "react";
import { searchPokemons } from "../api/pokemonApi";

export default function EvolutionChain({ stages, setPickedPokemon, onSelectEvolution, setSearchParams }) {
  return (
    <div className="flex items-center mt-4 gap-6 justify-center max-sm:flex-col">
      {stages.map((stage, stageIndex) => {
        const isBranching = stage.length > 1;

        return (
          <React.Fragment key={stageIndex}>
            <div>
              {isBranching ? (
                <div className="grid grid-cols-2 gap-2">
                  {stage.map((pokemon, index) => (
                    <div key={index} className="text-center">
                      <img
                        onClick={async () => {
                          const newPokemon = await searchPokemons(pokemon.name);

                          if (setPickedPokemon) {
                            setPickedPokemon(newPokemon);
                          }

                          if (onSelectEvolution) {
                            onSelectEvolution(newPokemon);
                          }

                          if (setSearchParams) {
                            setSearchParams((prev) => {
                              const updated = new URLSearchParams(prev);
                              updated.set("modal", pokemon.name.toLowerCase());
                              return updated;
                            });
                          }
                        }}
                        className="w-20 h-20 mx-auto cursor-pointer bg-gray-100 mb-1 rounded-full border-2 p-1 border-red-500"
                        src={pokemon.image}
                        alt={pokemon.name}
                      />
                      <div className="capitalize text-sm">{pokemon.name}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <img
                    onClick={async () => {
                      const newPokemon = await searchPokemons(stage[0].name);

                      if (setPickedPokemon) {
                        setPickedPokemon(newPokemon);
                      }

                      if (onSelectEvolution) {
                        onSelectEvolution(newPokemon);
                      }

                      if (setSearchParams) {
                        setSearchParams((prev) => {
                          const updated = new URLSearchParams(prev);
                          updated.set("modal", stage[0].name.toLowerCase());
                          return updated;
                        });
                      }
                    }}
                    className="w-20 h-20 mx-auto cursor-pointer bg-gray-200 mb-1 rounded-full border-2 p-1 border-gray-500"
                    src={stage[0].image}
                    alt={stage[0].name}
                  />
                  <div className="capitalize text-sm">{stage[0].name}</div>
                </div>
              )}
            </div>

            {stageIndex < stages.length - 1 && (
              <div>
                <i className="fas fa-angle-right text-gray-600 text-2xl max-sm:rotate-90 border-none"></i>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
