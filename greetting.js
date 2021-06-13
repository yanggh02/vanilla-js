const form = document.querySelector(".js-form"),
input = form.querySelector("input"),
greet = document.querySelector(".js-greets");

const USER_LS = "curUser",
SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function eventSub(event){
    event.preventDefault();
    const curVal = input.value;
    paintGreet(curVal);
    saveName(curVal);
    input.value = "";
}

function askName(){
    greet.classList.remove(SHOWING_CN);
    form.classList.add(SHOWING_CN);
}

function paintGreet(text){
    form.classList.remove(SHOWING_CN);
    greet.classList.add(SHOWING_CN);
    hourlyGreets(text);
}

function hourlyGreets(text) {
    const date = new Date(),
    time = date.getHours();
    if(6 < time && time < 12) {
        greet.innerText = `좋은 아침입니다, ${text}.`;
    } else if(11 < time && time < 18) {
        greet.innerText = `좋은 오후입니다, ${text}.`;
    } else if(17 < time && time < 21) {
        greet.innerText = `좋은 저녁입니다, ${text}.`;
    } else if(20 < time || time === 0) {
        greet.innerText = `좋은 밤입니다, ${text}.`;
    } else {
        greet.innerText = `좋은 새벽입니다, ${text}.`;
    }
}

function loadName(){
    const curUser = localStorage.getItem(USER_LS);
    if(curUser === null) {
        askName();
    } else {
        paintGreet(curUser);
    }
}

function init(){
    loadName();
    setInterval(loadName, 1000);
    form.addEventListener("submit", eventSub);
}

init();