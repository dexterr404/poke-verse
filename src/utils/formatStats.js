export const formatStats = (statsArray) => {
  return {
    hp: statsArray.find(s => s.stat.name === "hp")?.base_stat || 0,
    attack: statsArray.find(s => s.stat.name === "attack")?.base_stat || 0,
    defense: statsArray.find(s => s.stat.name === "defense")?.base_stat || 0,
    specialAttack: statsArray.find(s => s.stat.name === "special-attack")?.base_stat || 0,
    specialDefense: statsArray.find(s => s.stat.name === "special-defense")?.base_stat || 0,
    speed: statsArray.find(s => s.stat.name === "speed")?.base_stat || 0,
  };
};
