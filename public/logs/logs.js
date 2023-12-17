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
    const txt = `The weather here at ${item.lat}°,${item.lon}° `
    
    // ${weather.summary} with a temperature of 
    // ${weather.temp}°F

  // Now let's check on the air quality. OpenAQ API shows a reading of ${air.value}${air.unit} of ${air.parameter} ${air.lastUpdated}`

  marker.bindPopup(txt)

  // const root = document.createElement('div')
  // const geo = document.createElement('div')
  
  // geo.textContent = `${item.lat}°, ${item.lon}°`
  
  // root.append(geo) // 
  // document.body.append(root)
}
  console.log(data)
}

