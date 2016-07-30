/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Flights = __webpack_require__( 1 )
	var Hotels = __webpack_require__( 3 )
	var DisplayFlights = __webpack_require__( 2)
	var HotelView = __webpack_require__( 4 )
	
	var state = {
	  cost: 200,
	  flight: "",
	  budget: 0
	}
	
	var capitalize = function( string ) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	window.onload = function(){
	  var flightsearch
	  var slider = document.getElementById( 'slider' );
	  var budget = document.getElementById( 'budget' );
	  var p = document.createElement( 'p' )
	  p.innerHTML = 200
	  budget.appendChild( p )
	
	  slider.onchange = function() {
	    state.cost = slider.value
	    displayBudget();
	  }
	
	  var  flightUrl = "http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/GB/GBP/en-GB/EDI/anywhere/anytime/anytime?apiKey=eu863416336220144245856861714199"
	  var flightsRequest = new XMLHttpRequest();
	  flightsRequest.open( "GET", flightUrl );
	  flightsRequest.send( null );
	
	  flightsRequest.onload = function() {
	    var flightResponse = flightsRequest.responseText
	    var allFlights = JSON.parse( flightResponse )
	    flightsearch = new Flights( allFlights )
	    console.log( allFlights )
	  }
	
	
	
	  var click = document.getElementById( 'click' )
	  var form = document.getElementById( 'city-form' );
	  var city = document.getElementById( 'city' )
	
	  click.onclick = function( event ) {
	    flightsearch.getCode( capitalize(city.value) )
	    var code = flightsearch.airport
	    console.log( code )
	
	    var  url = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/GB/GBP/en-GB/EDI/" + code + "/2016-09-05/2016-09-07?apiKey=eu863416336220144245856861714199"
	    var request = new XMLHttpRequest();
	    request.open("GET", url);
	    request.send(null);
	
	    request.onload = function(){
	      var response = request.responseText
	      var flights = JSON.parse( response )
	      console.log( flights )
	      state.flight = flights
	      var displayFlights = new DisplayFlights( state.flight )
	      updateBudget();
	      console.log( state.budget )
	
	      var hotelUrl = "http://terminal2.expedia.com/x/mhotels/search?city=" + city.value.toUpperCase() + "&checkInDate=2016-12-01&checkOutDate=2016-12-03&room1=2&apikey=a7zmRxiJIznimU5WOlHpTRjDAOFZsrga";
	      var hotelsRequest = new XMLHttpRequest();
	      hotelsRequest.open( "GET", hotelUrl )
	      hotelsRequest.send( null );
	
	      hotelsRequest.onload = function() {
	        var hotelResponse = hotelsRequest.responseText;
	        var allHotels = JSON.parse( hotelResponse );
	        hotelSearch = new Hotels( allHotels )
	        // console.log( allHotels )
	        hotelSearch.sort( state.budget )
	        // console.log( hotelSearch.budgetHotels )
	        displayHotel = new HotelView( hotelSearch.budgetHotels )
	      }
	    } 
	  }
	
	
	
	  form.onsubmit = function( event ) {
	    event.preventDefault();
	    flightsearch.getCode( capitalize(city.value) )
	    var code = flightsearch.airport
	    console.log( code )
	
	    var  url = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/GB/GBP/en-GB/EDI/" + code + "/2016-09-05/2016-09-07?apiKey=eu863416336220144245856861714199"
	    var request = new XMLHttpRequest();
	    request.open("GET", url);
	    request.send(null);
	
	    request.onload = function(){
	      var response = request.responseText
	      var flights = JSON.parse( response )
	      console.log( flights )
	      state.flight = flights
	      var displayFlights = new DisplayFlights( state.flight )
	      updateBudget();
	      console.log( state.budget )
	    }
	  }
	}
	
	
	
	
	
	var displayBudget = function() {
	  var budget = document.getElementById( 'budget' );
	  budget.innerHTML = ""
	  var p = document.createElement( 'p' )
	  p.innerHTML = state.budget
	  budget.appendChild( p )
	}
	
	var updateBudget = function() {
	  state.budget = state.cost - state.flight.Quotes[0].MinPrice
	}
	
	
	
	
	
	
	
	
	
	
	
	
	


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Flights = function( list ) {
	  this.list = list;
	  this.airport = "";
	}
	
	Flights.prototype = {
	  getCode: function( search ) {
	    console.log( this.list.Places )
	    this.list.Places.forEach( function( place, index ) {
	      if( search === place.Name || search === place.CityName ) {
	        // console.log( place.SkyscannerCode )
	        this.airport = place.SkyscannerCode
	      }
	    }.bind( this ))
	  },
	}
	
	
	module.exports = Flights;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var DisplayFlights = function( savedFlight ) {
	  var flight = document.getElementById( 'flight' );
	  flight.innerHTML = ""
	  var p = document.createElement( 'p' );
	  p.innerHTML = "Cost: £" + savedFlight.Quotes[0].MinPrice
	  flight.appendChild( p )
	}
	
	module.exports = DisplayFlights;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var Hotels = function( list ) {
	  this.list = list;
	  this.budgetHotels = [];
	}
	
	Hotels.prototype = {
	  sort: function( budget ) {
	    this.list.hotelList.forEach( function( hotel, index ) {
	      if( hotel.lowRate <= budget ) {
	        this.budgetHotels.push( hotel )
	      }
	    }.bind( this ))
	  }
	}
	
	module.exports = Hotels;

/***/ },
/* 4 */
/***/ function(module, exports) {

	var HotelView = function( hotels ) {
	  console.log( hotels )
	  var hotel = document.getElementById( 'hotels' );
	  hotel.innerHTML = "" 
	  hotels.forEach( function(disHotel, index ) {
	    var p = document.createElement( 'p' );
	    p.innerHTML = "Name: " + disHotel.localizedName + " Cost: £" + disHotel.lowRate
	    hotel.appendChild( p )
	  })
	}
	
	module.exports = HotelView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map