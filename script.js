import {XRapidAPIKey, XRapidAPIHost} from './secret.js';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': XRapidAPIKey,
		'X-RapidAPI-Host': XRapidAPIHost
	}
};
const getWeather = (city) => {
    cityName.innerHTML = city;
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='+ city, options)
	.then(response => response.json())
	.then(response => {
        if(response.error){
            weather_details.style.display = "none";
            error.style.display = "block";
        }
        else{            
            weather_details.style.display = "flex";
            error.style.display = "none"
            cloud_pct.innerHTML = response.cloud_pct
            feels_like.innerHTML = response.feels_like
            humidity.innerHTML = response.humidity
            humidity2.innerHTML = response.humidity
            max_temp.innerHTML = response.max_temp
            min_temp.innerHTML = response.min_temp
            sunrise.innerHTML =  new Date(response.sunrise * 1000).toLocaleTimeString()
            sunset.innerHTML =  new Date(response.sunset * 1000).toLocaleTimeString()
            temp.innerHTML = response.temp
            temp2.innerHTML = response.temp
            wind_speed.innerHTML = response.wind_speed
            wind_degree.innerHTML = response.wind_degrees
        }
    })
	.catch(err => {
        console.error(err)
    });
}


submit.addEventListener("click", (e)=>{
    e.preventDefault();
    getWeather(city.value)
}) 

getWeather("Mumbai");

const getWeatherForDefaultCity = (city) => {
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='+ city, options)
	.then(response => response.json())
	.then(response => {
        if(response.error){
            weather_details.style.display = "none";
            error.style.display = "block";
        }
        else{            
            for (const key in response) {                
                if(key !== 'wind_degrees'){
                    let cell = document.createElement("td");
                    let cellText;
                    switch(key){
                        case 'cloud_pct':
                        cellText = document.createTextNode(response[key] + '%');
                        break;
                        case 'temp':
                        cellText = document.createTextNode(response[key] + '°C');
                        break;
                        case 'feels_like':
                        cellText = document.createTextNode(response[key] + '°C');
                        break;
                        case 'min_temp':
                        cellText = document.createTextNode(response[key] + '°C');
                        break;                        
                        case 'max_temp':
                        cellText = document.createTextNode(response[key] + '°C');
                        break;                        
                        case 'wind_speed':
                        cellText = document.createTextNode(response[key] + 'km/hr');
                        break;
                        case 'humidity':
                        cellText = document.createTextNode(response[key] + '%');
                        break;
                        case 'sunrise':    
                        cellText = document.createTextNode(new Date(response[key]).toLocaleTimeString() + ' (Local)');
                        break;             
                        case 'sunset':
                        cellText = document.createTextNode(new Date(response[key]).toLocaleTimeString() + ' (Local)');
                        break;
                    }
                    cell.appendChild(cellText);
                    document.getElementById(city).appendChild(cell);
                }
            }
        }
    })
	.catch(err => {
        console.error(err)
    });
}


getWeatherForDefaultCity("Shanghai");
getWeatherForDefaultCity("New York");
getWeatherForDefaultCity("Paris");
getWeatherForDefaultCity("Berlin");
getWeatherForDefaultCity("London");
getWeatherForDefaultCity("Tallinn");