import { Link } from "react-router-dom";

function BottomNavBar() {
  return (
    <div>
      <ul className="flex justify-around fixed bottom-0 left-0 right-0 shadow-md z-20 md:hidden bg-red-600 text-white text-xs font-[Flexo] ">
        <li className="cursor-pointer w-full py-2 text-center">
          <Link to="/" className="flex flex-col items-center gap-0.5">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="tabler-icon tabler-icon-layout-grid"
            >
            <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
            <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
            <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
            <path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
            </svg>
            <span>Pokemons</span>
          </Link>
        </li>

        <li className="cursor-pointer w-full py-2 text-center">
          <Link to="/Compare" className="flex flex-col items-center gap-0.5">
            <i className="fa-solid fa-swatchbook text-lg"></i>
            <span>Compare</span>
          </Link>
        </li>

        <li className="cursor-pointer w-full py-2 text-center">
          <Link to="/Collection" className="flex flex-col items-center gap-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tabler-icon"
            >
              <path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2"></path>
              <path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9"></path>
              <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12"></path>
            </svg>
            <span>Collection</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default BottomNavBar;
