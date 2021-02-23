// When screen loads, user is prompted with game board
window.addEventListener('load', function(){

    // contingent on text inside the #start-or-reset divs inner html
    var playingStatus = false

    // click event listeners
    $("#start-or-reset").click(startGame)
    $("#game-over-reset").click(reloadPage)

    // if user starts game 
    function startGame() {
        // start game text changes to reset game
        changeText($("#start-or-reset"))
        // timer appears and starts for one minute
        beginTimer($("#timer"))
        // fruit begins to fall
        fallingFruit()
            // fruit falls from top to bottom of screen
                // if user slices fruit
                    // score increase by one
                // if user missed fruit
                    // score decrease by one
    }

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

    function reloadPage() { location.reload() }

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
        $("#timer").hide()
        $("#game-over").show()
    }

    function fallingFruit() {
        // put this on an interval, occuring in a range of times
        let interval = setInterval(chooseFruit, randomInteger(2000, 6000))
        if (playingStatus === false) {
            clearInterval(interval)
        }
    }

    function randomInteger(min, max) {  
        return Math.floor(Math.random() * (max - min) + min); 
    }

    function chooseFruit() {
        const fruitDiv = $("<div></div>");
        fruitDiv.addClass("fruit");
        fruitDiv.css({
            "background-image": `url("fruit/${randomInteger(1, 30)}.png")`,
            "margin-left": `${randomInteger(5, 80)}%`
        })
        $("#fruit-board").append(fruitDiv)
        addClickEvent(fruitDiv)
        makeFruitFall(fruitDiv)
    }

    function addClickEvent(fruit) {
        fruit.click(function(){
            // remove fruit
            fruit.remove()
            // add 1 point
            // make popup for hit fruit (boom, bam, booyah)
        })
    }

    function makeFruitFall(fruit) {
        let fruitY = parseInt(fruit.css("top"), 10)
        let fruitSpeed = randomInteger(2,6)
        let interval = setInterval(function(){
            fruitY += fruitSpeed;
            fruit.css("top", `${fruitY}px`)
            // fruit exits the screen
            if (fruitY >= 400) {
                clearInterval(interval)
                fruit.remove()
            }
        }, 10)
    }

})

    // if user ends game
        // score is set to zero
        // game over div display is none
        // time is no longer showing and is set to 60 seconds