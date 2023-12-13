// Geo Locate
let lat, lon
if ('geolocation' in navigator) {                                         
      console.log('geolocation available')                                    
      navigator.geolocation.getCurrentPosition(async position => {                                                                                       
        lat = position.coords.latitude.toFixed(2)                                    
        lon = position.coords.longitude.toFixed(2)                                  
        document.getElementById('latitude').textContent = lat                  
        document.getElementById('longitude').textContent = lon
        // const api_url = `/weather`
        const api_url = `weather/${lat},${lon}`
        // console.log(api_url)
        const response = await fetch(api_url)
        // console.log(response)
        const json = await response.json()
        console.log(json)
        const fahrenheit = ((json.current.temp - 273.15) * 9/5 + 32).toFixed()
        document.querySelector('#temp').textContent = fahrenheit
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


