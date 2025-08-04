import Home from './pages/Home'
import Collection from './pages/Collection'
import Compare from './pages/Compare'
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
import { PokemonProvider } from './contexts/PokemonContext'
import BottomNavBar from './components/BottomNavBar'

const App = () => {
  return (
      <PokemonProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Collection" element={<Collection />}/>
        <Route path="/Compare" element={<Compare />}></Route>
      </Routes>
      <BottomNavBar />
      </PokemonProvider>
  )
}

export default App
