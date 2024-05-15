import 'bootstrap/dist/css/bootstrap.min.css';

const BASE_ENDPOINT = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '52fc99a956494caea7b135022179925e';
const city = 'Edmonton';
const currentWeatherEndpoint = `${BASE_ENDPOINT}weather?q=${city}&appid=${API_KEY}`;

fetch(currentWeatherEndpoint)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });

// TODO: include a call to fetch the 5-day forecast
