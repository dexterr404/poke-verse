export async function getAbilitiesWithDetails(abilities) {
  return Promise.all(
    abilities.map( async(abilityObj) => {
      const res = await fetch(abilityObj.ability.url);
      const data = await res.json();

      const effectEntry = data.effect_entries.find((e) => e.language.name === "en");
      
      return {
        name: abilityObj.ability.name,
        is_hidden: abilityObj.is_hidden,
        effect: effectEntry?.short_effect || "No description available"
      }
    })
  );
}
