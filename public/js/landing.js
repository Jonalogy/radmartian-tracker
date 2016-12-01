$(document).ready(function(){
  console.log("DOMContentLoaded!");

  $("#login-btn").click(function(){
    console.log("Clicked Login");
    $('.contain-view').toggleClass("loginOpen")
    // window.location="auth/login";
  })
  $("#loginClose ").click(function(){
    console.log("Clicked Login");
    $('.contain-view').removeClass("loginOpen")
  })

  $("#innerLogin-btn").click(function(){
    console.log("Attempting to Login")
  })

})
