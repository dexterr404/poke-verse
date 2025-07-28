import { useState, useEffect } from "react";

function usePokemonList() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
      const data = await res.json();
      setPokemonList(data.results.map((p) => p.name)); // only store names
    }
    fetchPokemons();
  }, []);

  return pokemonList;
}

export default usePokemonList;
