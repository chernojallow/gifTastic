





var topics = ["kaka", "ronaldo","messi","hazard","zidane", "iniesta", "cafu"];

// functions for displaying soccer data
function displayButtons() {

    $("#emptyPanel").empty();


for (var i =0; i < topics.length; i++){
  
    // dynamically generate button for all topics
    var Bottons = $("<button>");
     Bottons.addClass("soccerButtons");
     Bottons.attr("data-name", topics[i]);
     Bottons.text(topics[i]);

     $("#emptyPanel").append(Bottons);
    
}
}
// event listeners for all our buttons
$("#add-soccerPlayer").on("click", function(e){
    
    e.preventDefault();
  
     var soccer = $("#soccer-input").val().trim();
     topics.push(soccer);

     $("#soccer-input").val("");

   // call the function

   displayButtons();

});

  // finding soccer gifs with the Giphy API
function findSoccerGifs() {
  
var soccerName = $(this).attr("data-soccer");
var soccerStars = soccerName.split(" ").join("+");

// construct the Giphy URL

var queryURL =  "http://api.giphy.com/v1/gifs/search?q=" + soccerStars + "&api_key=dc6zaTOxFJmzC&limit=10";


// make the Ajax call to the Giphy API


$.ajax({
  
    url: queryURL,
    method: "GET",
}).then(function(response){

    var ratings = response.data;

    // display div for each of the element return 

    for ( var i = 0; i < ratings.length; i++){
        
       // skip something
      //  $("#soccerGifs").empty();

        var pOne =("<div class = 'soccer'>");
        var pTwo = $("<p>").text("Rating: " + ratings[i].rating);
        
        pOne.append(pTwo);

       // creating an element to hold the image
       var img = $("<img>");
       image.attr("src", ratings[i].images.fixed_height_still.url);
       image.attr("data-still", ratings[i].images.fixed_height_still.url);
       image.attr("data-soccer", ratings[i].images.fixed_height.url);
       image.attr("data-state", "still" );
       pOne.append(image)
      
    
         $("#soccerGifs").append(pOne);
    }

});

}

 // function that animate and stop a moving Gif

 function animateAndStop (){
   
     var state = $(this).find("img").attr("data-state");

     if (state === "still") {
         $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
         $(this).find("img").attr("data-state","animate");


     }  else {
        $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
        $(this).find("img").attr("data-state","still");
        
     }
  
 }


   $(document).ready(function(){
       displayButtons();

   });

   // an event handler for soccer buttons to find appropriate gifs

   $(document).on("click", "#soccerBottons", findSoccerGifs );

   // event handler to make image animate 
   $(document).on("click", "#animateBottons", findSoccerGifs );










