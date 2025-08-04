import { typeIconClasses } from '../utils/typeIcons'
import { typeColors } from "../utils/typeColors";
import { usePokemonContext } from '../contexts/PokemonContext';

function PokemonCard({pokemon, onClick}){
    const {isCollected, removeFromPokemonCollection} = usePokemonContext()
    const collected = isCollected(pokemon.id)

    function onCollectClick(e){
        e.preventDefault();
        if(collected) removeFromPokemonCollection(pokemon.id)
    }

    return (
        <>
        <div className="pokemon-card border-[0.8px] bg-white/60 backdrop-blur-md border-gray-100 shadow-2xs relative ">
            <div className="pokemon-image">
                <img onClick={onClick} className="w-full mx-auto cursor-pointer" src={pokemon.image}/>
            </div>
            <div className="class-overlay">
                <button className="favorite-btn absolute w-5 top-1 right-1 cursor-pointer"
                onClick={onCollectClick}><i 
                    className={`fa-solid fa-heart ${
                    collected ? "text-red-500" : "text-gray-400"
                }`}></i></button>
            </div>
            <div className="pokemon-info pb-2">
                <div className="flex gap-2">
                    <p className='text-left text-gray-700 font-bold text-[14px] ml-2'>#{pokemon.id}</p>
                    <div className="pokemon-types grid grid-cols-[repeat(auto-fit,minmax(40px,1fr))] w-full pr-2  gap-2 text-[12px]">
                    {pokemon.types.map((typeObj, index) => (
                        <div key={index} className={`px-1 py-1 text-center ${typeColors[typeObj.type.name]} text-white capitalize`}>
                        <i className={`${typeIconClasses[typeObj.type.name]} text-gray-800 mr-1`}></i>
                        {typeObj.type.name}
                        </div>
                    ))}
                    </div>
                </div>
                <h3 className='capitalize mt-2.5'>{pokemon.name} </h3>
            </div>
        </div>
        </>
    )
}

export default PokemonCard