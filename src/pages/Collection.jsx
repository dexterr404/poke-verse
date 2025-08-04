import { usePokemonContext } from "../contexts/PokemonContext";
import PokemonCard from "../components/PokemonCard";
import PokemonModal from "../components/PokemonModal";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchPokemons } from "../api/pokemonApi";
import { Link } from "react-router-dom";

function Collection() {
  const { collection } = usePokemonContext();
  const [pickedPokemon, setPickedPokemon] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const modalParam = searchParams.get("modal");

  useEffect(() => {
    const fetchModalPokemon = async () => {
      if (!modalParam) {
        setPickedPokemon(null);
        return;
      }

      const found = collection.find((p) => p.name === modalParam.toLowerCase());
      if (found) {
        setPickedPokemon(found);
      } else {
        try {
          const fetched = await searchPokemons(modalParam);
          setPickedPokemon(fetched);
        } catch (err) {
          console.error("Failed to fetch Pokémon:", err);
          setPickedPokemon(null);
        }
      }
    };

    fetchModalPokemon();
  }, [modalParam, collection]);

  const handleTypeClick = (type) => {};

  const handleCardClick = (pokemon) => {
    setSearchParams({ modal: pokemon.name });
  };

  const handleCloseModal = () => {
    setSearchParams((prev) => {
      prev.delete("modal");
      return prev;
    });
    setPickedPokemon(null);
  };

  if (collection.length > 0) {
    return (
      <div>
        <div className="grid grid-cols-7 max-md:grid-cols-3 max-lg:grid-cols-4 max-sm:grid-cols-2 gap-2 text-center mt-3 mr-2">
          {collection.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => handleCardClick(pokemon)}
            />
          ))}
        </div>

        {pickedPokemon && (
          <PokemonModal
            key={pickedPokemon.name}
            pokemon={pickedPokemon}
            setPickedPokemon={setPickedPokemon}
            handleTypeClick={handleTypeClick}
            onClose={handleCloseModal}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex h-dvh justify-center items-center font-[flexo] text-white font-bold text-xl">
      <h1>
        No collected Pokémons yet?{" "}
        <Link to="/?modal=bulbasaur">
        <span className="hover:cursor-pointer text-red-600 hover:underline animate-pulse">
          Let’s catch some!
        </span>
        </Link>
      </h1>
    </div>
  );
}

export default Collection;
