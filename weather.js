const COORDS = "coords";
const API_Key ="b373cb5c9ee8806002e524db6e02a1e3";//OpenWeatherMap 사이트에서 가져오 API키
const weather = document.querySelector(".js-weather");

function getWheather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_Key}&unit=metric`
    ).then(function(response){//then의 역할은 값을 받은후 다음 호출하는 것.
        return response.json();
    }).then(function(json){
        console.log(json);
        const temperature = json.main.temp;
        const place = json.sys.country;
        weather.innerText = `날씨: ${temperature}F     장소:${place}`;
    });

}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWheather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCords);
        getWheather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}
init();