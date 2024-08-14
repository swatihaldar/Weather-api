const apikey = '3cb1e3bc09d345e92039e64c76ec688d';
const cityEI = document.getElementById('city');
const temperatureEI = document.getElementById('temperature');
const tempEI = document.getElementById('temp');
const minTempEI = document.getElementById('min-temp');
const maxTempEI = document.getElementById('max-temp');
const windDegreeEI = document.getElementById('wind-degree');
const feelLikeEI = document.getElementById('feel-like');
const humiditySpanEI = document.getElementById('humidity-span');
const windSpeedSpanEI = document.getElementById('wind-speed-span');
const sunriseEI = document.getElementById('sunrise');
const sunsetEI = document.getElementById('sunset');
const dailyForecastEI = document.getElementById('daily-forecast');
const weatherImgEI = document.getElementById('weather-img');
const humidityImgEI = document.getElementById('humidity-img');
const windImgEI = document.getElementById('wind-img');

document.getElementById('search-button').addEventListener("click", () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        requestApi(city);
    } else {
        alert('Please enter a city name');
    }
});

function requestApi(city) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    fetch(api)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(result => {
            weatherDetails(result);
            getForecast(city);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again later.');
        });
}

function weatherDetails(info) {
    cityEI.textContent = info.name;

    const { temp, temp_min, temp_max, feels_like, humidity } = info.main;
    const { speed, deg } = info.wind;
    const { sunrise, sunset } = info.sys;
    const weatherCondition = info.weather[0].main.toLowerCase();

    temperatureEI.textContent = `${temp}°C`;
    tempEI.textContent = `${temp}°C`;
    minTempEI.textContent = `${temp_min}°C`;
    maxTempEI.textContent = `${temp_max}°C`;
    feelLikeEI.textContent = `${feels_like}°C`;
    humiditySpanEI.textContent = `${humidity}%`;
    windSpeedSpanEI.textContent = `${speed} km/h`;
    windDegreeEI.textContent = `${deg}°`;
    sunriseEI.textContent = new Date(sunrise * 1000).toLocaleTimeString();
    sunsetEI.textContent = new Date(sunset * 1000).toLocaleTimeString();

    let weatherImg, humidityImg, windImg;
    switch (weatherCondition) {
        case 'clear':
            weatherImg = '/sunny.png';
            humidityImg = '/low-humidity.png';
            windImg = '/clam-wind.png';
            break;
        case 'clouds':
            weatherImg = '/cloudy.png';
            humidityImg =  '/low-humidity.png';
            windImg = '/clam-wind.png';
            break;
        case 'rain':
            weatherImg = '/rainy.png';
            humidityImg =  '/low-humidity.png';
            windImg = '/moderate-wind.png';
            break;
        case 'snow':
            weatherImg = '/snow.png';
            humidityImg =  '/low-humidity.png';
            windImg = '/clam-wind.png';
            break;
        case 'thunderstorm':
            weatherImg = '/thunderstorm.png';
            humidityImg =  '/low-humidity.png';
            windImg = '/moderate-wind.png';
            break; 
        default:
            weatherImg = '/sunny.png';
            humidityImg =  '/low-humidity.png';
            windImg = '/clam-wind.png';
    }

    weatherImgEI.src = weatherImg;
    humidityImgEI.src = humidityImg;
    windImgEI.src = windImg;
}

function getForecast(city) {
    const forecastApi =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;
    fetch(forecastApi)
        .then(response => response.json())
        .then(data => {
            displayDailyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
}

function displayDailyForecast(forecast) {
    let dailyforecast = '';
    forecast.forEach((day, idx) => {
        if (idx % 8 === 0) {
            dailyforecast += `
            <div class="card">
                <div class="time">${moment(day.dt * 1000).format('dddd')} <span></span></div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="" srcset="">
                <div class="temp">${day.main.temp}°C</div>
            </div>
            `;
        }
    });

    dailyForecastEI.innerHTML = dailyforecast;
}
