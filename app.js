var state = {
  cost: 0
}

window.onload = function(){
  var slider = document.getElementById( 'slider' );
  slider.onchange = function() {
    state.cost = slider.value
    console.log( state.cost )
    display();
  }
}

var display = function() {
  var here = document.getElementById( 'here' );
  here.innerHTML = ""
  var p = document.createElement( 'p' )
  p.innerHTML = state.cost
  here.appendChild( p )
}


