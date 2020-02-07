const toDOForm = document.querySelector(".js-toDoForm"),
   toDoInput = toDOForm.querySelector("input"),
   toDOList = document.querySelector(".js-toDoList");

const ToDOS_LS = 'toDos';

let toDos = [];

function deleteToDO(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDOList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(ToDOS_LS, JSON.stringify(toDos));
}

function paintToDO(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length +1;
    delBtn.innerText = "❌"
    delBtn.addEventListener("click", deleteToDO);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDOList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handlesubmit(event){ 
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDO(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(ToDOS_LS);
    if(loadedToDos !==null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
        paintToDO(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDOForm.addEventListener("submit", handlesubmit);
}

init();