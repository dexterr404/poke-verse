import BouncingPokeBall from "./animation/BouncingPokeBall";

function SkeletonCard() {
  return (
    <div className="border-[0.8px] border-gray-100 shadow-2xs relative rounded-md animate-pulse">
      <div className="bg-gray-200 h-32 w-full rounded-t-md flex justify-center items-center">
        <BouncingPokeBall />
      </div>
      <div className="p-3">
        <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;
