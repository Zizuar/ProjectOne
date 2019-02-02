$(document).ready(function(){

// API variables
var ticketmasterKey = "jjDMAaUGG3IIUAXBGRIisAAaWHqb6GpW";
var defaultCity = "Houston";
var newCity = ""; // We will need an input form for the user to put a different city
var ticketmasterURL =
"https://app.ticketmaster.com/discovery/v2/events.json?" + "&city=" + defaultCity + "&sort=date,asc&source=Ticketmaster&localStartDateTime=2019-02-02T00:00:00&countryCode=US&size=4&apikey=" + ticketmasterKey;


// AJAX call to get intial information needed
function getTicket() {
$.ajax({
    url: ticketmasterURL,
    method: "GET",
  })

// Retrieving the data
.then(function(response){
    console.log(ticketmasterURL);
    console.log(response); // log the response

    var events = (response._embedded.events);
    console.log(events);

    for (var i = 0; i < events.length; i++) {
        var eventDiv = $("<div id='tm-result-box'>");
        console.log(events[i]);

        var eLink = (events[i].url);
        var eName = (events[i].name);
        var eDate = moment(events[i].dates.start.localDate, "YYYY-MM-DD").format("MMMM D, YYYY - dddd");
        var eTime = moment(events[i].dates.start.localTime, "HH:mm:ss").format("h:mm A");
        var eVenue = (events[i]._embedded.venues[0].name);
        var eDetail = (events[i].info);
        var eImg = $("<img src=" + events[i].images[1].url + " width=350 height=217>");

        
        var p = $("<p>");
        p.append(eName + "<BR>Dates: " + eDate + "<BR>Venue: " + eVenue + "<BR>Time: " + eTime + "<BR><BR>Details: " + eDetail + "<BR>");
        p.append($("<a>").attr("href", eLink).attr("target", "_blank").text("Get Tickets"));
        
        
        eventDiv.append(eImg);
        eventDiv.append(p);

        if (eDetail == null || eDetail == undefined) {
            eventDiv.empty();
            var newP = $("<p>");

            newP.append(eName + "<BR>Dates: " + eDate + "<BR>Venue: " + eVenue + "<BR>Time: " + eTime + "<BR><BR>**No details provided for this event." + "<BR>");
            newP.append($("<a>").attr("href", eLink).attr("target", "_blank").text("Get Tickets"));

            eventDiv.append(eImg);
            eventDiv.append(newP);
        }
        
        $("#tm-results").append(eventDiv);
    }

    // ** Psuedocoded this portion for until all files have been allocated from each person in the group **
    // $("#submit-button").on("click", function(){
    //     event.preventDefault();

    //     if (defaultCity != defaultCity) {

    //         newCity = $("input").val().trim();
    //         ticketmasterURL = "https://app.ticketmaster.com/discovery/v2/events.json?" + "&city=" + newCity + "&sort=date,asc&source=Ticketmaster&localStartDateTime=2019-02-02T00:00:00&countryCode=US&size=4&apikey=" + ticketmasterKey;
            
    //         getTicket();
    //     } else {

    //         getTicket();
    //     };
    // })
});}
getTicket();

});