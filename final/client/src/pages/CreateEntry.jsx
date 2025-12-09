import { useState } from 'react'
import { API_BASE_URL } from '../apiConfig'

function CreateEntry() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'location',
    summary: '',
    body: '',
    tags: ''
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    setErrors(prev => ({
      ...prev,
      [name]: ''
    }))
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required.'
    }

    if (!formData.summary.trim()) {
      newErrors.summary = 'Summary is required.'
    } else if (formData.summary.trim().length < 20) {
      newErrors.summary = 'Summary should be at least 20 characters.'
    }

    if (!formData.body.trim()) {
      newErrors.body = 'Full description is required.'
    } else if (formData.body.trim().length < 50) {
      newErrors.body = 'Full description should be at least 50 characters.'
    }

    if (!formData.category) {
      newErrors.category = 'Category is required.'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSubmitted(false)
      return
    }

    setErrors({})
    setSubmitted(false)

    try {
      const response = await fetch(`${API_BASE_URL}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        if (data.errors) {
          setErrors(data.errors)
        } else {
          setErrors({ form: 'Server error while saving entry.' })
        }
        return
      }

      const savedEntry = await response.json()
      console.log('Saved entry:', savedEntry)

      setSubmitted(true)

      setFormData({
        title: '',
        category: 'location',
        summary: '',
        body: '',
        tags: ''
      })
    } catch (err) {
      console.error(err)
      setErrors({ form: 'Network error while contacting the server.' })
    }
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Add Entry</h2>
      </header>

      <div className="create-entry-page">
        <h1>Create New Entry</h1>
        <p className="page-description">
          Add a new location, faction, or character to Terra Inter
        </p>

        {errors.form && <p className="error-text">{errors.form}</p>}
        {submitted && !errors.form && (
          <div className="form-success">
            Entry saved successfully to the server.
          </div>
        )}

        <form onSubmit={handleSubmit} className="entry-form" noValidate>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'input-error' : ''}
            />
            {errors.title && <p className="error-text">{errors.title}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'input-error' : ''}
            >
              <option value="location">Location</option>
              <option value="faction">Faction</option>
              <option value="character">Character</option>
              <option value="event">Event</option>
            </select>
            {errors.category && <p className="error-text">{errors.category}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="summary">Summary *</label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows="3"
              className={errors.summary ? 'input-error' : ''}
            />
            {errors.summary && <p className="error-text">{errors.summary}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="body">Full Description *</label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              rows="8"
              className={errors.body ? 'input-error' : ''}
            />
            {errors.body && <p className="error-text">{errors.body}</p>}
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
            <p className="helper-text">
              Optional. Separate tags with commas to help classify this entry.
            </p>
          </div>

          <button type="submit" className="submit-btn">
            Create Entry
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateEntry
