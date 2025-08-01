import PokemonCard from "../components/PokemonCard"
import { getPokemons, searchPokemons } from "../api/pokemonApi";
import { getPokemonsByType } from "../api/typeApi";
import { useState, useEffect } from "react"
import PokemonModal from "../components/PokemonModal";
import SortPokemon from "../components/SortPokemon";
import SkeletonCard from "../components/SkeletonCard"
import SearchBar from "../components/SearchBar";
import { motion } from "framer-motion";

function Home() {
  const [ searchQuery, setSearchQuery ] = useState("");
  const [ pokemons, setPokemons ] = useState([]);
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ offset, setOffset] = useState(0);
  const limit = 20;
  const [ pickedPokemon, setPickedPokemon ] = useState(null);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isFiltered, setIsFiltered ] = useState(false);
  const [ filterType, setFilterType ] = useState(null);
  const [ sortOption, setSortOption ] = useState("number");

  useEffect(() => {
    const loadPokemons = async () => {
      setLoading(true);
      try {
        if (isFiltered) {
          const Pokemons = await getPokemonsByType(filterType, offset, limit);
          setPokemons((prev) => {
            const merged = [...prev, ...Pokemons];
            return merged.filter(
              (p, index, self) => index === self.findIndex((x) => x.id === p.id)
            );
          });
        } else {
          const Pokemons = await getPokemons(offset, limit);
          setPokemons((prev) => {
            const merged = [...prev, ...Pokemons];
            return merged.filter(
              (p, index, self) => index === self.findIndex((x) => x.id === p.id)
            );
          });
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load Pokémons");
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, [offset, isFiltered, filterType]); 


  const handleLoadMore = () => {
    if (!loading) {
      setOffset((prev) => prev + limit);
    }
  };

  const handleTypeClick = (type) => {
    setPokemons([]);
    setOffset(0);
    setIsFiltered(true);
    setFilterType(type.toLowerCase());
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResult = await searchPokemons(searchQuery);
      if (searchResult) {
        setPickedPokemon(searchResult);
        setIsModalOpen(true);    
        setError(null);
      } else {
        setError("Pokémon not found.");
      }
    } catch (error) {
      console.log(error);
      setError("Error loading Pokémon.");
    } finally {
      setLoading(false);
    }
  };

  const sortedList = [...pokemons].sort((a, b) => {
    if (sortOption === "a-z") return a.name.localeCompare(b.name);
    if (sortOption === "z-a") return b.name.localeCompare(a.name);
    if (sortOption === "highest") return b.id - a.id;
    return a.id - b.id;
  });


  return (
    <main className=" h-dvh font-[flexo] relative z-0">
    <form onSubmit={handleSearch} className="search-form flex justify-center">
      <div className="flex gap-5 items-center max-sm:flex-col max-sm:gap-2">
        <SearchBar
        onSelectPokemon={(pokemon) => (setPickedPokemon(pokemon),setIsModalOpen(true))}/>
        <SortPokemon setSortOption={setSortOption} sortOption={sortOption}/>
      </div>
    </form>
    {
      loading ? (
        <>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] max-md:grid-cols-3 max-lg:grid-cols-4 max-sm:grid-cols-2 gap-2 mt-5">
        {Array.from({ length: offset }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
        </>
      ) : (
        <>
        <div className='pokemon-grid grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] max-md:grid-cols-3 max-lg:grid-cols-4 max-sm:grid-cols-2 gap-x-2 gap-y-3 overflow-y-hidden mt-5 text-center'> 
          {sortedList.map((pokemon) => {
            const randomDelay = Math.random() * 0.5;

            return (
              <motion.div
                key={pokemon.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: randomDelay }}
              >
                <PokemonCard
                  pokemon={pokemon}
                  onClick={() => {
                    setPickedPokemon(pokemon);
                    setIsModalOpen(true);
                  }}
                />
              </motion.div>
            );
          })}
        </div>
        <div className="flex justify-center my-7">
          <button className="bg-red-500 rounded-md text-white px-5 py-3 cursor-pointer hover:bg-red-400 font-bold max-md:mb-[100px] mb-10"
          onClick={handleLoadMore}> <i className="fas fa-bolt"></i> Load More..</button>
        </div>
        </>
      )
    }
     {
     isModalOpen && (<PokemonModal 
     key= {pickedPokemon.name}
     pokemon = {pickedPokemon}
     setPickedPokemon = {setPickedPokemon}
     setIsFiltered={setIsFiltered}
     handleTypeClick={handleTypeClick}
     onClose = {() => {
      setIsModalOpen(false)
     }}
     />)
     }
    </main>
  )
}

export default Home
