import { useState } from 'react'

function CreateEntry() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'location',
    summary: '',
    body: '',
    tags: ''
  })
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }
  
  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Add Entry</h2>
      </header>
      
      <div className="create-entry-page">
        <h1>Create New Entry</h1>
        <p className="page-description">Add a new location, faction, or character to Terra Inter</p>
        
        <form onSubmit={handleSubmit} className="entry-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="location">Location</option>
              <option value="faction">Faction</option>
              <option value="character">Character</option>
              <option value="event">Event</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="summary">Summary *</label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="body">Full Description *</label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              rows="8"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="city, trade hub, frost"
            />
          </div>
          
          <button type="submit" className="submit-btn">Create Entry</button>
        </form>
      </div>
    </div>
  )
}

export default CreateEntry
