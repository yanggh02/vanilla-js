const clockDiv = document.querySelector(".js-clock"),
clockTime = clockDiv.querySelector("h1"),
clockMeridiem = clockDiv.querySelector("h2"),
clockDate = clockDiv.querySelector("span");

function getTime() {
    const date = new Date(),
    year = date.getFullYear(),
    mon = date.getMonth() + 1,
    day = date.getDate(),
    weekN = date.getDay(),
    min = date.getMinutes(),
    hour = date.getHours(),
    sec = date.getSeconds();
    let week,
    twHour;
    if(weekN === 0) {
        week = "일";
    } else if(weekN === 1) {
        week = "월";
    } else if(weekN === 2) {
        week = "화";
    } else if(weekN === 3) {
        week = "수";
    } else if(weekN === 4) {
        week = "목";
    } else if(weekN === 5) {
        week = "금";
    } else if(weekN === 6) {
        week = "토";
    }
    if(hour > 12) {
        twHour = hour - 12;
    } else if(hour === 0) {
        twHour = 12;
    } else {
        twHour = hour;
    }

    clockTime.innerText = `${twHour}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
    clockMeridiem.innerText = `${hour > 11 ? `오후` : "오전"}`;
    clockDate.innerText = `${year}년 ${mon}월 ${day}일 ${week}요일`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();