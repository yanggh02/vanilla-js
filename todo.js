const toDoForm = document.querySelector(".js-toDoForm"),
ToDoInput = toDoForm.querySelector("input"),
ToDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

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

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text, id){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    let newId;
    if(id === 0){
        newId = new Date() - new Date("2021-06-08:06:00:00");
    } else {
        newId = id;
    }
    delBtn.innerText = "삭제";
    delBtn.addEventListener("click", delToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    ToDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function eventSub(event){
    event.preventDefault();
    const curVal = ToDoInput.value;
    paintToDo(curVal, 0);
    ToDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const psdToDos = JSON.parse(loadedToDos);
        psdToDos.forEach(function(toDo){
            paintToDo(toDo.text, toDo.id);
        })
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", eventSub)
}

init();