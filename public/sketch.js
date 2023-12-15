// Geo Locate
let lat, lon
if ('geolocation' in navigator) {                                         
      console.log('geolocation available')                                    
      navigator.geolocation.getCurrentPosition(async position => {
        try{                      
        let tempText                                                                
        lat = position.coords.latitude.toFixed(2)                                    
        lon = position.coords.longitude.toFixed(2)                                  
        document.getElementById('latitude').textContent = lat                  
        document.getElementById('longitude').textContent = lon
        const api_url = `weather/${lat},${lon}`
        const response = await fetch(api_url)
        const json = await response.json()
        console.log(json)
        console.log(json.weather.current.temp)
        tempText = document.getElementById('temp')
        console.log(tempText)
        const weatherFahrenheit = ((json.weather.current.temp - 273.15) * 9/5 + 32).toFixed()
        // const air = json.air_quality.results[0].measurements[1]
        // let summary = document.querySelector('#summary')
        // summary.textContent = json.weather.current.weather.main
        tempText.textContent = weatherFahrenheit 
      } catch(error) {
        console.log('something went wrong!')
      }

    })               
} else {
  console.log('geolocation not available')
}

// Handle button presses, submit data to database
const button = document.getElementById('checkin')
button.addEventListener('click', async event => {
  const data = { lat, lon }
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const response = await fetch('/api', options)
  const json = await response.json()
  console.log(json)
})


