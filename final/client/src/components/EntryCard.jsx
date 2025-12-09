import { Link } from 'react-router-dom'

function EntryCard({ entry }) {
  return (
    <div className="entry-card">
      <div className="entry-card-header">
        <span className="entry-category-badge">{entry.category}</span>
        <h3>{entry.title}</h3>
      </div>
      
      <p className="entry-summary">{entry.summary}</p>
      
      <div className="entry-tags">
        {entry.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      
      <Link to={`/entry/${entry.id}`} className="read-more">
        Read More →
      </Link>
    </div>
  )
}

export default EntryCard
