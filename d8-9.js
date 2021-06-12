const toDoForm = document.querySelector(".js-toDoForm"),
ToDoInput = toDoForm.querySelector("input"),
ToDoList = document.querySelector(".js-toDoList"),
finList = document.querySelector(".js-finList");

const TODOS_LS = "toDos",
FINS_LS = "fins";

let toDos = [],
fins = [];

function delToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    ToDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function delFin(event){
    const btn = event.target;
    const li = btn.parentNode;
    finList.removeChild(li);
    const cleanFins = fins.filter(function(fin){
        return fin.id !== parseInt(li.id);
    });
    fins = cleanFins;
    saveFins();
}

function finToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    const span = li.querySelector("span");
    paintFin(span.innerHTML, 0);
    ToDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
    saveFins();
}

function bakFin(event){
    const btn = event.target;
    const li = btn.parentNode;
    const span = li.querySelector("span");
    paintToDo(span.innerHTML, 0);
    finList.removeChild(li);
    const cleanFins = fins.filter(function(fin){
        return fin.id !== parseInt(li.id);
    });
    fins = cleanFins;
    saveToDos();
    saveFins();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function saveFins(){
    localStorage.setItem(FINS_LS, JSON.stringify(fins));
}

function paintToDo(text, id){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const finBtn = document.createElement("button");
    let newId;
    if(id === 0){
        newId = new Date() - new Date("2021-06-08:06:00:00");
    } else {
        newId = id;
    }
    delBtn.innerText = "del";
    finBtn.innerText = "fin";
    delBtn.addEventListener("click", delToDo);
    finBtn.addEventListener("click", finToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finBtn);
    li.id = newId;
    ToDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function paintFin(text, id){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const bakBtn = document.createElement("button");
    let newId;
    if(id === 0){
        newId = new Date() - new Date("2021-06-08:06:00:00");
    } else {
        newId = id;
    }
    delBtn.innerText = "del";
    bakBtn.innerText = "bak";
    delBtn.addEventListener("click", delFin);
    bakBtn.addEventListener("click", bakFin);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(bakBtn);
    li.id = newId;
    finList.appendChild(li);
    const finObj = {
        text: text,
        id: newId
    };
    fins.push(finObj);
    saveFins();
}

function eventSub(event){
    event.preventDefault();
    const curVal = ToDoInput.value;
    paintToDo(curVal, 0);
    ToDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS),
    loadedFins = localStorage.getItem(FINS_LS);
    if(loadedToDos !== null){
        const psdToDos = JSON.parse(loadedToDos);
        psdToDos.forEach(function(toDo){
            paintToDo(toDo.text, toDo.id);
        })
    }
    if(loadedFins !== null){
        const psdFins = JSON.parse(loadedFins);
        psdFins.forEach(function(fin){
            paintFin(fin.text, fin.id);
        })
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", eventSub)
}

init();