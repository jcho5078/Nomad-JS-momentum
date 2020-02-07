const form = document.querySelector(".js-Form"),
      input = form.querySelector("input"),
      greeting = document.querySelector(".js-greetings");
const User_LS = "currentUser",
    SHOWING_CN = "showing";

function handlesubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    console.log(currentValue);
    paintGreeting(currentValue);
    saveName(currentValue);
}

function saveName(text){
    localStorage.setItem(User_LS, text);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handlesubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(User_LS);
    if(currentUser === null){
        askForName();
    }else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();
