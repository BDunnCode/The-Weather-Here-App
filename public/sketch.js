// Geo Locate
let lat, lon, air, weather
if ('geolocation' in navigator) {                                         
      console.log('geolocation available')                                    
      navigator.geolocation.getCurrentPosition(async position => {                                                                                       
        lat = position.coords.latitude.toFixed(2)                                    
        lon = position.coords.longitude.toFixed(2) 
        const api_url = `weather/${lat},${lon}`
        const response = await fetch(api_url)
        const json = await response.json()
        console.log(json)
        const fahrenheit = ((json.weather.current.temp - 273.15) * 9/5 + 32).toFixed()
        weather = json.weather.current
        document.getElementById('latitude').textContent = lat                  
        document.getElementById('longitude').textContent = lon
        document.querySelector('#temp').textContent = fahrenheit
        document.querySelector('#summary').textContent = weather.weather[0].main.toLowerCase()
        if (json.air_quality.results[0]) {
          air = json.air_quality.results[0].measurements[0]
           // Date Translation Code
          const timestampforcomputers = json.air_quality.results[0].measurements[0].lastUpdated
          const timestampmidtranslation = new Date(timestampforcomputers)
          const dateconfig = {
            year: 'numeric',
            month: 'long',
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric', 
            timeZoneName: 'short' 
          }
        const formattedtimedateforhumans = new Intl.DateTimeFormat('en-US', dateconfig).format(timestampmidtranslation)
        console.log(formattedtimedateforhumans)                                
          document.querySelector('#value').textContent = json.air_quality.results[0].measurements[0].value
          document.querySelector('#unit').textContent = json.air_quality.results[0].measurements[0].unit
          document.querySelector('#parameter').textContent = json.air_quality.results[0].measurements[0].parameter
          document.querySelector('#timestamp').textContent = formattedtimedateforhumans
        } else {
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
  console.log(lat, lon, weather, air)
  const data = { lat, lon, weather, air }
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

