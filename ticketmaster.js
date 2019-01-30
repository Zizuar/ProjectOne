// API variables
var ticketmasterKey = "jjDMAaUGG3IIUAXBGRIisAAaWHqb6GpW";
var defaultCity = "Houston";
var newCity = []; // We will need an input form for the user to put a different city
var ticketmasterURL =
"https://app.ticketmaster.com/discovery/v2/events.json?" + "&city=" + defaultCity + "&localStartDateTime&countryCode=US&source=Ticketmaster&page=0&size=4&apikey=" + ticketmasterKey;


// AJAX call to get intial information needed
$.ajax({
    url: ticketmasterURL,
    method: "GET",
  })

// Retrieving the data
.then(function(response){
    // console.log(ticketmasterURL);
    console.log(response); // log the response

    var events = (response._embedded.events);
    console.log(events);

    for (var i = 0; i < events.length; i++) {
        var eventDiv = $("<div id='result-box'>");
        console.log(events[i]);

        var eLink = (events[i].url);
        var eName = (events[i].name);
        var eDate = moment(events[i].dates.start.localDate, "YYYY-MM-DD").format("MMMM D, YYYY - dddd");
        var eTime = moment(events[i].dates.start.localTime, "HH:mm:ss").format("h:mm A");
        var eVenue = (events[i]._embedded.venues[0].name);
        var eImg = $("<img src=" + events[i].images[1].url + ">");

        var p = $("<p>");
        p.append(eName + "<BR>Dates: " + eDate + "<BR>Venue: " + eVenue + "<BR>Time: " + eTime + "<BR>");
        p.append($("<a>").attr("href", eLink).attr("target", "_blank").text("Get Tickets"));

        eventDiv.append(eImg);
        eventDiv.append(p);

        $("#results").append(eventDiv);
    }

});