const form = document.querySelector(".js-form"),
input = form.querySelector("input");
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
}

function askName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", eventSub);
}

function paintGreet(text){
    form.classList.remove(SHOWING_CN);
    greet.classList.add(SHOWING_CN);
    greet.innerText = `안녕하세요 ${text}.`;

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
}

init();