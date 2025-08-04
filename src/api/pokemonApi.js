import { getPokemonEvolutionStages } from "./evolutionApi";
import { getSpeciesData } from "./speciesApi";
import { getAbilitiesWithDetails } from "./abilitiesApi";
import { getTypeWeaknesses } from "./typeApi";

export const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemons = async ( offset=0, limit=20) => {
  const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
  const data = await response.json();


  const pokemonData = await Promise.all(
    data.results.map( async(pokemon) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();
        if (!details.is_default) return null;
        const { category, flavor, gender_rate, capture_rate, is_legendary, is_mythical  } = await getSpeciesData(details.species.name);
        const abilities = await getAbilitiesWithDetails(details.abilities);
        const weaknesses = await getTypeWeaknesses(details.types);
        const evolutions = await getPokemonEvolutionStages(details.species.name);

        let rarity = "common";
        if (is_mythical) rarity = "mythical";
        else if (is_legendary) rarity = "legendary";
        else if (capture_rate < 45) rarity = "rare";
        else if (capture_rate < 90) rarity = "uncommon";
  
        return{
            id: details.id,
            name: pokemon.name,
            image: details.sprites.other['official-artwork'].front_default,
            stats: details.stats,
            height: details.height/10,
            weight: details.weight/10,
            category: category.split(" ")[0],
            abilities,
            evolutions,
            gender_rate: gender_rate,
            types: details.types,
            weaknesses,
            flavor_text: flavor,
            rarity,
            capture_rate
        }
    })
  )
  return pokemonData
};

export const searchPokemons = async (query) => {
    const response = await fetch(`${BASE_URL}/pokemon/${query.toLowerCase()}`);
    const data = await response.json();
    if (!data.is_default) return null;
    const { category, flavor, gender_rate, capture_rate, is_legendary, is_mythical   } = await getSpeciesData(data.species.name);
    const abilities =  await getAbilitiesWithDetails(data.abilities);
    const weaknesses = await getTypeWeaknesses(data.types);
    const evolutions = await getPokemonEvolutionStages(data.species.name);

    let rarity = "common";
    if (is_mythical) rarity = "mythical";
    else if (is_legendary) rarity = "legendary";
    else if (capture_rate < 45) rarity = "rare";
    else if (capture_rate < 90) rarity = "uncommon";
  

    return {
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        stats: data.stats,
        height: data.height/10,
        weight: data.weight/10,
        category: category.split(" ")[0],
        abilities,
        evolutions,
        gender_rate: gender_rate,
        types: data.types,
        weaknesses,
        flavor_text: flavor,
        rarity,
        capture_rate
    }
}


