const CountryList = require('./models/country_list.js');
const SelectView = require('./views/selectView.js');
const storage = require('./services/storage.js');
const Request = require('./services/request.js');
const CountryView = require('./views/countryView.js')
const countryView = new CountryView();

const request = new Request('http://localhost:3000/api/countries')

const getCountriesRequestComplete = function(allCountries) {
  allCountries.forEach(function(country) {
    countryView.addCountry(country);
  });
}


const app = function() {

  var countryList = new CountryList('https://restcountries.eu/rest/v1');
  countryList.getData();

  var select = document.querySelector('#countries');
  var selectView = new SelectView(select, countryList);

  request.get(getCountriesRequestComplete);

  selectView.onChange = function (country) {
    storage.save(country)
  }

}


document.addEventListener('DOMContentLoaded', app);
