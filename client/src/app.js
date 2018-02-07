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

const createRequestComplete = function(country) {
  countryView.addCountry(country);
}

const createButtonClicked = function(e) {
  e.preventDefault();
  console.log('button clicked');

  const country = storage.get()
  request.post(createRequestComplete, country);
}

const deleteButtonClicked = function() {
  request.delete(deleteRequestComplete);
}

const deleteRequestComplete = function() {
  countryView.clear();
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

  const createSaveButton = document.querySelector('#save');
  createSaveButton.addEventListener('click', createButtonClicked);

  const deleteButton = document.querySelector('#delete');
  deleteButton.addEventListener('click', deleteButtonClicked);

}


document.addEventListener('DOMContentLoaded', app);
