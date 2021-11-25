const connectToMongo = require('./db')

connectToMongo();

const express = require('express')
const app = express()
const port = 5000

app.use(express.json())

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes.js'))

app.listen(port, () => {
  console.log(`myNotebook Backend listening at http://localhost:${port}`)
})