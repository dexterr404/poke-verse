import { useState,useEffect,createContext,useContext } from "react"
import { fetchPokemonCollections, removePokemonCollection, addPokemonCollection } from "../firebase/collectionService";
import { useAuth } from "../auth/AuthContext";

const PokemonContext = createContext();

export const usePokemonContext = () => useContext(PokemonContext)

export const PokemonProvider = ({children}) => {
    const { user } = useAuth()
    const [ collection, setCollection] = useState([]);
    
    useEffect(() => {
    const loadCollection = async () => {
        if (!user) {
            setCollection([]);
            return;
        } 
        try {
            const storedCollections = await fetchPokemonCollections(user.uid);
            setCollection(storedCollections);
        } catch (err) {
            console.error("Failed to fetch collection:", err);
        }
    };

    loadCollection();
    }, [user]);

    const addToPokemonCollection = async (pokemon) => {
        if(!user) return;

        await addPokemonCollection(user.uid, pokemon);
        setCollection((prev) => {
            if (prev.some((p) => p.id === pokemon.id)) {
            return prev;
            }
            return [...prev, pokemon];
        });
    };

    const removeFromPokemonCollection = async (pokemonId) => {
        if(!user) return;

        await removePokemonCollection(user.uid, pokemonId);
        setCollection((prev) => prev.filter((p) => p.id !== pokemonId));
    };

    const isCollected = (pokemonId) => {
        return collection.some(pokemon => pokemon.id === pokemonId)
    }

    const value = {
        collection,
        addToPokemonCollection,
        removeFromPokemonCollection,
        isCollected
    }

    return <PokemonContext.Provider value = {value}>
        {children}
    </PokemonContext.Provider>
}