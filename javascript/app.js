var dogTopics = ["Golden Retriever", "Shih Tzu", "Labrador", "Miniature Dachshund"];

function renderButtons() {
    $("#btn-view").empty();

    for (i = 0; i < dogTopics.length; i++) {
        var newBtn = $("<button>");
        newBtn.attr("data-name", dogTopics[i]);
        newBtn.text(dogTopics[i]);
        $("#btn-view").append(newBtn);
        addClickListenerToButton(newBtn);
    }
}

$("#add-dog").on("click", function (event) {
    event.preventDefault();
    var dogSelector = $("#dog-input").val().trim();
    dogTopics.push(dogSelector);

    renderButtons();
});

renderButtons();

function addClickListenerToButton(button) {
    button.on("click", function () {
        var dog = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dog + "&api_key=ipzr9vk04Ed1Ib1XxHR7RWY41yvDA2nl&limit=10&rating=pg13";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var dogDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Image Rating: " + rating);
                var dogImage = $("<img>");
                dogImage.attr("src", results[i].images.fixed_height.url);
                dogImage.attr("alt", "Where'd all the pups go?");
                dogDiv.append(p, dogImage);
                $("#dog-view").prepend(dogDiv);
            }
        });
    });
}
