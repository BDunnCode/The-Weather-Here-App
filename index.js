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
    // It's definitely an endpoint that allows the client side to get a weather object using an HTTP get request. I'm fairly 
    // sure about that, but I think it does other things. It's like when someone on an approved client side makes a get request
    // to this endpoint, it will prompt a function that makes a get request to the weather API, which is captures inside of fetch
    // response, and then sends that fetch response over to original maker of the get request in the first place. This is poorly
    // worded, but fairly correct.
    
      // After that portion comes parameters being added in the routing which is what's going to allow for, at least in this case,
      // variables to be passed along via those HTTP requests as far as I can tell. The latitude and longitude pulled from the 
      // geolocation tool inside of the index should get send along with the get request, giving a dynamic latitude and longitude
      // that will then be sent over to the open weather API, allowing the weather to be passed to the client side.

app.get('/weather/:latlon', async (request, response) => {
  console.log(request.params)
  const latlon = request.params.latlon.split(',')
  console.log(latlon)
  const lat = latlon[0]
  const lon = latlon[1]
  console.log(lat, lon)
  const api_url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=b6254fd4b457e5aa978aa18673562b99`
  const fetch_response = await fetch(api_url)
  const json = await fetch_response.json()
  response.json(json)
})

