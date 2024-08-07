/**
 * Returns JSON data from the url
 * @param {string} url - the url for the endpoint
 * @returns The JSON data from the endpoint
 */
export const getJSON = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

/**
 * Displays a weather forecast for a given location.
 * @param {Object[]} data - The array of forecast weather objects.
 * @param {Object} el - The reference to the display DOM element.
 */
export const displayForecast = (data, el) => {
  const list = document.createElement('ul');
  let currDate;
  let nextDate;
  let currItem;

  data.forEach((item) => {
    // destructuring for display variables
    const { dt_txt: date } = item;
    const { temp_max: high, temp_min: low } = item.main;
    const { main: cond } = item.weather[0];

    nextDate = date.split(' ')[0];
    if (currDate !== nextDate) {
      currDate = nextDate;

      // create a new item
      currItem = document.createElement('li');
      currItem.classList.add('forecast-item');
      currItem.innerHTML = `<p>${currDate}</p>`;
    }

    currItem.innerHTML += `
                  <div class="forecast-detail">
                      <p><strong><span class="time">Time: ${date.substr(
                        date.indexOf(' ')
                      )}</span></strong></p>
                      <ul>
                          <li class="condition"> Condition: ${cond}</li>
                          <li class="temp">Temp: ${(high + low) / 2}</li>
                      </ul>
                  </div>
              `;

    list.append(currItem);
  });

  el.append(list);
};

/**
 * Displays the current weather for a given location.
 * @param {Object} data - The object of returned weather data.
 * @param {Object} el - The reference to the display DOM element.
 */
export const displayWeather = (data, el) => {
  // DOM insertion points
  const loc = el.querySelector('.details>.location');
  const date = el.querySelector('.details>.date');
  const conditions = el.querySelector('.details>.conditions');
  const temp = el.querySelector('.details>.temp');
  const sunrise = el.querySelector('.details>.sunrise');
  const sunset = el.querySelector('.details>.sunset');

  // display the current weather data
  loc.innerText = `${data.name}, ${data.sys.country}`;
  date.innerText = new Date(+data.dt * 1000);
  conditions.innerText = data.weather[0].main;
  temp.innerText = data.main.temp;
  sunrise.innerText = new Date(+data.sys.sunrise * 1000);
  sunset.innerText = new Date(+data.sys.sunset * 1000);
};
