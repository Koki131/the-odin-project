
let container = document.querySelector(".container");

let opponentP = document.querySelector("#opponent");

let result = document.querySelector("#result");

const options = ["rock", "paper", "scissors"];

container.querySelectorAll('button').forEach(occurence => {

    let id = occurence.getAttribute('id');
    

    occurence.addEventListener('click', function() {
        
        let opponent = options[Math.floor(Math.random() * 3)];

        result.innerHTML = "";

        opponentP.innerHTML = "Player 2 chose " + opponent;


        if (id === opponent) {

            result.innerHTML = "Draw!";
        
        } else if (id === "rock" && opponent === "scissors") {
        
            result.innerHTML = "Player 1 Wins!";
        
        } else if (id === "rock" && opponent === "paper") {

            result.innerHTML = "Player 2 Wins!";
 
        } else if (id === "paper" && opponent === "scissors") {

            result.innerHTML = "Player 2 Wins!";

        } else if (id === "paper" && opponent === "rock") {

            result.innerHTML = "Player 1 Wins!";

        } else if (id === "scissors" && opponent === "paper") {

            result.innerHTML = "Player 1 Wins!";

        } else if (id === "scissors" && opponent === "rock") {

            result.innerHTML = "Player 2 Wins!";

        }


    });

});