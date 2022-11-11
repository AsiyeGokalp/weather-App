
//geo locate
console.log('hello')
if ("geolocation" in navigator) {
    console.log("geolocation available")
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat, lon, weather, air
      try{
      lat = position.coords.latitude
      console.log('hello')
      lon = position.coords.longitude
      document.getElementById("latitude").textContent = lat.toFixed(2)
      document.getElementById("longitude").textContent = lon.toFixed(2)
     const apiUrl=`weather/${lat},${lon}`
     const res = await fetch(apiUrl)
     const json = await res.json()
  
     weather = json.weather

      air = json.ai_quality.results[0].measurements[0]

      document.getElementById("description").textContent = weather.weather[0].description
      document.getElementById("temperature").textContent = weather.main.temp
      document.getElementById("aq_parameter").textContent = air.parameter
      document.getElementById("aq_value").textContent = air.value
      document.getElementById("aq_units").textContent = air.unit
      document.getElementById("aq_date").textContent = air.lastUpdated
      
    } catch (error) {
      console.error(error);
      air = { value: -1 };
      document.getElementById('aq_value').textContent = 'NO READING';
    }

      const data = { lat, lon, weather, air }
      const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    const db_response = await fetch("/api", options)
    const db_json = await db_response.json()
    console.log(db_json)
    
      })
    } else {
      console.log("geolocation not available")
    }


 
 
  
    

  
