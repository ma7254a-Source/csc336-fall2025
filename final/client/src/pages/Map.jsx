import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../apiConfig'
import worldmap from '../assets/worldmap.png'

function Map() {
  const [regions, setRegions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchRegions() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`${API_BASE_URL}/api/items`)
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        setRegions(data.regions || [])
      } catch (err) {
        console.error(err)
        setError('Failed to load regions from the server.')
      } finally {
        setLoading(false)
      }
    }

    fetchRegions()
  }, [])

  return (
    <div className="page-container map-page-container">
      <header className="page-header">
        <h2>World Map</h2>
      </header>

      <div className="map-page-content">
        <h1>World Map</h1>
        <p className="page-description">Explore the regions of Terra Inter</p>

        {loading && <p>Loading regions...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <div className="map-container">
            <div className="map-content">
              <img
                src={worldmap}
                alt="Terra Inter world map"
                className="world-map-image"
              />
              {/*placeholder card removed for actual map*/}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Map
