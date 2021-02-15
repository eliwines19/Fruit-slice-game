// When screen loads, user is prompted with game board
window.addEventListener('load', function(){

    $("#start-or-reset").click(startGame)

    var playingStatus = false

    function changeText(btn) {
        if (btn.html() === "Release the fruit!") {
            playingStatus = true;
            $("#start-or-reset").html("Stop the Fruit!")
            $("#start-or-reset").css({
                "background-color" : "red",
                "color" : "white"
            })
        } else {
            playingStatus = false;
            $("#start-or-reset").html("Release the fruit!")
            $("#start-or-reset").css({
                "background-color" : "#966F33",
                "color" : "black"
            })
        }
    }

    // if user starts game 
    function startGame() {
        // start game text changes to reset game
        changeText($("#start-or-reset"))
        // timer appears and starts for one minute
            // if timer hits 0
                // users score is sent to the score in game over div
                // game score is shown
        // fruit begins to fall
            // fruit falls from top to bottom of screen
                // if user slices fruit
                    // score increase by one
                // if user missed fruit
                    // score decrease by one
    }

})

    // if user ends game
        // score is set to zero
        // game over div display is none
        // time is no longer showing and is set to 60 seconds