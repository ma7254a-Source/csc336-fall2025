import { useState } from 'react'
import EntryList from '../components/EntryList'
import worldData from '../data/worldData.json'

function Compendium() {
  const [entries] = useState(worldData.entries || [])
  
  return (
    <div className="compendium-page">
      <h1>Compendium</h1>
      <p className="page-description">
        All entries in the Terra Inter world
      </p>
      <EntryList entries={entries} />
    </div>
  )
}

export default Compendium
