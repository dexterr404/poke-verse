import { BASE_URL } from "./pokemonApi";
import { getPokemonEvolutionStages } from "./evolutionApi";
import { getSpeciesData } from "./speciesApi";
import { getAbilitiesWithDetails } from "./abilitiesApi";

export const getPokemonsByType = async (type, offset = 0, limit = 20) => {
  const response = await fetch(`${BASE_URL}/type/${type}`);
  const data = await response.json();

  if (!data.pokemon) return [];

  const selected = data.pokemon.slice(offset, offset + limit);

  const pokemonData = await Promise.all(
    selected.map(async (p) => {
      const res = await fetch(p.pokemon.url);
      const details = await res.json();
      if(!details.is_default) return null;
      const id = details.id;
      const { category, flavor, gender_rate, capture_rate, is_legendary, is_mythical } = await getSpeciesData(details.species.name);
      const abilities = await getAbilitiesWithDetails(details.abilities);
      const weaknesses = await getTypeWeaknesses(details.types);
      const evolutions = await getPokemonEvolutionStages(details.species.name);

      let rarity = "common";
        if (is_mythical) rarity = "mythical";
        else if (is_legendary) rarity = "legendary";
        else if (capture_rate < 45) rarity = "rare";
        else if (capture_rate < 90) rarity = "uncommon";

      return {
        id,
        name: details.name,
        image: details.sprites.other["official-artwork"].front_default,
        stats: details.stats,
        height: details.height / 10,
        weight: details.weight / 10,
        category: category.split(" ")[0],
        abilities,
        evolutions,
        gender_rate,
        types: details.types,
        weaknesses,
        flavor_text: flavor,
        rarity,
        capture_rate
      };
    })
  );

  return pokemonData.filter(Boolean);
};

export async function getTypeWeaknesses(types) {
  const TYPE_URL = `${BASE_URL}/type/`;
  const weaknesses = new Set();
  
  for(const typeObj of types) {
    const res = await fetch(`${TYPE_URL}${typeObj.type.name}`);
    const data = await res.json();
    const typeWeaknesses = data.damage_relations.double_damage_from.map( t => t.name);
    
    typeWeaknesses.forEach((weakness) => weaknesses.add(weakness));
  }
  return Array.from(weaknesses);
}