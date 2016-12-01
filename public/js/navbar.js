$(document).ready(function(){
  $('#search-btn').click(function(){
    var userSearch = "{" +  $("#searchBar-input").val() + "}"
    window.location = "https://redmart.com/search/" + userSearch
  })
})
