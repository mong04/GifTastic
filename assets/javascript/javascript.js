$(document).ready(function(){

	var actors = ["Tim Allen", "Vince Vaughn", "Sylvester Stallone", "Jon Voight", "James Woods", "Stacey Dash", "Chris Pratt", "Adam Baldwin", "Clint Eastwood", "Dennis Miller"];

	function displayButtons () {
		$("#gifButtons").empty();

		for (i = 0; i < actors.length; i++) {
			var button = $("<button>");

			button.addClass("actor-button");

			button.attr("actor-name", actors[i]);

			button.text(actors[i]);

			$("#gifButtons").append(button);
		}
	}

	function displayGifs () {
		var actor = $(this).attr("actor-name");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        actor + "&api_key=dc6zaTOxFJmzC&limit=10"
        $("#gifs").empty();

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			var results = response.data;
			console.log(response);
			for (i=0; i<results.length; i++) {
				var gifDiv = $("<div class='image'>");

				var rating = results[i].rating;

				var p = $("<p>").text("Rating: " + rating);

				var actorImage = $("<img>");
				actorImage.attr("src", results[i].images.fixed_height_still.url);
				actorImage.attr("state", "still");
				gifDiv.prepend(p);
				gifDiv.prepend(actorImage);

				

				$("#gifs").prepend(gifDiv);
			}
		})
	}

	$(document).on("click", "img", function() {
		var state = $(this).attr("state");
		var url = $(this).attr("src");
		var animate = url.replace("200_s.gif", "200.gif");
		var still = url.replace("200.gif", "200_s.gif");
		console.log(animate);
		console.log(url);
		console.log(state);
		if (state === "still") {
			$(this).attr("src", animate);
			$(this).attr("state", "animated");
		}
		else {
			$(this).attr("src", still);
			$(this).attr("state", "still");
		}
	})

	$("#addActor").click(function(event) {
		event.preventDefault();
		
		var actorValue = $("#search-input").val().trim();
		if (actorValue === "") {
			alert("Please enter the name of an actor/actress.")
		}
		else {
		actors.push(actorValue);

		console.log(actors);
		
		displayButtons();

		$("#search-input").val("");
		}

	});

	$(".actor-button").click(function(){
		console.log($(this).val("actor-name"));
	})

	$(document).on("click", ".actor-button", displayGifs);


	displayButtons();

});