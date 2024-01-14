import('node-fetch')
const express = require('express')
const Datastore = require('nedb')
require('dotenv').config()
console.log(process.env)
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
        console.log('error')
        response.end()
        return
      }
      console.log('success get')
      response.json(data)
  })
})




app.post('/api', (request, response) => {
  const data = request.body
  database.insert(data, (err, data) => {
    if(err) {
      console.log('post Error')
      response.end()
      return
    }
  })

  response.json(data)
  console.log('no errors on post')
})


// Seems like this is missing error handling.

// I believe this route allows the client side to make a get request to the server, and then the server makes a call to the 
// two different weather APIs on the client side's behalf.

app.get('/weather/:latlon', async (request, response) => {
  console.log(request.params)
  const latlon = request.params.latlon.split(',')
  console.log(latlon)
  const lat = latlon[0]
  const lon = latlon[1]
  console.log(lat, lon)
  const api_key = process.env.API_KEY
  const weather_url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`
  const weather_response = await fetch(weather_url)
  const weather_data = await weather_response.json()

  const aq_url = `https://api.openaq.org/v2/latest?coordinates=${lat},${lon}`
  const aq_response = await fetch(aq_url)
  const aq_data = await aq_response.json()

  const data = {
    weather_api_response: weather_data,
    aq_api_response: aq_data
  }


  response.json(data)
})

