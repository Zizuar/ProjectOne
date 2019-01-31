var tnewsKey = "ec8a04833d7b4384bb1c5909c5e516f8";
var tnewsURL = "https://newsapi.org/v2/top-headlines?sources=time&pagesize=5&apiKey=" + tnewsKey;

$.ajax({
    url: tnewsURL,
    method: "GET",
  })

.then(function(response){
    console.log(tnewsURL); // log the URL
    console.log(response); // log the response

    var tnews = (response.articles);

    for (var t = 0; t <tnews.length; t++) {
        var tnewsDiv = $("<div id='tnewst-result-box'>");
        console.log(tnews[t]);

        var tnTitle = (tnews[t].title);
        var tnDesc = (tnews[t].description);
        var tnSource = (tnews[t].source.name);
        var tnUrl = (tnews[t].url);
        var tnAuthor = (tnews[t].author);
        var tnPublished = new Date((tnews[t].publishedAt));
        console.log(new Date(tnPublished));

        var tnp = $("<p>");
        tnp.append("<b>" + tnTitle + "</b><BR><i>Author: " + tnAuthor + "<BR>Source: " + tnSource + "</i><BR>Published: " + tnPublished + "<BR><BR>" + tnDesc + "<BR>");
        tnp.append($("<a>").attr("href", tnUrl).attr("target", "_blank").text("Full Article..."));

        tnewsDiv.append(tnp);

        $("#tnews-results").append(tnewsDiv);
    }

});