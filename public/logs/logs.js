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
    
    let airText = '' 

    if (item.foundObject == undefined) {
      airText = `There is no particulate data for this latitude and longitude`
    }

    if (item.foundObject != undefined) {
      airText = `Now let's get a reading for the air quality. OpenAQ API shows a 
      reading of ${item.foundObject.value}${item.foundObject.unit} of ${item.foundObject.parameter} as of the last update on ${item.foundObject.lastUpdated}`
    }
  
    const txt = `
    The weather here at ${item.lat}°,${item.lon}° shows ${item.briefWeatherSummary}, with a temperature
    of ${item.tempInFahrenheit}°F. ${airText}`
    
  marker.bindPopup(txt)
  }
}

