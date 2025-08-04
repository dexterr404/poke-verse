import { useSearchParams } from "react-router-dom";

function SortPokemon({ setSortOption, sortOption }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex gap-2 items-center">
      <span className="text-[16px] text-white font-bold">Sort by</span>
      <select
        className="text-xs bg-black text-white px-4 py-1"
        value={sortOption}
        onChange={handleChange}
      >
        <option value="lowest">Lowest Number</option>
        <option value="highest">Highest Number</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
      </select>
    </div>
  );
}

export default SortPokemon;
