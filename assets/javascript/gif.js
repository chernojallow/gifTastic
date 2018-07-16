

// array of soccer players
var soccerPlayers = ["marcelo", "neymer", "messi", "ronaldo", "zidane",
                  "ronaldinho", "xavi", "pogba", "mbappe", "kroos"
                   ];

function playerButtons() {
  $("#button").empty();

  // Loop through the array of animals
  for (var i = 0; i < soccerPlayers.length; i++) {
    // Dynamicaly generate a button 
    var Btons = $("<button>");
    Btons.addClass("playerButton");
    Btons.attr("data-soccer", soccerPlayers[i]);
    Btons.text(soccerPlayers[i]);

    $("#button").append(Btons);
  }
}

// ----- Event Handlers ----- //

// An event handler for the user form to add additional animals to the array
$("#add-Player").on("click", function(e) {
  e.preventDefault();

  // Get the input from the textbox
  var players = $("#input").val().trim();

  // The animal from the textbox is then added to our animalsArr array
  soccerPlayers.push(players);
  $("#input").val("");

  // Redraw the animal buttons
  playerButtons();
});

// fetchAnimalGifs will fetch animal Gifs with the Giphy API
function soccerGifs() {
  // Get the animal name from the button clicked
  var name = $(this).attr("data-soccer");
  var soccerStr = name.split(" ").join("+");

  // Construct the Giphy URL
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + soccerStr + 
                 "&rating=pg-13&limit=20&api_key=dc6zaTOxFJmzC";

  // Make the AJAX call to the Giphy API
  $.ajax({
    url: queryURL,  
    method: "GET"
    
  })
  .done(function( response ) {
    // Get the results array
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
      ndiv.append(img);

      // Append the new Gifs to the gifPanel
      $("#gif").append(ndiv);
    }
  });
}

// animateAnimalGif will animate a still Gif and stop a moving Gif
function animateAndStop() {
  // The image state will be either "still" or "animated"
  var state = $(this).find("img").attr("data-state");

  // Make the Gif either animated or still depending on the "data-state" value
  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

// Render the initial animal buttons when the HTML has finished loading
$(document).ready(function() {
  playerButtons();
});

// An event handler for the animal buttons to fetch appropriate Gifs
$(document).on("click", ".playerButton", soccerGifs);

// Add an event handler for the animal Gifs to make the image animate and stop
$(document).on("click", ".soccer", animateAndStop);













