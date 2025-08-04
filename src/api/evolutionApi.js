import { BASE_URL } from "./pokemonApi";

async function getEvolutionStages(evolutionChainUrl) {
  const res = await fetch(evolutionChainUrl);
  const data = await res.json();

  const stages = [];
  const queue = [{ evo: data.chain, stage: 0 }];

  while (queue.length) {
    const { evo, stage } = queue.shift();
    if (!stages[stage]) stages[stage] = [];

    try {
      // ✅ Get species data to find the default variety (valid Pokémon endpoint)
      const speciesRes = await fetch(`${BASE_URL}/pokemon-species/${evo.species.name}`);
      const speciesData = await speciesRes.json();
      const defaultVariety = speciesData.varieties.find((v) => v.is_default);

      if (!defaultVariety) {
        console.warn(`Skipping evolution: No default variety for ${evo.species.name}`);
        continue;
      }

      const pokeRes = await fetch(defaultVariety.pokemon.url);
      if (!pokeRes.ok) {
        console.warn(`Skipping evolution: ${evo.species.name} not found`);
        continue;
      }

      const pokeData = await pokeRes.json();

      stages[stage].push({
        name: evo.species.name,
        id: pokeData.id,
        image: pokeData.sprites.other["official-artwork"].front_default,
      });

      evo.evolves_to.forEach((nextEvo) => {
        queue.push({ evo: nextEvo, stage: stage + 1 });
      });
    } catch (err) {
      console.error(`Error fetching evolution for ${evo.species.name}:`, err);
    }
  }

  return stages;
}

export async function getPokemonEvolutionStages(pokemonName) {
  const speciesRes = await fetch(`${BASE_URL}/pokemon-species/${pokemonName}`);
  const speciesData = await speciesRes.json();
  return await getEvolutionStages(speciesData.evolution_chain.url);
}
