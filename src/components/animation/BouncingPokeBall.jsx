import pokeball from '../../assets/pokeball.png';

function BouncingPokeBall() {
  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <img
        src={pokeball}
        className="w-3 animate-bounce animate-spin-slow"
        alt="Loading Pokeball"
      />
      Loading...
    </div>
  );
}

export default BouncingPokeBall;