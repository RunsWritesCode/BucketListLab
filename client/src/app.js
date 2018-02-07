const CountryList = require('./models/country_list.js');
const SelectView = require('./views/selectView.js');
const storage = require('./services/storage.js');

const app = function() {

  var countryList = new CountryList('https://restcountries.eu/rest/v1');
  countryList.getData();

  var select = document.querySelector('#countries');
  var selectView = new SelectView(select, countryList);

  // request.get(getCountriesRequestComplete);

  selectView.onChange = function (country) {
    storage.save(country)
  }

}


document.addEventListener('DOMContentLoaded', app);
