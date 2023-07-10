//Generating a random dice roll
var randomNumber1 = Math.floor(Math.random()*6)+1;
var randomNumber2 = Math.floor(Math.random()*6)+1;

//Changing the image of the dices
document.querySelector(".img1").setAttribute("src", "images/dice"+ randomNumber1 + ".png")
document.querySelector(".img2").setAttribute("src", "images/dice"+ randomNumber2 + ".png")

function diceRollResult() {
    if (randomNumber1 > randomNumber2) {
        //If player 1 wins
        document.querySelector(".result").textContent = "Player 1 wins!";
    } else if (randomNumber1 < randomNumber2) {
        //If player 2 wins
        document.querySelector(".result").textContent = "Player 2 wins!";
    } else {
        //If it is a draw
        document.querySelector(".result").textContent = "It's a draw!";
    }
}
diceRollResult();