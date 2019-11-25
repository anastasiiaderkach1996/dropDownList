
document.getElementById('country').addEventListener('change', function(e) {
       console.log(e.target.value);
       sendAjaxForCities();

})
function sendAjaxForCountries() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText)
            populateCountries(xhttp.responseText)
        };
    };
    xhttp.open('GET', '/api/getCountry',true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send()
};
sendAjaxForCountries();

function populateCountries(data) {
    const countries = JSON.parse(data);
    let countryNames = countries.map(country => country.countryName);
    createOptions(countryNames);
    sendAjaxForCities();   
};

function createOptions(names) {
   const countryDd = document.getElementById('country');
   names.forEach(name => {
       const option = document.createElement('option');
       option.text = name;
       countryDd.appendChild(option);
   });
};

function sendAjaxForCities() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText)
            populateCities(xhttp.responseText)
    }};
    xhttp.open('GET','/api/cities/getCities', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify({item: country}))
};
 
function populateCities(data) {
     const cities = JSON.parse(data);
     const selectedCountry = document.getElementById('country').value;
     let citiesNames = cities.filter(city => city.country == selectedCountry);
     let citiesName = citiesNames.map(city => city.citiesName);
     console.log(citiesName)
     createOptionsForCities(citiesName)
};

function createOptionsForCities(names) {
    const citiesDd = document.getElementById('cities');
    while (citiesDd.firstChild) {
        citiesDd.removeChild(citiesDd.firstChild);
      }
    names.forEach(name => {
        const option = document.createElement('option');
        option.text = name;
        citiesDd.appendChild(option);
    });
}

