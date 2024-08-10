import 'bootstrap/dist/css/bootstrap.min.css';
import { displayForecast, displayWeather, getJSON } from './util';

/**
 * Simple weather display application for demonstrating async for JSON and
 * best practices for JavaScript development.  The script makes use of the
 * OpenWeatherMap weather API.
 */

/**
 * @const {string} BASE_ENDPOINT
 */
const BASE_ENDPOINT = 'https://api.openweathermap.org/data/2.5/';
/**
 * @const {string} API_KEY
 */
const API_KEY = 'YOUR_API_KEY_HERE';

document
  .querySelector('.frm.weather')
  .addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const location = evt.target.elements['location'].value.trim();

    // The following relies on Bootstrap classes. You will need to
    // add additional classes to the HTML elements to get the full
    // effect of the validation classes. This works, but is a little
    // janky, you'll see.
    if (location === '') {
      evt.target.elements['location'].classList.add(
        'form-control',
        'is-invalid'
      );
    } else {
      evt.target.elements['location'].classList.remove(
        'form-control',
        'is-invalid'
      );

      const currentWeatherEndpoint = `${BASE_ENDPOINT}weather?units=metric&q=${location}&appid=${API_KEY}`;
      const weatherForecastEndpoint = `${BASE_ENDPOINT}forecast?units=metric&q=${location}&appid=${API_KEY}`;

      try {
        const currentWeather = await getJSON(currentWeatherEndpoint);
        displayWeather(
          currentWeather,
          document.querySelector('.weather-display')
        );

        const forecast = await getJSON(weatherForecastEndpoint);
        displayForecast(
          forecast.list,
          document.querySelector('.weather-display > .forecast')
        );
      } catch (ex) {
        console.error(`There was an error: ${ex}`);
      }
    }
  });
