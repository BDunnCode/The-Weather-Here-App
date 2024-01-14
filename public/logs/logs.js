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
      // The line below is the timestamp returned from the AQ API, it comes in ISO 8601 format as a string
      const unformattedTimestamp = item.foundObject.lastUpdated
      // Below takes the string format and makes a date object with it
      const timestampMidTranslation = new Date(unformattedTimestamp)
      // This is the config that will determine the readout given when using new Intl.DateTimeFormat and its
      // format method
       const dateconfig = 
       {
        month: 'long',
        day: 'numeric', 
        year: 'numeric',
      }
      // This completes the variable and allows for better readability for the user.
      const formattedTimestamp = new Intl.DateTimeFormat('en-US', dateconfig).format(timestampMidTranslation)

      airText = `Now let's get a reading for the air quality. OpenAQ API shows a 
      reading of ${item.foundObject.value}${item.foundObject.unit} of ${item.foundObject.parameter} 
      as of the last update on ${formattedTimestamp}`
    }
  
    const txt = `
    The weather here at ${item.lat}°,${item.lon}° shows ${item.briefWeatherSummary}, with a temperature
    of ${item.tempInFahrenheit}°F. ${airText}`
    
  marker.bindPopup(txt)
  }
}

