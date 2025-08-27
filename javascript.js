/* const header = document.querySelector('header');
header.addEventListener('click', (event)=>{
  if(event.target.closest('.dropdownMenu')){
    let menu = event.target.closest('.dropdownMenu');
    let dropdownButton = menu.querySelector('.dropdownButton');
    dropdownButton.classList.toggle('active');
    let dropdownOptions = menu.querySelector('.dropdownOptions');
    dropdownOptions.classList.toggle('visible');

    menu.addEventListener('mouseleave', ()=>{
      dropdownButton.classList.remove('active');
      dropdownOptions.classList.remove('visible');
    })
    dropdownOptions.addEventListener('click', (event)=>{
      if(event.target.closest('.dropdownOptionButton')){
        console.log(event.target.closest('.dropdownOptionButton').textContent);
      }
    })
  }
}); */

/* async function fetchData() {
  const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/guadalajara/next7days?unitGroup=metric&key=NR5QUCS2CDR3W7FMEY6KGLPLV&contentType=json");
  response.json().then(function(response) {
    console.log(response);
  });
}

fetchData(); */


let weatherData = {
  "resolvedAddress": "ciudad obregon",
  "address": "ciudad obregon",
  "timezone": "America/Hermosillo",
  "tzoffset": -7,
  "days": [
    {
      "datetime": "2025-08-11",
      "tempmax": 38.9,
      "tempmin": 25.9,
      "temp": 32,
      "feelslike": 35.1,
      "dew": 22,
      "humidity": 58.7,
      "precipprob": 32,
      "windspeed": 13,
      "pressure": 1011,
      "uvindex": 10,
      "sunrise": "05:48:45",
      "sunset": "19:00:47",
      "moonphase": 0.59,
      "conditions": "Partially cloudy",
      "description": "Partly cloudy throughout the day with strong storms possible.",
      "icon": "partly-cloudy-day"
    },
    {
      "datetime": "2025-08-12",
      "tempmax": 39.2,
      "tempmin": 26.4,
      "temp": 32.1,
      "feelslike": 35.7,
      "dew": 22.4,
      "humidity": 59.5,
      "precipprob": 61,
      "windspeed": 13,
      "pressure": 1011.1,
      "uvindex": 9,
      "sunrise": "05:49:15",
      "sunset": "18:59:55",
      "moonphase": 0.62,
      "conditions": "Rain, Partially cloudy",
      "description": "Partly cloudy throughout the day with strong storms possible.",
      "icon": "rain"
    },
    {
      "datetime": "2025-08-13",
      "tempmax": 38.9,
      "tempmin": 26,
      "temp": 31.9,
      "feelslike": 35.5,
      "dew": 22.3,
      "humidity": 59.5,
      "precipprob": 47,
      "windspeed": 13,
      "pressure": 1010.8,
      "uvindex": 9,
      "sunrise": "05:49:46",
      "sunset": "18:59:03",
      "moonphase": 0.66,
      "conditions": "Rain",
      "description": "Clear conditions throughout the day with storms possible.",
      "icon": "rain"
    },
    {
      "datetime": "2025-08-14",
      "tempmax": 36.4,
      "tempmin": 26.8,
      "temp": 31.2,
      "feelslike": 36.3,
      "dew": 24,
      "humidity": 67.4,
      "precipprob": 72,
      "windspeed": 15.8,
      "pressure": 1010.6,
      "uvindex": 8,
      "sunrise": "05:50:16",
      "sunset": "18:58:09",
      "moonphase": 0.7,
      "conditions": "Rain, Partially cloudy",
      "description": "Partly cloudy throughout the day with strong storms possible.",
      "icon": "rain"
    },
    {
      "datetime": "2025-08-15",
      "tempmax": 34.7,
      "tempmin": 25.9,
      "temp": 30.1,
      "feelslike": 34.3,
      "dew": 23.9,
      "humidity": 70.7,
      "precipprob": 72,
      "windspeed": 17.3,
      "pressure": 1011.7,
      "uvindex": 5,
      "sunrise": "05:50:47",
      "sunset": "18:57:15",
      "moonphase": 0.75,
      "conditions": "Rain, Partially cloudy",
      "description": "Partly cloudy throughout the day with storms possible.",
      "icon": "rain"
    },
    {
      "datetime": "2025-08-16",
      "tempmax": 35.2,
      "tempmin": 25.5,
      "temp": 30.2,
      "feelslike": 33.5,
      "dew": 23.2,
      "humidity": 68.1,
      "precipprob": 65,
      "windspeed": 13,
      "pressure": 1011.7,
      "uvindex": 5,
      "sunrise": "05:51:17",
      "sunset": "18:56:20",
      "moonphase": 0.77,
      "conditions": "Rain, Partially cloudy",
      "description": "Partly cloudy throughout the day with storms possible.",
      "icon": "rain"
    },
    {
      "datetime": "2025-08-17",
      "tempmax": 36.1,
      "tempmin": 25.6,
      "temp": 30.7,
      "feelslike": 34.3,
      "dew": 23.1,
      "humidity": 66.1,
      "precipprob": 61,
      "windspeed": 11.5,
      "pressure": 1010.2,
      "uvindex": 9,
      "sunrise": "05:51:47",
      "sunset": "18:55:24",
      "moonphase": 0.8,
      "conditions": "Rain, Partially cloudy",
      "description": "Partly cloudy throughout the day with storms possible.",
      "icon": "rain"
    },
    {
      "datetime": "2025-08-18",
      "tempmax": 37.7,
      "tempmin": 26,
      "temp": 31.5,
      "feelslike": 35.3,
      "dew": 22.9,
      "humidity": 62.5,
      "precipprob": 46,
      "windspeed": 11.5,
      "pressure": 1010.7,
      "uvindex": 9,
      "sunrise": "05:52:17",
      "sunset": "18:54:27",
      "moonphase": 0.84,
      "conditions": "Rain, Partially cloudy",
      "description": "Partly cloudy throughout the day with storms possible.",
      "icon": "rain"
    }
  ],
  "currentConditions": {
    "temp": 37,
    "feelslike": 42,
    "humidity": 42.1,
    "precipprob": 0,
    "uvindex": 0,
    "conditions": "Partially cloudy",
    "icon": "partly-cloudy-day"
  }
}


/* const sunrise = new Date();
sunrise.setHours(5, 48, 0);
const sunset = new Date();
sunset.setHours(19, 0, 0); 

const sunIcon = document.querySelector('.sunIcon');
const sunLine = document.querySelector('.sunLine');

function updateSunPosition() {
  const now = new Date();
  const progress = (now - sunrise) / (sunset - sunrise);
  if (progress < 0 || progress > 1) {
    sunLine.style.display = 'none';
    return;
  } else {
    sunLine.style.display = 'block';
  }
  sunIcon.style.left = `calc(${progress*100}% - ${sunIcon.offsetWidth / 2}px)`;
}

updateSunPosition();
setInterval(updateSunPosition, 60000); */