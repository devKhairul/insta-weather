
const form = document.querySelector('form');
const card = document.querySelector('.card');

const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data => {
    
    // console.log(data);
    const details = document.querySelector('.details');

    details.innerHTML = `
    <h5 class="my-3">${data.details.EnglishName}</h5>
    <div class="my-3">${data.weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${data.weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>`;

    // Remove d-none class if exits
    if ( card.classList.contains('d-none') ) {
        card.classList.remove('d-none');
    }

    // update day/night image
    if (data.weather.IsDayTime) {
        time.setAttribute('src', 'img/day.svg');
    } else {
        time.setAttribute('src', 'img/night.svg');
    }
    
    // update icon
    icon.setAttribute('src','../img/icons/'+data.weather.WeatherIcon+'.svg');
});

const updateCity = async (city ) => {
  const details = await getCity(city);
  const weather = await getWeather(details.Key);

  return {
      details: details,
      weather: weather
  };
}

form.addEventListener('submit', e => {
    e.preventDefault();

    // Get City value
    const city = form.city.value.trim();

    // Reset the form
    form.reset();

    // Update the UI 
    updateCity(city)
        .then(data => updateUI(data))
        .catch(error => console.log(error))

    // Save city to local storage    
    localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => {
            updateUI(data)
        }).catch(error => console.log(error));
}