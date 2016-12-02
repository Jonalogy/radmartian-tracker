$(document).ready(function(){
  navBarResize()

  //Event Listeners
  $('#search-btn').click(function(){
    var userSearch = "{" +  $("#searchBar-input").val() + "}"
    window.location = "https://redmart.com/search/" + userSearch
  })
  $(window).resize(function(){navBarResize()})
})

function navBarResize(){
  var screenWidth = $(window).width()
  var screenHeight = $(window).height()
  console.log( "Screen: " + screenWidth + " x " + screenHeight)
  var navBarWidth = $("#navBar").width()
  var navBarHeight = $("#navBar").height()
  console.log( "Navbar: " + navBarWidth + " x " + navBarHeight)

  if (screenWidth < 1174 ){
    $("#nav-help").hide()
  } else {
    $("#nav-help").show()
  }
  if (screenWidth < 1100 ){
    $("#nav-cart").hide()
  } else {
    $("#nav-cart").show()
  }
  if (screenWidth < 1050 ){
    $("#nav-signup").hide()
  } else {
    $("#nav-signup").show()
  }
}
