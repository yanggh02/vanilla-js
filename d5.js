const timeDiv = document.querySelector(".js-time"),
timeText = timeDiv.querySelector("h2");

// You're gonna need this
function getTime() {
    // Don't delete this.
    const xmasDay = new Date("1000-12-24:00:00:00+0900");
    const today = new Date();
    let time = xmasDay - today;

    const thisYear = today.getFullYear();
    let year = xmasDay.getFullYear();

    const thisMonth = today.getMonth();
    const thisDay = today.getDate();

    while (thisYear >= year) {
        if(year%4 === 0 && year%100 !== 0 || year%400 === 0) {
            time = time + 86400000;
        }
        year = year + 1;
    }
    
    while (time < 1) {
        time = time + 31536000000;
    }

    if(year%4 === 0 && year%100 !== 0 || year%400 === 0) {
        if(thisMonth === 11 && thisDay >= 24) {
            time = time + 86400000;
        }
    }

    const day =  Math.floor(time / (1000 * 60 * 60 * 24));
    const hour = Math.floor((time / (1000 * 60 * 60)) % 24);
    const min = Math.floor((time / (1000 * 60)) % 60);
    const sec = Math.floor((time / 1000) % 60);
    
    timeText.innerText = `${day > 0 ? `${day}일 ` : ``}${hour > 0 ? `${hour}시간 ` : ``}${min > 0 ? `${min}분 ` : ``}${sec > 0 ? `${sec}초 ` : ``}남았습니다.`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}
init();