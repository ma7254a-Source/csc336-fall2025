import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../apiConfig'

function EntryDetail() {
  const { id } = useParams()

  const [entry, setEntry] = useState(null)
  const [relatedEntries, setRelatedEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchEntry() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`${API_BASE_URL}/api/items/${id}`)
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Entry not found.')
          }
          throw new Error('Failed to load entry from the server.')
        }
        const data = await res.json()
        setEntry(data)

        if (data.relatedIds && data.relatedIds.length > 0) {
          const allRes = await fetch(`${API_BASE_URL}/api/items`)
          if (allRes.ok) {
            const allData = await allRes.json()
            const found = (allData.entries || []).filter(e =>
              data.relatedIds.includes(e.id)
            )
            setRelatedEntries(found)
          }
        } else {
          setRelatedEntries([])
        }
      } catch (err) {
        console.error(err)
        setError(err.message || 'Failed to load entry.')
      } finally {
        setLoading(false)
      }
    }

    fetchEntry()
  }, [id])

  if (loading) {
    return (
      <div className="page-container">
        <header className="page-header">
          <h2>Entry</h2>
        </header>
        <div className="entry-detail-page">
          <p>Loading entry...</p>
        </div>
      </div>
    )
  }

  if (error || !entry) {
    return (
      <div className="page-container">
        <header className="page-header">
          <h2>Entry</h2>
        </header>
        <div className="entry-detail-page">
          <p className="error-text">{error || 'Entry not found.'}</p>
          <Link to="/compendium" className="back-link">
            ← Back to Compendium
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Entry</h2>
      </header>

      <div className="entry-detail-page">
        <div className="entry-header">
          <span className="entry-category">{entry.category}</span>
          <h1>{entry.title}</h1>
        </div>

        {entry.tags && entry.tags.length > 0 && (
          <div className="entry-tags">
            {entry.tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="entry-summary">{entry.summary}</p>

        <div className="entry-body">
          <h2>Details</h2>
          <p>{entry.body}</p>
        </div>

        {relatedEntries.length > 0 && (
          <div className="related-entries">
            <h3>Related Entries</h3>
            <ul>
              {relatedEntries.map(rel => (
                <li key={rel.id}>
                  <Link to={`/entry/${rel.id}`}>{rel.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Link to="/compendium" className="back-link">
          ← Back to Compendium
        </Link>
      </div>
    </div>
  )
}

export default EntryDetail
