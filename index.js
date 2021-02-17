// When screen loads, user is prompted with game board
window.addEventListener('load', function(){

    function reloadPage() { location.reload() }

    $("#start-or-reset").click(startGame)
    $("#game-over-reset").click(reloadPage)

    // contingent on text inside the #start-or-reset divs inner html
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

    function beginTimer(timer) {
        if (playingStatus === true) {
            timer.show()
            clock();
        } else {
            reloadPage();
        }
    }

    function clock() {
        let time = parseInt($("#time").html(), 10)
        let interval = setInterval(function() {
            // if timer hits 0
            if(time <= 1) {
                clearInterval(interval)
                playingStatus = false
                // users score is sent to the score in game over div
                transferScore()
                // game score is shown
                showGameOver()
            }
            time -= 1;
            $("#time").html(time)
        }, 1000)
    }

    function transferScore() {
        const score = $("#score-value").html();
        $("#final-score").html(score)
    }
    
    function showGameOver() {
        $("#game-over").show()
    }


    // if user starts game 
    function startGame() {
        // start game text changes to reset game
        changeText($("#start-or-reset"))
        // timer appears and starts for one minute
        beginTimer($("#timer"))
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