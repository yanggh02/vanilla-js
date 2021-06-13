const body = document.querySelector("body");
const IMG_NUMBER = 7;
let randomN;

function paintImg(imgN){
    const img = new Image();
    img.src = `images/${imgN}.jpg`;
    img.classList.add("bgImg");
    body.appendChild(img);
}

function genRandom() {
    let number = (Math.floor(Math.random() * IMG_NUMBER) + 1);
    while(randomN === number){
        number = (Math.floor(Math.random() * IMG_NUMBER) + 1);
    }
    return number;
}

function refreshImg() {
    const img = body.querySelector(".bgImg");
    img.classList.add("bgOut");
    randomN = genRandom();
    paintImg(randomN);
    setTimeout(function(){
        const out = body.querySelector(".bgOut");
        body.removeChild(out);
    }, 1000);
}

function init(){
    randomN = genRandom();
    paintImg(randomN);
    setInterval(refreshImg, 10000);
}

init();