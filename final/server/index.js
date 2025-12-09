import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

const DATA_FILE = path.join(__dirname, 'data.json')

app.use(cors())
app.use(express.json())

function readData() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8')
  return JSON.parse(raw)
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

app.get('/api/items', (req, res) => {
  try {
    const data = readData()
    res.json(data)
  } catch (err) {
    console.error('Error reading data file:', err)
    res.status(500).json({ error: 'Failed to read data.' })
  }
})

app.post('/api/items', (req, res) => {
  try {
    const data = readData()
    const { title, category, summary, body, tags, regionId } = req.body

    const errors = {}

    if (!title || !title.trim()) {
      errors.title = 'Title is required.'
    }
    if (!category || !category.trim()) {
      errors.category = 'Category is required.'
    }
    if (!summary || summary.trim().length < 20) {
      errors.summary = 'Summary must be at least 20 characters.'
    }
    if (!body || body.trim().length < 50) {
      errors.body = 'Body must be at least 50 characters.'
    }

    //Prevent duplicate titles (case-insensitive)
    const titleExists = data.entries.some(
      e => e.title.toLowerCase() === title.trim().toLowerCase()
    )
    if (titleExists) {
      errors.title = 'An entry with this title already exists.'
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors })
    }

    const id = title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    const newEntry = {
      id,
      title: title.trim(),
      category: category.trim(),
      regionId: regionId || null,
      tags: Array.isArray(tags)
        ? tags
        : (tags || '')
            .split(',')
            .map(t => t.trim())
            .filter(Boolean),
      summary: summary.trim(),
      body: body.trim(),
      relatedIds: []
    }

    data.entries.push(newEntry)
    writeData(data)

    res.status(201).json(newEntry)
  } catch (err) {
    console.error('Error writing data file:', err)
    res.status(500).json({ error: 'Failed to save entry.' })
  }
})

app.get('/api/items/:id', (req, res) => {
  try {
    const data = readData()
    const entryId = req.params.id
    const entry = data.entries.find(e => e.id === entryId)

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found.' })
    }

    res.json(entry)
  } catch (err) {
    console.error('Error reading data file:', err)
    res.status(500).json({ error: 'Failed to read data.' })
  }
})


app.listen(PORT, () => {
  console.log(`Terra Inter API listening on port ${PORT}`)
})
