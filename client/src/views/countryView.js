var CountryView = function() {
  this.countries = [];
}

CountryView.prototype.addCountry = function(country) {
  this.countries.push(country);
  this.render(country);
}

CountryView.prototype.render = function (country) {
  const ul = document.querySelector('#countries-ul');
  const li = document.createElement('li');
  li.innerText = country.name;
  ul.append(li);
};

module.exports = CountryView;
