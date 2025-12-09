import { useState } from 'react'
import worldData from '../data/worldData.json'

function Map() {
  const [regions] = useState(worldData.regions || [])
  
  return (
    <div className="page-container">
      <header className="page-header">
        <h2>World Map</h2>
      </header>
      
      <div className="map-page-content">
        <h1>World Map</h1>
        <p className="page-description">Explore the regions of Terra Inter</p>
        
        <div className="map-container">
          <div className="map-placeholder">
            <p>Interactive map coming soon...</p>
            
            <div className="region-list">
              {regions.map(region => (
                <div key={region.id} className="region-preview">
                  <h3>{region.name}</h3>
                  <p>{region.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map
