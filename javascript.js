let currentDegree = "metric";
let searchedCity = " ";
let currentWeatherData;
const header = document.querySelector('header');
const searchCityForm = document.querySelector('.search');
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
        let newDegree = event.target.closest('.dropdownOptionButton').value;
        if(newDegree!==currentDegree){
          currentDegree = newDegree;
          console.log("currentDegree = " + currentDegree);
          changeDegreeIcon();
          fetchData(searchedCity, currentDegree);

          function changeDegreeIcon(){
            document.querySelector('.degreeIcon').src = `./media/weather-data/nav-degrees/thermometer-${currentDegree}.svg`;
          }
        }
      }
    })
  }
});
searchCityForm.addEventListener('submit', function(event){
  event.preventDefault();
  const formData = new FormData(this);

  newCity = formData.get('searchedPlace').split(' ').join('%20');
  if(newCity!==searchedCity){
    console.log("newCity = " + newCity);
    searchedCity = newCity;
    fetchData(searchedCity, currentDegree);

  }
  searchCityForm.reset();
});

async function fetchData(city, degree) {
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=${degree}&key=NR5QUCS2CDR3W7FMEY6KGLPLV&contentType=json`);
  response.json().then(function(response) {
    currentWeatherData = new WeatherData(response);
    console.log(currentWeatherData);
    currentWeatherAPI();
    todaysWeatherAPI(0);
    nextDaysWeatherAPI();
  });
}

function WeatherData(rawData){
  this.resolvedAddress = rawData.resolvedAddress,
  this.tzoffset = rawData.tzoffset,
  this.days = rawData.days,
  this.currentConditions = rawData.currentConditions
};

function currentDocElements(){
  const currentConditionBackground = document.querySelector(".currentInfo");
  const currentCity = document.querySelector(".currentInfoHeader>.city");
  const currentHour = document.querySelector(".currentInfoHeader>.currentHour>span");
  const currentTemp = document.querySelector(".currentTempData>span");
  const currentConditonIcon = document.querySelector(".currentConditionIcon");
  const currentConditionData = document.querySelector(".currentConditionData");
  const currentTempFeels = document.querySelector(".currentTempFeelsData>span");
  const currentUV = document.querySelector(".currentUVIndexData.currentData");
  const currentHumidity = document.querySelector(".currentHumidityData.currentData>span");
  const currentRain = document.querySelector(".currentRainData.currentData>span");

  return {currentConditionBackground, currentCity, currentHour, currentTemp, 
    currentConditonIcon, currentConditionData, currentTempFeels, currentUV, 
    currentHumidity, currentRain}
}
const currentWeatherAPI = function(){
  let currentDocEl = currentDocElements();
  currentDocEl.currentCity.textContent = cityUpperCase(currentWeatherData.resolvedAddress);
  currentDocEl.currentConditionBackground.style = `background-image: url(./media/condition-backgrounds/${currentWeatherData.currentConditions.icon}.jpg);`;
  currentDocEl.currentTemp.textContent = `${roundNumber(currentWeatherData.currentConditions.temp)}`;
  currentDocEl.currentConditonIcon.src = `./media/condition-icons/${currentWeatherData.currentConditions.icon}.svg`;
  currentDocEl.currentConditionData.textContent = currentWeatherData.currentConditions.conditions;
  currentDocEl.currentTempFeels.textContent = roundNumber(currentWeatherData.currentConditions.feelslike);
  currentDocEl.currentUV.textContent = roundNumber(currentWeatherData.currentConditions.uvindex);
  currentDocEl.currentHumidity.textContent = roundNumber(currentWeatherData.currentConditions.humidity);
  currentDocEl.currentRain.textContent = roundNumber(currentWeatherData.currentConditions.precipprob);
  calcTime();
  setInterval(calcTime, 1000);
  

  function calcTime() {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000*currentWeatherData.tzoffset)).toTimeString();
    if(nd[7]==="0"){
      currentDocEl.currentHour.textContent = nd.slice(0, 5);
    }
  }
};

function todaysDocElements(){
  const todaysCity = document.querySelector(".cityToday");
  const todaysDate = document.querySelector(".dateToday");
  const todaysFeelsLike = document.querySelector(".feelsTempToday>span");
  const todaysMoon = document.querySelector(".moonPhase");
  const todaysMoonIcon = document.querySelector(".moonIconToday");
  const todaysSunrise = document.querySelector(".sunrise>span");
  const todaysSunset = document.querySelector(".sunset>span");
  const todaysHigh = document.querySelector(".highTempToday>span");
  const todaysLow = document.querySelector(".lowTempToday>span");
  const todaysHumidity = document.querySelector(".humidityDataToday>span");
  const todaysDewPoint = document.querySelector(".preciProbDataToday>span");
  const todaysWind = document.querySelector(".dewPointDataToday>span");
  const todaysRainChance = document.querySelector(".pressureDataToday>span");
  const todaysPressure = document.querySelector(".windDataToday>span");
  const todaysUVIndex = document.querySelector(".uvIndexDataToday>span");
  const todaysDescription = document.querySelector(".descriptionDataToday");

  return {todaysCity, todaysDate, todaysFeelsLike, todaysMoon, todaysMoonIcon, todaysSunrise, 
    todaysSunset, todaysHigh, todaysLow, todaysHumidity, todaysDewPoint, 
    todaysWind, todaysRainChance, todaysPressure, todaysUVIndex, todaysDescription}
}
const todaysWeatherAPI = function(day){
  let todaysDocEl = todaysDocElements();
  todaysDocEl.todaysCity.textContent = cityUpperCase(currentWeatherData.resolvedAddress);
  todaysDocEl.todaysDate.textContent = getDate(day);
  todaysDocEl.todaysFeelsLike.textContent = roundNumber(currentWeatherData.days[day].feelslike);
  todaysDocEl.todaysMoon.textContent = moonPhases(currentWeatherData.days[day].moonphase)[0];
  todaysDocEl.todaysMoonIcon.src = `./media/moon-phases/moon-${moonPhases(currentWeatherData.days[day].moonphase)[1]}.svg`;
  todaysDocEl.todaysSunrise.textContent = currentWeatherData.days[day].sunrise.slice(0, 5);
  todaysDocEl.todaysSunset.textContent = currentWeatherData.days[day].sunset.slice(0, 5);
  todaysDocEl.todaysHigh.textContent = roundNumber(currentWeatherData.days[day].tempmax);
  todaysDocEl.todaysLow.textContent = roundNumber(currentWeatherData.days[day].tempmin);
  
  todaysDocEl.todaysHumidity.textContent = roundNumber(currentWeatherData.days[day].humidity);
  todaysDocEl.todaysDewPoint.textContent = roundNumber(currentWeatherData.days[day].dew);
  todaysDocEl.todaysWind.textContent = roundNumber(currentWeatherData.days[day].windspeed);
  todaysDocEl.todaysRainChance.textContent = roundNumber(currentWeatherData.days[day].precipprob);
  todaysDocEl.todaysPressure.textContent = roundNumber(currentWeatherData.days[day].pressure);
  todaysDocEl.todaysUVIndex.textContent = currentWeatherData.days[day].uvindex;
  todaysDocEl.todaysDescription.textContent = currentWeatherData.days[day].description;
  sunLine();

  function moonPhases(phase){
    if(phase===0) return ['New Moon', 'new']
    if(phase>0 && phase<0.25) return ['Waxing Crescent', 'waxing-crescent']
    if(phase===0.25) return ['First Quarter', 'first-quarter']
    if(phase>0.25 && phase<0.5) return ['Waxing Gibbous', 'waxing-gibbous']
    if(phase===0.5) return ['Full Moon', 'full']
    if(phase>0.5 && phase<0.75) return ['Waning Gibbous', 'waning-gibbous']
    if(phase===0.75) return ['Last Quarter', 'last-quarter']
    if(phase>0.) return ['Waning Crescent', 'waning-crescent']
  }
  function sunLine(){
    const sunrise = new Date();
    sunrise.setHours(currentWeatherData.days[day].sunrise.slice(0, 2), currentWeatherData.days[day].sunrise.slice(3, 5), 0);
    const sunset = new Date();
    sunset.setHours(currentWeatherData.days[day].sunset.slice(0, 2), currentWeatherData.days[day].sunset.slice(3, 5), 0);
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
    setInterval(updateSunPosition, 60000);
  }
  function getDate(day) {
    const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };

    const date = new Date();
    date.setDate(date.getDate() + day);
    const formattedDate = date.toLocaleDateString('en-GB', options);

    const parts = formattedDate.split(',');
    const dayAndMonth = parts[1].trim().replace(/ /g, '/');
    
    return `${parts[0]} ${dayAndMonth}`;
  }
};

function nextDaysDocElements(){
  const nextDaysDate = document.querySelectorAll('.daysInfo .date');
  const nextDaysHigh = document.querySelectorAll('.daysInfo .high p span');
  const nextDaysLow = document.querySelectorAll('.daysInfo .low p span');
  const nextDaysConditionIMG = document.querySelectorAll('.daysInfo .conditionDIV img');
  const nextDaysCondition = document.querySelectorAll('.daysInfo .conditionDIV p');
  const nextDaysRainChance = document.querySelectorAll('.daysInfo .rainChance span');

  return {nextDaysDate, nextDaysHigh, nextDaysLow, nextDaysConditionIMG, 
    nextDaysCondition, nextDaysRainChance}
}
const nextDaysWeatherAPI = function(day){
  let nextDaysDocEl = nextDaysDocElements();
  
  for(let i=0; i<7; i++){
    nextDaysDocEl.nextDaysDate[i].innerHTML = getDate(i);
    nextDaysDocEl.nextDaysHigh[i].textContent = roundNumber(currentWeatherData.days[i].tempmax);
    nextDaysDocEl.nextDaysLow[i].textContent = roundNumber(currentWeatherData.days[i].tempmin);
    nextDaysDocEl.nextDaysConditionIMG[i].src = `./media/condition-icons/${currentWeatherData.days[i].icon}.svg`;
    nextDaysDocEl.nextDaysCondition[i].textContent = currentWeatherData.days[i].conditions;
    nextDaysDocEl.nextDaysRainChance[i].textContent = roundNumber(currentWeatherData.days[i].precipprob);
  }
  
  function getDate(i) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return `${date.toDateString().slice(0,3)} <br> ${date.getDate()}`;
  }
};



function roundNumber(num){
  return Math.round(num)
}
function cityUpperCase(city) {
  let arr = city.split(" ");
  for(let i=0; i<arr.length; i++){
    let upper = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    arr[i] = upper;
  }
  return arr.join(" ");
}

