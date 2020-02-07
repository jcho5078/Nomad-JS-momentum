const clockContainer = document.querySelector(".js-clock"),
      clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hour = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hour}:${
        minutes< 10 ? `0${minutes}` : minutes
    }:${
        seconds < 10 ? `0${seconds}` : seconds // "?  참:else" ==>미니 if
    }`;
}

function init(){
  getTime();
  setInterval(getTime, 1000);
}

init();