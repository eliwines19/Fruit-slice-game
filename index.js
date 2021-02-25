$(function(){
    // contingent on text inside the #start-or-reset divs inner html
    var playingStatus = false

    // click event listeners
    $("#start-or-reset").click(startGame)
    $("#game-over-reset").click(reloadPage)

    function startGame() {
        // start game text changes to reset game
        changeText($("#start-or-reset"))
        // timer appears and starts for one minute
        beginTimer($("#timer"))
        // fruit begins to fall
        fallingFruit()
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
        createClickEvent(fruitDiv)
        makeFruitFall(fruitDiv)
    }

    function createClickEvent(fruit){
        fruit.click(function(){
            fruit.remove()
            // add one to score
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

    // dots is an array of Dot objects,
    // mouse is an object used to track the X and Y position
    // of the mouse, set with a mousemove event listener below
    var dots = [], mouse = { x: 0, y: 0};

    // The Dot object used to scaffold the dots
    var Dot = function() {
        this.x = 0;
        this.y = 0;
        this.node = (function(){
            var n = document.createElement("div");
            n.className = "trail";
            document.body.appendChild(n);
            return n;
        }());
    };

    // The Dot.prototype.draw() method sets the position of 
    // the object's <div> node
    Dot.prototype.draw = function() {
        this.node.style.left = `${this.x + 3}px`;
        this.node.style.top = `${this.y + 3}px`;
    };

    // Creates the Dot objects, populates the dots array
    for (var i = 0; i < 15; i++) {
        var d = new Dot();
        dots.push(d);
    }

    // This is the screen redraw function
    function draw() {
        // Make sure the mouse position is set everytime
        // draw() is called.
        var x = mouse.x, y = mouse.y;

        // This loop is where all the 90s magic happens
        dots.forEach(function(dot, index, dots) {
            var nextDot = dots[index + 1] || dots[0];

            dot.x = x;
            dot.y = y;
            dot.draw();
            x += (nextDot.x - dot.x) * .5;
            y += (nextDot.y - dot.y) * .5;

        });

    }

    addEventListener("mousemove", function(event) {
        //event.preventDefault();
        mouse.x = event.pageX;
        mouse.y = event.pageY;
    });

    // animate() calls draw() then recursively calls itself
    // everytime the screen repaints via requestAnimationFrame().
    function animate() {
        draw();
        requestAnimationFrame(animate);
    }

    // And get it started by calling animate().
    animate();

})

