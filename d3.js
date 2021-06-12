// <⚠️ DONT DELETE THIS ⚠️>
//import "./d3.css";
const colors = ["#1abc9c", "#3498db", "#9b59b6", "#f39c12", "#e74c3c"];
// <⚠️ /DONT DELETE THIS ⚠️>

/*
✅ The text of the title should change when the mouse is on top of it.
✅ The text of the title should change when the mouse is leaves it.
✅ When the window is resized the title should change.
✅ On right click the title should also change.
✅ The colors of the title should come from a color from the colors array.
✅ DO NOT CHANGE .css, or .html files.
✅ ALL function handlers should be INSIDE of "superEventHandler"
*/
const superEventHandler = {
    eventHover:function(){
        title.innerHTML = "The mouse is here!";
        title.style.color = colors[0];
    },

    eventLeave:function(){
        title.innerHTML = "The mouse is gone!";
        title.style.color = colors[1];
    },

    eventResize:function(event){
        title.innerHTML = "You just resized!";
        title.style.color = colors[2];
    },

    eventBtn2:function(){
        title.innerHTML = "That was a right click!";
        title.style.color = colors[4];
    }

};

const title = document.querySelector("h2");

title.addEventListener("mouseenter", superEventHandler.eventHover);

title.addEventListener("mouseleave", superEventHandler.eventLeave);

window.addEventListener("resize", superEventHandler.eventResize);

window.addEventListener("contextmenu", superEventHandler.eventBtn2);