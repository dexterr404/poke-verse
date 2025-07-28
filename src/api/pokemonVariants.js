import { getSpeciesData } from "./speciesApi";
import { getAbilitiesWithDetails } from "./abilitiesApi";
import { getTypeWeaknesses } from "./typeApi";
import { getPokemonEvolutionStages } from "./evolutionApi";
import { BASE_URL } from "./pokemonApi";

export async function getPokemonVariants(pokemonName) {
  const baseName = pokemonName.toLowerCase();

  // ✅ Fetch species data ONCE
  const speciesRes = await fetch(`${BASE_URL}/pokemon-species/${baseName}`);
  if (!speciesRes.ok) return []; // No species found
  const speciesData = await speciesRes.json();

  const variants = [];

  // ✅ Only fetch normal varieties if there are more than 1 (default + variants)
  if (speciesData.varieties.length > 1) {
    const normalVariants = await Promise.all(
      speciesData.varieties
        .filter((v) => !v.is_default)
        .map(async (variant) => {
          const variantRes = await fetch(variant.pokemon.url);
          if (!variantRes.ok) return null;
          const variantData = await variantRes.json();

          // ✅ Get full data for the variant
          const { category, flavor, gender_rate } = await getSpeciesData(
            variantData.species.name
          );
          const abilities = await getAbilitiesWithDetails(variantData.abilities);
          const weaknesses = await getTypeWeaknesses(variantData.types);
          const evolutions = await getPokemonEvolutionStages(variantData.species.name);

          return {
            id: variantData.id,
            name: variantData.name,
            image: variantData.sprites.other["official-artwork"].front_default,
            stats: variantData.stats,
            height: variantData.height / 10,
            weight: variantData.weight / 10,
            category: category.split(" ")[0],
            abilities,
            evolutions,
            variants: [], // ✅ You can call getPokemonVariants recursively, but avoid infinite loops
            gender_rate: gender_rate,
            types: variantData.types,
            weaknesses,
            flavor_text: flavor
          };
        })
    );
    variants.push(...normalVariants.filter(Boolean));
  }

  // ✅ Only manually check regional forms if the Pokémon is known to have them
  const knownRegionalForms = {
    tauros: ["tauros-paldea-combat", "tauros-paldea-blaze", "tauros-paldea-aqua"],
    meowth: ["meowth-alola", "meowth-galar"],
    rattata: ["rattata-alola"],
    raichu: ["raichu-alola"],
    // 👉 Add more known regional forms here as needed
  };

  if (knownRegionalForms[baseName]) {
    for (const formName of knownRegionalForms[baseName]) {
      try {
        const formRes = await fetch(`${BASE_URL}/pokemon/${formName}`);
        if (!formRes.ok) continue;
        const formData = await formRes.json();

        // ✅ Get full data for regional form
        const { category, flavor, gender_rate } = await getSpeciesData(
          formData.species.name
        );
        const abilities = await getAbilitiesWithDetails(formData.abilities);
        const weaknesses = await getTypeWeaknesses(formData.types);
        const evolutions = await getPokemonEvolutionStages(formData.species.name);

        variants.push({
          id: formData.id,
          name: formData.name,
          image: formData.sprites.other["official-artwork"].front_default,
          stats: formData.stats,
          height: formData.height / 10,
          weight: formData.weight / 10,
          category: category.split(" ")[0],
          abilities,
          evolutions,
          variants: [], // Avoid infinite recursion
          gender_rate: gender_rate,
          types: formData.types,
          weaknesses,
          flavor_text: flavor
        });
      } catch (e) {
        console.warn(`Skipping missing regional form: ${formName}`);
      }
    }
  }

  return variants;
}
