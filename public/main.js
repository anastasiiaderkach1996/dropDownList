
function sendAjax() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status ==200) {
            console.log(xhttp.responseText)
            populateCountries(xhttp.responseText)
        }
    };
    xhttp.open('GET', '/api/getCountry',true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send()
};
sendAjax();

function populateCountries(data) {
    const countries = JSON.parse(data);
    let countryNames = countries.map(country => country.countryName);
    createOptions(countryNames);
}

function createOptions(names) {
   const countryDd = document.getElementById('country');
   names.forEach(name => {
       const option = document.createElement('option');
       option.text = name;
       countryDd.appendChild(option);
   });

}

// xhttp.send(JSON.stringify({item:country}));
// function heandleResponse(data) {
//         const cities = JSON.parse(data);
//         const oldChilds = citySelect.children;
//          citySelect.disabled = false;
//          cities.forEach(city => {
//          let option = document.createElement('option');
//          option.value = city.city_id;
//          option.text = city.city_name;
//         citySelect.appendChild('option');

// })
// }
