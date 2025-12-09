import { useParams, Link } from 'react-router-dom'
import worldData from '../data/worldData.json'

function EntryDetail() {
  //Get the 'id' from the URL (e.g., /entry/city-aureldun)
  const { id } = useParams()
  
  //Find the entry that matches this id
  const entry = worldData.entries.find(e => e.id === id)
  
  //If entry doesn't exist, show error
  if (!entry) {
    return <div className="entry-not-found">Entry not found</div>
  }
  
  return (
    <div className="entry-detail-page">
      <div className="entry-header">
        <span className="entry-category">{entry.category}</span>
        <h1>{entry.title}</h1>
      </div>
      
      <div className="entry-tags">
        {entry.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      
      <p className="entry-summary">{entry.summary}</p>
      
      <div className="entry-body">
        <h2>Details</h2>
        <p>{entry.body}</p>
      </div>

      {/*Show related entries if they exist*/}
      {entry.relatedIds && entry.relatedIds.length > 0 && (
        <div className="related-entries">
          <h3>Related Entries</h3>
          <ul>
            {entry.relatedIds.map(relatedId => {
              const related = worldData.entries.find(e => e.id === relatedId)
              return related ? (
                <li key={relatedId}>
                  <Link to={`/entry/${relatedId}`}>{related.title}</Link>
                </li>
              ) : null
            })}
          </ul>
        </div>
      )}
      
      <Link to="/compendium" className="back-link">← Back to Compendium</Link>
    </div>
  )
}

export default EntryDetail
