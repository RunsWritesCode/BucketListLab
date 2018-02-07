

const app = function() {

  var countryList = new CountryList('https://restcountries.eu/rest/v1');
  countryList.getData();

  var select = document.querySelector('#countries');
  var selectView = new SelectView(select, countryList);

  request.get(getCountriesRequestComplete);

}


document.addEventListener('DOMContentLoaded', app);
