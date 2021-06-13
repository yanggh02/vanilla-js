const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImg(imgN){
    const img = new Image();
    img.src = `images/${imgN}.jpg`;
    img.classList.add("bgImg");
    body.appendChild(img);
}

function genRandom() {
    const number = (Math.floor(Math.random() * 7) + 1);
    return number;
}

function init(){
    const randomN = genRandom();
    paintImg(randomN);
}

init();