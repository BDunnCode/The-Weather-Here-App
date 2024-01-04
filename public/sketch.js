// Geo Locate
let lat, lon, measurementObject, weather, currentWeather
if ('geolocation' in navigator) {                                         
      console.log('geolocation available')                                    
      navigator.geolocation.getCurrentPosition(async position => {                                                                                       
        lat = position.coords.latitude.toFixed(2)                                    
        lon = position.coords.longitude.toFixed(2) 
        const api_url = `weather/${lat},${lon}`
        const response = await fetch(api_url)
        const json = await response.json()
        console.log('this is from line 12')
        console.log(json)
        weather = json.weather_api_response
        currentWeather = weather.current
        const fahrenheit = ((currentWeather.temp - 273.15) * 9/5 + 32).toFixed()
        document.getElementById('latitude').textContent = lat                  
        document.getElementById('longitude').textContent = lon
        document.querySelector('#temp').textContent = fahrenheit
        document.querySelector('#summary').textContent = currentWeather.weather[0].main.toLowerCase()
        if (json.aq_api_response.results[0]) {
          measurementObject = json.aq_api_response.results[0].measurements[0]


          // Do not assume measurements exist, check to see if there are any. 
          json.aq_api_response.results[0].measurements.forEach(measurement => {
            
            // pm25 represents the concentration of specific kinds of particulate matter in the air
            if (measurement.parameter == "pm25") { 

              foundObject = measurement
            }
          })

          if (foundObject != null) {
            // PM25 MEASUREMENT IS FOUND, DISPLAY RESULTS. 
                       
            // Date Translation Code. This takes the ugly computational looking date timestamp and converts into a more
            // reader-friendly syntax.

            const unformattedTimestamp = foundObject.lastUpdated
            const timestampMidTranslation = new Date(unformattedTimestamp)
            const dateconfig = {
              year: 'numeric',
              month: 'long',
              day: 'numeric', 
              hour: 'numeric', 
              minute: 'numeric', 
              second: 'numeric', 
              timeZoneName: 'short' 
            }
            const formattedTimestamp = new Intl.DateTimeFormat('en-US', dateconfig).format(timestampMidTranslation)
            console.log(formattedTimestamp) 

            document.querySelector('#value').textContent = foundObject.value
            document.querySelector('#unit').textContent = foundObject.unit
            document.querySelector('#parameter').textContent = "pm25"
            document.querySelector('#timestamp').textContent = formattedTimestamp

          }
        } else {
          // NO PM25 / DUST CONCENTRATION MEASUREMENT IS FOUND, SHOW ERROR 
          document.querySelector('#value').textContent = `"No Satellite Data Found". Unfortunately, the measurement tools are unable to find any air quality data for this area. You can consult the about page for more information.`
          const spansToHide = document.querySelectorAll('.hideifnoaq')
          console.log(spansToHide)
          spansToHide.forEach((spanElement) => {
            if (spanElement.textContent.includes('of')) {
              spanElement.classList.add('hide')
            }
          })
        }
    })               
} else {
  console.log('geolocation not available')
}


// Handle button presses, submit data to database
const button = document.getElementById('checkin')
button.addEventListener('click', async event => {
  console.log(lat, lon, weather, measurementObject)
  const data = { lat, lon, weather, measurementObject }
  console.log(data)
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const db_response = await fetch('/api', options)
  const db_json = await db_response.json()
  console.log(db_json)
})

