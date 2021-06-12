const bg = document.querySelector("body");

function eventResize(){
    const curWidth = window.innerWidth;

    if(curWidth >= 1000) {
        bg.style.backgroundColor = "tomato";
    } else if(1000 > curWidth && curWidth >= 600) {
        bg.style.backgroundColor = "yellowgreen";
    } else if(600 > curWidth) {
        bg.style.backgroundColor = "skyblue";
    }
}

window.addEventListener("resize", eventResize);