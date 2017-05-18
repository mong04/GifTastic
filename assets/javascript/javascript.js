$(document).ready(function(){

	var actors = ["Tim Allen", "Vince Vaughn", "Sylvester Stallone", "Jon Voight", "James Woods", "Stacey Dash", "Chris Pratt", "Adam Baldwin", "Clint Eastwood", "Dennis Miller"];


	// function to display the buttons with names from actors[]
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

	// function to create the <img> tags, assign them a class and source then display them on the DOM
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

	// Click event for animating/pausing the gifs when clicked on
	$(document).on("click", "img", function() {
		var state = $(this).attr("state");
		var url = $(this).attr("src");
		var animate = url.replace("200_s.gif", "200.gif");
		var still = url.replace("200.gif", "200_s.gif");

		if (state === "still") {
			$(this).attr("src", animate);
			$(this).attr("state", "animated");
		}
		else {
			$(this).attr("src", still);
			$(this).attr("state", "still");
		}
	})

	// click event for the submit button to add name to actors[] then reset the input value
	$("#addActor").click(function(event) {
		event.preventDefault();
		
		var actorValue = $("#search-input").val().trim();
		if (actorValue === "") {
			alert("Please enter the name of an actor/actress.")
		}
		else {
		actors.push(actorValue);
		
		displayButtons();

		$("#search-input").val("");
		}

	});

	// click event for all generated buttons with actor's names
	$(document).on("click", ".actor-button", displayGifs);

	// call on function to display initial buttons
	displayButtons();

});