const inputEl = document.getElementById('input-el');
const searchBtn = document.getElementById('btnsearch-el');

const defaultStateEl = document.getElementById('defaultstate-el');
const defaultTextEl = document.getElementById('defaulttext-el');
const weatherSectionEl = document.getElementById('weathersection-el');

const locationEl = document.getElementById('location-el');
const imgEl = document.getElementById('weatherimg-el');
const celciusEl = document.getElementById('celcius-el');
const descriptionEl = document.getElementById('description-el');
const refreshBtn = document.getElementById('btnrefresh-el');

const windEl = document.getElementById('wind-el');
const humidEl = document.getElementById('humidity-el');
const pressureEl = document.getElementById('pressure-el');

const apiKey = `a4da553f35302d67f49e5379f773e72c`;
let prevSearch = '';

async function getWeatherData() {
    const searchedVal = inputEl.value || prevSearch;

    if (!searchedVal) {
        inputEl.setAttribute("required", "true");
        inputEl.reportValidity();
        return;
    }
    prevSearch = searchedVal;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedVal}&APPID=${apiKey}&units=metric`);
        if (!response.ok) {
            defaultTextEl.textContent = "City/State not found, please try again.";

            defaultStateEl.classList.remove('hidden');
            weatherSectionEl.classList.add('hidden');
            
            windEl.classList.add('hidden');
            humidEl.classList.add('hidden');
            pressureEl.classList.add('hidden');

            throw new Error("There was an error fetching the API");
        }
        const data = await response.json();
        displayWeatherInfo(data, searchedVal);
    } catch(err) {
        console.log(err);
    }
}

function displayWeatherInfo(data, searchedVal) {
    defaultStateEl.classList.add('hidden');
    weatherSectionEl.classList.remove('hidden');
    weatherSectionEl.classList.add('flex');

    windEl.classList.remove('hidden');
    humidEl.classList.remove('hidden');
    pressureEl.classList.remove('hidden');
    
    const {main: {temp, humidity, pressure}, weather: [{main}], wind: {speed}} = data;

    locationEl.innerHTML = searchedVal.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '); 
    celciusEl.innerHTML = `${Math.round(temp)}°`;
    windEl.innerHTML = `${Math.round(speed)}km/h`;
    humidEl.innerHTML = `${humidity}%`;
    pressureEl.innerHTML = `${pressure}mb`;

    if (main === "Clear") {
        imgEl.src = 'assets/images/img-sun.svg';
        descriptionEl.innerHTML = `Sun is up, go touch some grass.`;
    } else if (main === "Rain") {
        imgEl.src = 'assets/images/img-rain.svg';
        descriptionEl.innerHTML = `Stay dry and safe! Have a great lulu later~`;
    } else if (main === "Clouds") {
        imgEl.src = 'assets/images/img-cloudy.svg';
        descriptionEl.innerHTML = `Non-sunny fans are enjoying right now for sure!`;
    } else if (main === "Thunderstorm") {
        imgEl.src = 'assets/images/img-thunderstorm.svg';
        descriptionEl.innerHTML = `Stay dry and safe wherever you are! It's a serious matter.`;
    } else if (main === "Drizzle") {
        imgEl.src = 'assets/images/img-drizzle.svg';
        descriptionEl.innerHTML = `Stay dry and don't let your new shoes get dirty!`;
    } else if (main === "Snow") {
        imgEl.src = 'assets/images/img-snow.svg';
        descriptionEl.innerHTML = `Stay warm and dry, pop up the bonfire and watch your favorite movie!`;
    } else if (main === "Mist") {
        imgEl.src = 'assets/images/img-mist.svg';
        descriptionEl.innerHTML = `Mist na mist ko na siya...`;
    } else {
        imgEl.src = 'assets/images/img-sun.svg';
    }

    inputEl.value = '';
}

searchBtn.addEventListener("click", () => {
    if (inputEl.value !== "") {
        getWeatherData();
        inputEl.value = '';
    } else {
        inputEl.setAttribute("required", "true");
        inputEl.reportValidity();
    }
})

inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (inputEl.value !== "") {
            getWeatherData();
            inputEl.value = '';
        } else {
            inputEl.setAttribute("required", "true");
            inputEl.reportValidity();
        }
    }
})

refreshBtn.addEventListener("click", () => {
    getWeatherData();
})