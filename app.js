var Flights = require( './flights' )

var state = {
  cost: 200,
  flight: ""
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

  var  url = "http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/GB/GBP/en-GB/EDI/anywhere/anytime/anytime?apiKey=eu863416336220144245856861714199"
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.send(null);

  request.onload = function(){
    var response = request.responseText
    var allFlights = JSON.parse( response )
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
      displayFlights();
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
      displayFlights();
    }
  }
}


var displayFlights = function() {
  var flight = document.getElementById( 'flight' );
  flight.innerHTML = ""
  var p = document.createElement( 'p' );
  p.innerHTML = "Cost: £" + state.flight.Quotes[0].MinPrice
  flight.appendChild( p )
}


var displayBudget = function() {
  var budget = document.getElementById( 'budget' );
  budget.innerHTML = ""
  var p = document.createElement( 'p' )
  p.innerHTML = state.budget
  budget.appendChild( p )
}













