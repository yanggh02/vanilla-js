const select = document.querySelector(".js-select"),
options = select.querySelector("option"),
askCon = document.querySelector(".js-ask-con"),
op0 = select.querySelector("option:first-child"),
op1 = select.querySelector("option:nth-child(2)"),
op2 = select.querySelector("option:nth-child(3)"),
op3 = select.querySelector("option:nth-child(4)"),
op4 = select.querySelector("option:nth-child(5)");

const COU_OP = "curCou";

function saveOpt(option) {
    localStorage.setItem(COU_OP, option);
}

function eventSub(event) {
    event.preventDefault();
    const curVal = select.value;
    saveOpt(curVal);
    selected(curVal);
}

function localAsk(text) {
    askCon.innerText = text;
}

function selected(text) {
    options.removeAttribute("selected");
    if (text === "0") {
        localAsk("Where are you from?");
        op0.setAttribute("selected", "");
    } else if (text === "1") {
        localAsk("어디 출신이세요? (Where are you from?)");
        op1.setAttribute("selected", "");
      } else if (text === "2") {
        localAsk("Από που είσαι? (Where are you from?)");
        op2.setAttribute("selected", "");
    } else if (text === "3") {
        localAsk("Nerelisin? (Where are you from?)");
        op3.setAttribute("selected", "");
    } else if (text === "4") {
        localAsk("Mistä olet kotoisin? (Where are you from?)");
        op4.setAttribute("selected", "");
    }
}

function loadOpt() {
    const curOpt = localStorage.getItem(COU_OP);
    if (curOpt !== null) {
        selected(curOpt);
    }
}

function init() {
    loadOpt();
    select.addEventListener("change", eventSub);
}

init();