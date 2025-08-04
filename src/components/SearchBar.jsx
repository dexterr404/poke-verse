import { useState } from "react";
import usePokemonList from "../data/usePokemonList";
import { searchPokemons } from "../api/pokemonApi";

function SearchBar({ onSelectPokemon }) {
  const pokemonList = usePokemonList();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.length > 0) {
      setSuggestions(
        pokemonList
          .filter((name) => name.startsWith(value))
          .slice(0, 10)
      );
    } else {
      setSuggestions([]);
    }
  };

  const selectPokemon = async (name) => {
    setQuery(name);
    setSuggestions([]);
    try {
      const data = await searchPokemons(name);
      if (data) {
        onSelectPokemon(data);
      } else {
        console.error("Pokémon not found");
      }
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  return (
    <div className="p-4 w-72 z-50">
      <input
        value={query}
        onChange={handleChange}
        placeholder="Search Pokemon..."
        className="border p-2 w-full rounded bg-white"
      />
      {suggestions.length > 0 && (
        <div className="bg-white shadow-md rounded absolute w-65">
          <div className="text-xs text-blue-400 absolute left-2 top-0">
            Suggested Results
          </div>
          {suggestions.map((name) => (
            <div
              key={name}
              className="p-2 pt-4 cursor-pointer hover:bg-gray-100 capitalize"
              onClick={() => selectPokemon(name)
              }
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
