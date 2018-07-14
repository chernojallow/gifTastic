

var topics = ["kaka", "ronaldo","messi","hazard","zidane", "iniesta", "cafu"];

// functions for displaying soccer data
function displayButtons() {

    $("#empty").empty();



for (var i =0; i < topics.length; i++){
  
    // dynamically generate button for all topics
    var Bottons = $("<button>");
     Bottons.addClass("soccerButtons");
     Bottons.attr("data-name", topics[i]);
     Bottons.text(topics[i]);

     $("#empty").append(button);
    
}
}
// event listeners for all our buttons
$("button").on("click", function(e){
    
    e.preventDefault();
  
     var soccer = $("#movie-input").val().trim();
     topics.push(soccer);

   // call the function

   displayButtons();

});

  // finding soccer gifs with the Giphy API
function findSoccerGifs() {
  
var soccerName = $(this).attr("data-name");
var soccerStars = soccerName.split(" ").join("+");

// construct the Giphy URL

var queryURL = "" + soccerStars + ""

// make the Ajax call to the Giphy API


$.ajax({
  
    url: queryURL,
    method: "GET",
}).then(function(response){

    var ratings = response.rated;

    // display div for each of the element return 

    for ( var i = 0; i < ratings.length; i++){
        
        var pOne =("<div class = 'soccer'>");
        var pTwo = $("<p>").text("Rating: " + ratings[i].rating);
        
        pOne.append(pTwo);
    }

}

}

