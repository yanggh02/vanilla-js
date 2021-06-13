const API_KEY = "03aa9c61ee71a093003ecee6c0953da6",
COORDS = "coords",
city = document.querySelector(".js-weather > span:nth-child(2)"),
reloadBtn = document.querySelector(".js-weather button");
let refreshTimer;

function getWeather(lat, lon){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&units=metric&appid=${API_KEY}`;
    fetch(url).then(response => response.json()).then(data => {
        const weatherIcon = document.querySelector(".js-weather img"),
        temp = document.querySelector(".js-weather div:first-child h3"),
        weather = document.querySelector(".js-weather div:first-child span"),
        time = document.querySelector(".js-weather div:last-child span"),
        date = new Date(),
        mon = date.getMonth() + 1,
        day = date.getDate(),
        min = date.getMinutes(),
        hour = date.getHours();
        let twHour;
        city.innerText = `@ ${data.name}`;
        temp.innerText = `${Math.round(data.main.temp)}℃`;
        weather.innerText = `${weatherKr(data.weather[0].main)}`;
        ;
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

function weatherKr(text) {
    if(text === "Clear") {
        return "맑음"
    } else if(text === "Clouds") {
        return "흐림";
    } else if(text === "Rain") {
        return "비";
    } else if(text === "Drizzle") {
        return "이슬비";
    } else if(text === "Thunderstorm") {
        return "뇌우";
    } else if(text === "Snow") {
        return "눈";
    } else if(text === "Mist") {
        return "안개";
    } else if(text === "Smoke") {
        return "스모그";
    } else if(text === "Haze") {
        return "스모그";
    } else if(text === "Dust") {
        return "미세먼지";
    } else if(text === "Fog") {
        return "짙은 안개";
    } else if(text === "Sand") {
        return "황사";
    } else if(text === "Ash") {
        return "화산재";
    } else if(text === "Squall") {
        return "소나기";
    } else if(text === "Tornado") {
        return "태풍";
    } else {
        return text;
    }
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
    city.innerText = "위치를 알 수 없습니다.";
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