var CountryList = function(url) {
  this.url = url;
  this.countries = [];
  this.onLoad = null;
}

CountryList.prototype.getData = function () {
  var request = new XMLHttpRequest();
  request.open('GET', this.url);

  request.addEventListener('load', function() {
    if (request.status !== 200) return;
    var jsonString = request.responseText;
    var countries = JSON.parse(jsonString);
    this.countries = countries;
    this.onLoad();
  }.bind(this));

  request.send();
}

module.exports = CountryList;
