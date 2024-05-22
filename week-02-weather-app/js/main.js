import 'bootstrap/dist/css/bootstrap.min.css';
import { getJSON } from './util';

const BASE_ENDPOINT = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '52fc99a956494caea7b135022179925e';
const city = 'Edmonton';
const currentWeatherEndpoint = `${BASE_ENDPOINT}weather?units=metric&q=${city}&appid=${API_KEY}`;

getJSON(currentWeatherEndpoint).then((data) => {
  console.log(data);
});

// TODO: create an event listener on the form (submit) and call
// getJSON for weather and forecast.

// TODO: create functions to display the weather and forecast in the util.js
// file, import them here and call with the appropriate data.
