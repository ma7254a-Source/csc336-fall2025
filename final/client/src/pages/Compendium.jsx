import { useState, useEffect } from 'react'
import EntryList from '../components/EntryList'
import { API_BASE_URL } from '../apiConfig' 

function Compendium() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchEntries() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`${API_BASE_URL}/api/items`) 
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        setEntries(data.entries || [])
      } catch (err) {
        console.error(err)
        setError('Failed to load entries from the server.')
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [])

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

        {loading && <p>Loading entries...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && <EntryList entries={entries} />}
      </div>
    </div>
  )
}

export default Compendium
