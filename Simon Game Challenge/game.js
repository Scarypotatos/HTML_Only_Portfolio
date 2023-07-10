//---------------------Variables--------------------------------//


//List of available colours for the game
var buttonColours = ["red", "blue", "green", "yellow"];
//array holding the sequence of patterns that the user must click
var gamePattern = [];
//array holding the sequence the user clicked
var userClickedPattern = [];
//String that tracks the level of the game
var level = 0;
//Boolean to ensure that the user does not trigger additional 
var didItStart = true;


//-----------------------EVENTLISTENERS-----------------------//


//Causes the user buttons to be logged to the arrary, comparing it against the random arrangement
//Plays the sound the animation when the buttons are pressed too.
$(".btn").click( function() {
    //note: You need to $(this) in order for JQuery to understand the syntax
    var userChosenColour =  $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    //the input for the code below refers to the index of the user's answers
    if(!didItStart) {
        checkAnswer(userClickedPattern.indexOf(userChosenColour));
    }

    
    //For debugging
    // console.log(userClickedPattern);
    // console.log(level);
    // console.log(gamePattern);
});


//A click listener that checks for the user to press any buttons to start the game.
//Includes a switch where only the first button pressed is registered to start a game, and subsequent button presses would not do anything
$("html").keydown( function(){
    if (didItStart){
        nextSequence();
        didItStart = false;
        //Test for if the code actually works and further keypresses by the user doesn't get registered.
        console.log(didItStart);
        console.log(userClickedPattern);
        console.log(level);
        console.log(gamePattern);
    };
})





//---------------------FUNCTIONS/MECHANICS------------------//


function nextSequence() {
    //Clears the user inputs for a fresh start on the next level
    userClickedPattern = [];
    //Generates a number between 0 to 3, corresponding to the number of items in the array buttonColours
    var randomNumber = Math.round(Math.random()*3);
    //Uses the randomly generated number to select one colour out of the array
    var randomChosenColour = buttonColours[randomNumber];
    //Adds the chosen colour to the gamePattern array for reference
    gamePattern.push(randomChosenColour);
    // provides a visual and audio indicator to the user which colour is chosen
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    //Increases the level to the current level the user is on 
    level ++;
    //Changes the text on the game website to reflect the current level the user is on
    $("#level-title").text("Level "+ level);
  
}


//Plays the sound of the corresponding coloured tile. Can be tagged to any of the functions that will require calling of the sounds
function playSound(name) {
    var colourAudio = new Audio("sounds/" + name + ".mp3" );
    colourAudio.play();
}


//Makes the button that was pressed become darker to indicate that it has been pressed
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout( function(){ 
        $("#"+ currentColour).removeClass("pressed"); 
    }, 10);
}


//Checks the user's input against the answer to see if it matches.
function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        //console.log("success!");
        //Checking to see if the user is done clicking. 
        //Does this by checking the current index and the level of the game. 
        //Have to add 1 to current level as the index starts with 0 but level starts with 1.
        //It was the problem. 
        //Wrong solution: if(currentLevel-1 === level), 
        //Why it's wrong: It is essentially the index of the item within the array which the user last clicked. 
        //What went wrong: The array did not reset. 
        //Why it went wrong: It does not 
        if (userClickedPattern.length === gamePattern.length){
            setTimeout( function() {
                nextSequence()
            }, 1000);
            //^ The problem with this is that it resets the counter every time the user clicks something
            
            //Wrong solution: Putting the <userClickedPattern = []; here
            //Why it's wrong:
        }
    }
    else {
        //console.log("wrong");
        $("#level-title").text("Game over, press any button to continue.");
        $("body").addClass("game-over");
        setTimeout( function() {
            //When writing the classs inside the bracket, do not put the "." to represent it as a class.
            //The text is already considered a class already, so by putting the ".", uyou're making it double dotted.
            $("body").removeClass("game-over");
        }, 200);
        //note, if you want to insert in the name of the sound file, you have to put the apostrophes.
        playSound("wrong");
        //calls the function to reset the relevant parameters needed for a fresh game start.
        startOver();
    }
}

//Problem: Array does not store more than 1 answer
//Problem: Game does not go past level 4.

function startOver() {
    level = 0;
    gamePattern = [];
    didItStart = true;
}