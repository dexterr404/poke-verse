import { db } from "./firebase";
import { collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";

export const fetchPokemonCollections = async (userId) => {
  const snapshot = await getDocs(collection(db, "users", userId, "collection"));
  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return JSON.parse(data.pokemon);
  });
};

export const addPokemonCollection = async (userId, pokemon) => {
  if(!pokemon || !pokemon.id) {
    alert("No pokemon");
    return
  }
  const collectionRef = doc(db, "users", userId, "collection", pokemon.id.toString());
  await setDoc(collectionRef, {
    pokemon: JSON.stringify(pokemon),
  });
};

export const removePokemonCollection= async (userId, pokemonId) => {
  const collectionRef = doc(db, "users", userId, "collection", pokemonId.toString());
  await deleteDoc(collectionRef);
};
