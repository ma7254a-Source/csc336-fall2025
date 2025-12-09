import EntryCard from './EntryCard'

function EntryList({ entries }) {
  //If no entries, show a message
  if (!entries || entries.length === 0) {
    return <div className="no-entries">No entries found.</div>
  }
  
  return (
    <div className="entry-list">
      {entries.map(entry => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

export default EntryList
