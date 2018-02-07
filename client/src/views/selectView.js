var storage = require('../services/storage.js');

var SelectView = function(selectElement, countryList) {
  this.selectElement = selectElement;
  this.countryList = countryList;
  this.onChange = null;

  this.selectElement.addEventListener('change', function(e) {
    var target = e.target;
    var index = target.selectedIndex;
    var country = this.countryList.countries[target.selectedIndex];

    country.index = index;
    this.onChange(country);
  }.bind(this), false);

  this.countryList.onLoad = this.populate.bind(this);

};

SelectView.prototype = {

  populate: function () {
    var countries = this.countryList.countries;

    countries.forEach(function (country, index) {
      this.addOption(country, index);
    }.bind(this));

    this.setSelectedFromLocal();
  },

  setSelectedFromLocal: function() {
    var savedCountry = storage.get();

    if (savedCountry) {
      this.setSelectedCountry(savedCountry);
    }
  },

  addOption: function(country, index) {
    var option = document.createElement('option');
    option.value = index.toString();
    option.text = country.name;
    this.selectElement.appendChild(option);
  },

  setSelectedCountry: function(country) {
    this.selectElement.selectedIndex = country.index;
    this.onChange(country);
  }

};

module.exports = SelectView;
