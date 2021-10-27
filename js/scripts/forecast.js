
// Accuweather API Key
const key = '1H8Di0YCQ6IEuloAcxSIWQfQHjvc0gTQ';



// Get City Information

const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
}

// Get Weather Information

const getWeather = async(id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

}

getCity('Mississauga')
    .then(data => {
       return getWeather(data.Key)
        .then(data => {
            console.log(data);
        });
    })
    .catch(error => console.log(error));