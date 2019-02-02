$(document).ready(function(){
var weatherKey = "bf7ed81bb01c60d9afa990d276987404";
var defaultCity = "houston";
var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + defaultCity + "&units=imperial&appid=" + weatherKey;
// var weatherURL = "https://api.openweathermap.org/data/2.5/weather?" + defaultCity + ",US&units=imperial&appid=" + weatherKey;
//var weatherURL = "https://api.openweathermap.org/data/2.5/weather?" + cityZip + ",US&units=imperial&appid=" + weatherKey;

function fetchWeather() {
    $.ajax({
    url: weatherURL,
    method: "GET"
})

.then(function(response) {
    // Log the queryURL
    console.log(weatherURL);
    
    // Log the resulting object
    console.log(response);
    
    //Transfer content to HTML by class 
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".temp").text("Temperature (F) " + response.main.temp);
    $(".description").text("Description:  " + response.weather[0].description);
    $(".owList").html("<h2>" + "Temperature (F):&nbsp" + response.main.temp + "&nbsp&nbsp Wind Speed:&nbsp " + response.wind.speed + "&nbsp&nbspHumidity:&nbsp " + response.main.humidity + "&nbsp&nbspDescription:&nbsp  " + response.weather[0].description);
    
    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + response.main.temp);
    console.log("Description: " + response.weather[0].description);

});
}

//Firebase
var config = {
    apiKey: "AIzaSyChs0oADd_EXPwlBZrMaXOijhGbmyMmt3Y",
    authDomain: "project-one-e61ae.firebaseapp.com",
    databaseURL: "https://project-one-e61ae.firebaseio.com",
    projectId: "project-one-e61ae",
    storageBucket: "project-one-e61ae.appspot.com",
    messagingSenderId: "581990527679"
};

firebase.initializeApp(config);

var loginDetails = firebase.database();

//Note the IDs given to the Button and input fields
$('#userSubmit').on('click', function(){
    var loginName = $('#name').val().trim();
    var loginPassword = $('#password').val().trim();
    var userCity = $('#userCity').val().trim();

//This is not the full authentication method, but does
    var databaseDetails = {
        name: loginName,
        password:loginPassword,
        userCity: userCity
    };

    loginDetails.ref().push(databaseDetails);

    if (defaultCity != userCity) {
        weatherURL = "https://api.openweathermap.org/data/2.5/weather?" + userCity + ",US&units=imperial&appid=" + weatherKey;
    }
    fetchWeather();
  });

  fetchWeather();
});