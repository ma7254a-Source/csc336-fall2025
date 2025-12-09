import { useState } from 'react'
import EntryList from '../components/EntryList'
import worldData from '../data/worldData.json'

function Compendium() {
  const [entries] = useState(worldData.entries || [])
  
  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Compendium</h2>
      </header>
      
      <div className="compendium-content">
        <h1>Compendium</h1>
        <p className="page-description">
          All entries in the Terra Inter world
        </p>
        
        <EntryList entries={entries} />
      </div>
    </div>
  )
}

export default Compendium
