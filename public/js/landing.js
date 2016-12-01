$(document).ready(function(){
  console.log("DOMContentLoaded!");

  $("#login-btn").click(function(){
    console.log("Clicked Login");
    window.location="auth/login";
  })

})
