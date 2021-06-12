const API_KEY = "03aa9c61ee71a093003ecee6c0953da6",
COORDS = "coords",
city = document.querySelector(".js-weather > span:nth-child(2)"),
reloadBtn = document.querySelector(".js-weather button");
let refreshTimer;

function getWeather(lat, lon){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&units=metric&appid=${API_KEY}`;
    fetch(url).then(response => response.json()).then(data => {
        const weatherIcon = document.querySelector(".js-weather img"),
        weather = document.querySelector(".js-weather div:first-child span"),
        temp = Math.round(data.main.temp),
        time = document.querySelector(".js-weather div:last-child span"),
        date = new Date(),
        mon = date.getMonth() + 1,
        day = date.getDate(),
        min = date.getMinutes(),
        hour = date.getHours();
        let twHour;
        city.innerText = `@ ${data.name}`;
        weather.innerText = `${data.weather[0].main} / ${temp}℃`;
        weatherIcon.setAttribute("src",`http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
        weatherIcon.classList.remove("hide");
        if(hour > 12) {
            twHour = hour - 12;
        } else if(hour === 0) {
            twHour = 12;
        } else {
            twHour = hour;
        }
        time.innerText = `업데이트 ${mon}/${day} ${hour > 11 ? `오후` : "오전"} ${twHour}:${min < 10 ? `0${min}` : min}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const coordsObj = {
        latitude: lat,
        longitude: lon
    };
    saveCoords(coordsObj);
    getWeather(lat, lon);
    refreshTimer = setInterval(refreshWeather, 1800000);
}

function onGeoError(){
    alert("위치 확인이 거부되었습니다.");
    city.innerText = "위치 정보를 불러올 수 없습니다.";
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    clearInterval(refreshTimer);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        const lat = parseCoords.latitude,
        lon = parseCoords.longitude;
        getWeather(lat, lon);
        refreshTimer = setInterval(refreshWeather, 1800000);
    }
}

function refreshWeather(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        clearInterval(refreshTimer);
        city.innerText = "위치 정보를 불러올 수 없습니다.";
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        const lat = parseCoords.latitude,
        lon = parseCoords.longitude;
        getWeather(lat, lon);
    }
}

function init(){
    loadCoords();
    reloadBtn.addEventListener("click", loadCoords);
}

init();