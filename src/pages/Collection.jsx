import { usePokemonContext } from "../contexts/PokemonContext"
import PokemonCard from "../components/PokemonCard"
import { useState } from "react";
import PokemonModal from "../components/PokemonModal";

function Collection() {
    const {collection} = usePokemonContext();
    const [ pokemons, setPokemons ] = useState([]);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ offset, setOffset] = useState(0);
    const limit = 100;
    const [ pickedPokemon, setPickedPokemon ] = useState(null);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isFiltered, setIsFiltered ] = useState(false);
    const [ filterType, setFilterType ] = useState(null);

    const handleTypeClick = (type) => {
        setPokemons([]);
        setOffset(0);
        setIsFiltered(true);
        setFilterType(type.toLowerCase());
    };

    if(collection.length>0) {
        return (
            <div>
                <div className="grid  grid-cols-7 max-md:grid-cols-3 max-lg:grid-cols-4 max-sm:grid-cols-2 gap-2 text-center mt-3 mr-2">
                    {collection.map((pokemon) => (
                        <PokemonCard pokemon={pokemon} key={pokemon.id}
                        onClick = {() => {
                        setPickedPokemon(pokemon),
                        setIsModalOpen(true)}}/>
                    ))
                    }
                </div>
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
            </div>
        )
    }
    return <div className="flex h-dvh justify-center items-center font-[flexo] text-white font-bold text-xl">
        <h1>No Collected pokemons yet?, <span className="hover:cursor-pointer text-red-600 hover:underline animate-pulse">let's catch some!</span></h1>
    </div>
}

export default Collection