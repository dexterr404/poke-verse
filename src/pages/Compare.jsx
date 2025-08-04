import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CompareCard from "../components/CompareCard";
import AddCompare from "../components/AddCompare";
import { useSearchParams } from "react-router-dom";
import { searchPokemons } from "../api/pokemonApi";

function Compare() {
  const [comparedPokemons, setComparedPokemons] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const pokemonParam = searchParams.get("pokemon");
    if (!pokemonParam) {
      setComparedPokemons([]);
      return;
    }

    const names = pokemonParam.split(",");

    (async () => {
      const results = await Promise.all(
        names.map((name) => searchPokemons(name))
      );
      setComparedPokemons(results.filter(Boolean));
    })();
  }, [searchParams]);

  useEffect(() => {
    const currentParam = searchParams.get("pokemon");
    const newParam = comparedPokemons.map((p) => p.name).join(",");

    if (newParam && currentParam !== newParam) {
      const query = new URLSearchParams();
      query.set("pokemon", newParam);
      setSearchParams(query);
    } else if (!newParam && currentParam) {
      setSearchParams({});
    }
  }, [comparedPokemons]);

  const addComparedPokemon = (pokemon) => {
    setComparedPokemons((prev) => {
      if (prev.find((p) => p.id === pokemon.id)) return prev;
      return [...prev, pokemon];
    });
  };

  const removeComparedPokemon = (pokemon) => {
    setComparedPokemons((prev) =>
      prev.filter((p) => p.id !== pokemon.id)
    );
  };

  return (
    <div className="pb-20 relative">
      <div className="relative z-30 flex justify-center">
        <SearchBar onSelectPokemon={addComparedPokemon} />
      </div>

      {comparedPokemons.length > 0 ? (
        <div className="flex gap-3 overflow-auto pb-6 px-4 relative z-10 w-full">
          {comparedPokemons.map((pokemon) => (
            <CompareCard
              key={pokemon.id}
              pokemon={pokemon}
              removeComparedPokemon={removeComparedPokemon}
              onSelectEvolution={addComparedPokemon}
            />
          ))}
          <AddCompare />
        </div>
      ) : (
        <div>
          <div className="flex justify-center">
            <h1 className="font-bold text-xl text-white font-[flexo]">
              Start adding pokémons to compare
            </h1>
          </div>
          <div className="flex gap-3 overflow-auto pb-6 px-4 relative z-10 w-full">
            <AddCompare />
          </div>
        </div>
      )}
    </div>
  );
}

export default Compare;
