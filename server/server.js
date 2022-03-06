const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000, () => {
  console.log('Start server at port 3000')
})

const books = require('../db.json')

// Get All book
app.get('/books', (req, res) => {
  res.json(books)
})

// Get by Id
app.get('/books/:id', (req, res) => {
  res.json(books.find((book) => book.id === req.params.id))
})

// Create book
app.post('/books', (req, res) => {
  if (req.body.id !== '' && req.body.name !== '') {
    books.push(req.body)
    res.status(201).json(req.body)
  }
})

//Update book
app.put('/books/:id', (req, res) => {
  const updateIndex = books.findIndex((book) => book.id === req.params.id)
  res.json(Object.assign(books[updateIndex], req.body))
})


//Delete book
app.delete('/books/:id', (req, res) => {
    const deleteIndex = books.findIndex((book) => book.id === req.params.id)
    books.splice(deleteIndex, 1)
    res.status(204).send()
})