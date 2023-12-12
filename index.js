import('node-fetch')

const express = require('express')
const Datastore = require('nedb')
const app = express()
const PORT = 3000
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


// This route posts to the client?

app.post('/api', (request, response) => {
  const data = request.body
  database.insert(data)
  response.json(data)
})

// I believe this route gets information from the client
  // No, it should be a get request towards the API_URL, so from the weather API.

app.get('/weather/', async (request, response) => {
  // const api_url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_Key}`
  const api_url = `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=94.04&appid=b6254fd4b457e5aa978aa18673562b99`
  const fetch_response = await fetch(api_url)
  const json = await fetch_response.json()
  response.json(json)
})

