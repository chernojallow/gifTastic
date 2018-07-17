


// Render the initial animal buttons when the HTML has finished loading
$(document).ready(function() {
  playerButtons();
});

$(document).on("click", ".playerButton", soccerGifs);
$(document).on("click", ".soccer", animateAndStop);


// array of soccer players
var soccerPlayers = ["marcelo", "neymer", "messi", "ronaldo", "zidane",
                  "ronaldinho", "xavi", "pogba", "mbappe", "kroos", "robben", "maradona"
                   ];

function playerButtons() {
  $("#button").empty();

  // Loop through the array of soccer players 
  for (var i = 0; i < soccerPlayers.length; i++) {
    // Dynamicaly generate a button 
    var Btons = $("<button>");
    Btons.addClass("playerButton");
    Btons.attr("data-soccer", soccerPlayers[i]);
    Btons.text(soccerPlayers[i]);

    $("#button").append(Btons);
  }
}

$("#add-Player").on("click", function(e) {
  e.preventDefault();
  var players = $("#input").val().trim();

  soccerPlayers.push(players);
  $("#input").val("");

  // call the function
  playerButtons();
});

// find the players with the Giphy API
function soccerGifs() {
  var name = $(this).attr("data-soccer");
 
  // Construct the Giphy URL
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + 
                 "&rating=pg-13&limit=6&api_key=dc6zaTOxFJmzC";

  // Make the AJAX call to the Giphy API
  $.ajax({
    url: queryURL,  
    method: "GET"
    
  })
  .done(function( response ) {
    var arrayPlayers = response.data;

    // Create and display div elements for each of the returned Gifs
    $("#gif").empty();
    for (var i = 0; i < arrayPlayers.length; i++) {
      var ndiv = $("<div>");
      ndiv.addClass("soccer");

      var nRating = $("<h2>").html("Rating: " + arrayPlayers[i].rating);
      ndiv.append(nRating);

      var img = $("<img>");
      img.attr("src", arrayPlayers[i].images.fixed_height_still.url);
      img.attr("data-still", arrayPlayers[i].images.fixed_height_still.url);
      img.attr("data-animate", arrayPlayers[i].images.fixed_height.url);
      img.attr("data-state", "still");
      img.addClass("animate");
      ndiv.append(img);

      $("#gif").append(ndiv);
    }
  });
}

// function to animate a still gif and stop a moving gif
function animateAndStop() {

  $(document).on("click", ".animate", function(){
  // The image state will be either "still" or "animated"
  var state = $(this).attr("data-state");

  // Make the Gif either animated or still depending on the "data-state" value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }  
  });
}













