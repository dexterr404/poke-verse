import pokedexLogo from '../assets/pokedex-logo.png';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useAuth } from '../auth/AuthContext';

function NavBar(){
    const { user, loginWithGoogle, logout } = useAuth();
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);

    return <nav className='flex justify-between px-4 bg-red-700 items-center text-white border-b-4 border-b-black'>
        <div className='flex items-center'>
            <img src={pokedexLogo} alt="Pokedex Logo" className='w-10 cursor-pointer'/>
            <p className='font-[Pokemon] text-[#feca17] outlined-text'>PokeVerse</p>
        </div>
        <div>
            <ul className='grid grid-cols-[repeat(3,150px)] transform -skew-x-20 text-base font-bold max-md:hidden text-center'>
                <Link to='/'><li className='cursor-pointer hover:text-gray-300 border-x-[0.8px] border-black hover:bg-red-500 w-full px-3 py-2' alt='Home'>Home</li></Link>
                <Link to='/Compare'><li className='cursor-pointer hover:text-gray-300 border-r-[0.8px] border-black hover:bg-red-500 w-full px-3 py-2' alt='Compare'>Compare</li></Link>
                <Link to='/Collection'><li className='cursor-pointer hover:text-gray-300 border-r-[0.8px] border-black hover:bg-red-500 w-full px-3 py-2' alt='Collection'>Collection</li></Link>
            </ul>
        </div>
        <div className="relative">
            <button  onClick={() => setIsMenuOpen((prev) => !prev
             )}
            className='px-3 py-2 cursor-pointer hover:bg-red-500'><i className="fa-solid fa-user text-white"></i></button>
            {
                isMenuOpen && (<div className="absolute right-[-8px] mt-2 bg-white text-black rounded h-10 shadow-md w-40 z-50"> 
                { user ? (<button onClick={logout} className="block w-full text-left px-3 py-2 hover:bg-gray-200"><i className="fa fa-sign-out"></i> Logout </button>
                ) : (<button onClick={loginWithGoogle}className="block w-full text-left px-3 py-2 hover:bg-gray-200"><i className="fa fa-sign-in"></i>Login</button>)}</div>)
            }
        </div>
    </nav>
}

export default NavBar