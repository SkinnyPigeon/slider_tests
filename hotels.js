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