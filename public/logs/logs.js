const mapContainer = document.getElementById('themap')
const mymap = L.map(mapContainer).setView([0, 0], 1)
const attribution = '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, { attribution })
tiles.addTo(mymap)


getData()

async function getData() {
  const response = await fetch('/api')
  const data = await response.json()
  console.log(data)
  for (item of data) {
    const marker = L.marker([item.lat, item.lon]).addTo(mymap)
    console.log(item.lat, item.lon)
    let airText = '' 
    

    if (item.weather != null ) {

    
    if (air_response != null) {
      airText = `Now let's get a reading for the air quality. OpenAQ API shows a 
      reading of ${air_response.value}${air_response.unit} of ${air_response.parameter} ${air_response.lastUpdated}`
  
    } else {
      airText = `There is no particulate data for this latitude and longitude`
    }
    const txt = `
    The weather here at ${item.lat}°,${item.lon}° shows ${weather_reponse.weather[0].main.toLowerCase()}, with a temperature
    of ${((weather_response.temp - 273.15) * 9/5 + 32).toFixed()}°F. ${airText}`
    

    // The problems with the OpenAQ API break the functionality on this and seem to cause the loop to error out and stop working.
    // Might want to concatenate the air quality portion second because it's gonna cause all kinds of problems.

    // Gonna try to go over to the server in index.js and see if I can JSON.parse() the data received by AQ API and see if that allows me 
    // to make translation more reliable.
    
  marker.bindPopup(txt)
  }
}
  console.log(data)
}

// const root = document.createElement('div')
// const geo = document.createElement('div')

// geo.textContent = `${item.lat}°, ${item.lon}°`

// root.append(geo) // 
// document.body.append(root)
