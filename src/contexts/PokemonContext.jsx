import { createContext, useContext, useEffect, useState } from "react";

const PokemonContext = createContext();

export const usePokemonContext = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }) => {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("pokemon_collection");
    setCollection(stored ? JSON.parse(stored) : []);
  }, []);

  const saveToLocalStorage = (pokemons) => {
    localStorage.setItem("pokemon_collection", JSON.stringify(pokemons));
  };

  const addToPokemonCollection = (pokemon) => {
    setCollection((prev) => {
      const alreadyExists = prev.some((p) => p.id === pokemon.id);
      if (alreadyExists) return prev;

      const updated = [...prev, pokemon];
      saveToLocalStorage(updated);
      return updated;
    });
  };

  const removeFromPokemonCollection = (pokemonId) => {
    setCollection((prev) => {
      const updated = prev.filter((p) => p.id !== pokemonId);
      saveToLocalStorage(updated);
      return updated;
    });
  };

  const isCollected = (pokemonId) => {
    return collection.some((pokemon) => pokemon.id === pokemonId);
  };

  return (
    <PokemonContext.Provider
      value={{
        collection,
        addToPokemonCollection,
        removeFromPokemonCollection,
        isCollected,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
