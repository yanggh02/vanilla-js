const body = document.querySelector("body"),
form = document.querySelector("form"),
range = document.querySelector(".range-js"),
rangeTag = document.querySelector(".range-tag-js"),
input = form.querySelector("input:nth-child(2)"),
playBtn = form.querySelector("input:last-child"),
chosen = document.querySelector("div span"),
won = document.querySelector("h4");

let rangeVal = 10,
anime = false;

function playGame(chosenN) {
    if(!anime){
        const randomN = Math.floor(Math.random() * (rangeVal + 1));
        chosen.innerHTML = `당신이 고른 숫자: ${chosenN}, 나온 숫자: ${randomN}.`;
        if(chosenN === randomN) {
            won.innerHTML = "이겼습니다!";
            body.classList.add("spin");
            setTimeout(function(){
                body.classList.remove("spin");
                anime = false;
            }, 2000);
        } else {
            won.innerHTML = "졌습니다!";
            body.classList.add("vibrate");
            setTimeout(function(){
                body.classList.remove("vibrate");
                anime = false;
            }, 500);
        }
        anime = true;
    }
}

function eventRange(event) {
    rangeVal = parseInt(event.srcElement.value);
    rangeTag.innerHTML = `${rangeVal}`;
    input.removeAttribute("max");
    input.setAttribute("max", rangeVal);
    rangeTag.classList.remove("blue", "green", "yellow", "red", "purple")
    if(rangeVal < 20) {
        rangeTag.classList.add("blue")
    } else if(rangeVal < 50) {
        rangeTag.classList.add("green")
    } else if(rangeVal < 100) {
        rangeTag.classList.add("yellow")
    } else if(rangeVal < 200) {
        rangeTag.classList.add("red")
    } else {
        rangeTag.classList.add("purple")
    }
    input.value = "";
    chosen.innerHTML = "무작위 숫자를 맞추면 승리합니다.";
    won.innerHTML = "범위 안에서 숫자를 고르고 버튼을 누르세요.";
}

function eventPlay(event) {
    event.preventDefault();
    const curVal = parseInt(input.value);
    playGame(curVal);
}

function init(){
    range.addEventListener("input", eventRange);
    form.addEventListener("submit", eventPlay);
}

init();