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
  console.log
  for (item of data) {

    const marker = L.marker([item.lat, item.lon]).addTo(mymap)
    const txt = `
    The weather here at ${item.lat}°,${item.lon}° shows ${item.weather.weather[0].main.toLowerCase()}, with a temperature
    of ${((item.weather.temp - 273.15) * 9/5 + 32).toFixed()}°F. Now let's get a reading for the air quality. OpenAQ API shows a 
    reading of ${item.air.value}${item.air.unit} of ${item.air.parameter} ${item.air.lastUpdated}`

    // The problems with the OpenAQ API break the functionality on this and seem to cause the loop to error out and stop working.
    // Might want to concatenate the air quality portion second because it's gonna cause all kinds of problems.
    
  marker.bindPopup(txt)

}
  console.log(data)
}

// const root = document.createElement('div')
// const geo = document.createElement('div')

// geo.textContent = `${item.lat}°, ${item.lon}°`

// root.append(geo) // 
// document.body.append(root)
