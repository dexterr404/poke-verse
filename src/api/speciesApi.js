 import { BASE_URL } from "./pokemonApi";
 
 export async function getSpeciesData(pokemonName) {
   const speciesRes = await fetch(`${BASE_URL}/pokemon-species/${pokemonName}`);
   const speciesData = await speciesRes.json();
   const entry = speciesData.flavor_text_entries.find(
      (e) => e.language.name === "en"
    )
    const flavor = entry.flavor_text.replace(/\n|\f/g, " ");

    const category = speciesData.genera.find(
      (g) => g.language.name === "en").genus;

    return {
      category,
      flavor,
      gender_rate: speciesData.gender_rate,
      capture_rate: speciesData.capture_rate,
      is_legendary: speciesData.is_legendary,
      is_mythical: speciesData.is_mythical
    }
}