const clockDiv = document.querySelector(".js-clock"),
clockTime = clockDiv.querySelector("h1");

function getTime() {
    const date = new Date();
    const min = date.getMinutes();
    const hour = date.getHours();
    const sec = date.getSeconds();
    
    let twHour;
    if(hour > 12) {
        twHour = hour - 12;
    } else if(hour === 0) {
        twHour = 12;
    } else {
        twHour = hour;
    }

    clockTime.innerText = `${hour > 11 ? `오후` : "오전"} ${twHour < 10 ? `0${twHour}` : twHour}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();