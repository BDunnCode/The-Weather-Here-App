const express = require('express')
const app = express()
const PORT = 3000
const Datastore = require('nedb')
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`))


const database = new Datastore('database.db')
database.loadDatabase()

app.get('/api', (request, response) => {
  database.find({},(err, data) => {
      if (err) {
        response.end()
        return
      }
      response.json(data)
  })
})

app.post('/api', (request, response) => {
  const data = request.body
  database.insert(data)
  response.json(data)
})
