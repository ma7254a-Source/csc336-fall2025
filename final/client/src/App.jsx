import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Home from './pages/Home'
import Compendium from './pages/Compendium'
import EntryDetail from './pages/EntryDetail'
import Map from './pages/Map'
import CreateEntry from './pages/CreateEntry'
import './App.css'

function App() {
  return (
    <div className="app">
      <Nav />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compendium" element={<Compendium />} />
          <Route path="/entry/:id" element={<EntryDetail />} />
          <Route path="/map" element={<Map />} />
          <Route path="/create" element={<CreateEntry />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
