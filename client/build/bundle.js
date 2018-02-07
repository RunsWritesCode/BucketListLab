/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const CountryList = __webpack_require__(1);
const SelectView = __webpack_require__(2);

const app = function() {

  var countryList = new CountryList('https://restcountries.eu/rest/v1');
  countryList.getData();

  var select = document.querySelector('#countries');
  var selectView = new SelectView(select, countryList);

  // request.get(getCountriesRequestComplete);

}


document.addEventListener('DOMContentLoaded', app);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map