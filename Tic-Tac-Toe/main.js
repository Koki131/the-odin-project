

const playerFactory = (name, mark) => {


    return {name, mark};
}




const getResult = function(board) {

    let result = "";
    let isGameOver = false;
    let score = 0;

  

    const checkX = function(n) {
        return board[n].textContent === 'X';

    }

    const checkO = function(n) {
        return board[n].textContent === 'O';

    }

    
    if (result == '') {

        const checkDiagonal = (function() {



            if ((checkX(0) && checkX(4) && checkX(8)) || (checkX(2) && checkX(4) && checkX(6))) {
            
                result = 'X';
                isGameOver = true;
                score = -10;
            
            } else if ((checkO(0) && checkO(4) && checkO(8)) || (checkO(2)  && checkO(4) && checkO(6))) {
    
                result = 'O';
                isGameOver = true;
                score = 10;
    
            }
    
    
        })();
    
    
        const checkVertical = (function() {
    
            if ((checkX(0) && checkX(3) && checkX(6)) || (checkX(1) && checkX(4) && checkX(7)) || (checkX(2) && checkX(5) && checkX(8))) {
            
                result = 'X';
                isGameOver = true;
                score = -10;
            
            } else if ((checkO(0) && checkO(3) && checkO(6)) || (checkO(1) && checkO(4) && checkO(7)) || (checkO(2) && checkO(5) && checkO(8))) {
    
                result = 'O';
                isGameOver = true;
                score = 10;
    
            }
    
    
        })();
    
    
        const checkHorizontal = (function() {
    
            if ((checkX(0) && checkX(1) && checkX(2)) || (checkX(3) && checkX(4) && checkX(5)) || (checkX(6) && checkX(7) && checkX(8))) {
            
                result = 'X';
                isGameOver = true;
                score = -10;
            
            } else if ((checkO(0) && checkO(1) && checkO(2)) || (checkO(3) && checkO(4) && checkO(5)) || (checkO(6) && checkO(7) && checkO(8))) {
    
                result = 'O';
                isGameOver = true;
                score = 10;
    
            }
    
        })();
    
    
        const checkDraw = (function() {
    
            let count = 0;
    
            board.forEach(button => {
    
                if (button.textContent != '') {
                    count++;
                }
    
            });
    
            if (count === 9 && result === "") {

                result = 'Draw';
                isGameOver = true;
                score = 0;
            
            }
    
        })();
    

    }
   
    return {result, isGameOver, score};


}


const gameBoard = (function() {
    
    const container = document.querySelector('.container');

    const playerOne = playerFactory('John', 'X');
    const playerTwo = playerFactory('Mark (AI)', 'O');

    const board = [];

    const resetGame = function(reset, res, result) {

        reset.addEventListener('click', function() {

            res.result.textContent = '';
            result.textContent = '';

            board.forEach(button => {

                button.textContent = '';
                button.style.backgroundColor = '';
            
            });

        });


    }

    const miniMax = function(depth, isMaximizingPlayer) {
       
        
        const score = getResult(board).score;

        const gameOver = getResult(board).isGameOver;
        
        // Base cases

        if (score === 10) {
            return score - depth;
        }

        if (score === -10) {
            return score + depth;
        }

        if (gameOver) {
            return 0;
        }

        if (isMaximizingPlayer) {

            let maxEval = -Infinity;

            for (let i = 0; i < 9; i++) {

                if (board[i].textContent === '') {

                    board[i].textContent = playerTwo.mark;
                    const eval = miniMax(depth + 1, false);
                    board[i].textContent = '';
                    maxEval = Math.max(maxEval, eval);

                }
            }

            return maxEval;

        } else {

            let minEval = Infinity;

            for (let i = 0; i < 9; i++) {

                if (board[i].textContent === '') {
                    
                    board[i].textContent = playerOne.mark;
                    const eval = miniMax(depth + 1, true);
                    board[i].textContent = '';
                    minEval = Math.min(minEval, eval);

                }
            }

            return minEval;
        }
    }


    const findBestMove = function() {

        let bestEval = -Infinity;
        let bestMove = -1;

        for (let i = 0; i < 9; i++) {
            
            if (board[i].textContent === '') {
                    
                board[i].textContent = playerTwo.mark;
                const eval = miniMax(0, false);
                board[i].textContent = '';

                if (eval > bestEval) {

                    bestEval = eval;
                    bestMove = i;

                }
            }
        }

        return bestMove;
    }



    const addButtonFunctionality = function(n, score, result, scr, playerOne, playerTwo, reset) {
        
        
        let res1 = getResult(board);

        resetGame(reset, res1, result);

        if (res1.result == '') {


            if (board[n].textContent == '') {

                board[n].textContent = playerOne.mark;
                
                board[n].style.backgroundColor = 'blanchedalmond';

                let bestMove = findBestMove();

                if (bestMove != -1) {


                    board[bestMove].textContent = playerTwo.mark;

                }

            
            } 
        


            let res2 = getResult(board);




            if (res2.result == 'X') {

                score[playerOne.name] += 1;
                result.textContent = `${playerOne.name} Wins!`;
            
            } else if (res2.result == 'O') {
            
                score[playerTwo.name] += 1;
                result.textContent = `${playerTwo.name} Wins!`;
            
            } else if (res2.result == 'Draw') {

                result.textContent = 'Draw!';

            }

            scr.textContent = `${playerOne.name} ${score[playerOne.name]} : ${score[playerTwo.name]} ${playerTwo.name} `; 

        }
    }

    const populateBoard = (function() {



        const score = {
            [playerOne.name] : 0,
            [playerTwo.name] : 0
        };
        
        for (let n = 0; n < 3; n++) {
           
            let div = document.createElement('div'); 
            
            if (n < 2) {

                div.id = 'score' + n;
           
            } else {
               
                div.id = 'restart';
            
            }


            container.appendChild(div);
        }

        const score0 = container.querySelector('#score0');
        const score1 = container.querySelector('#score1');
        const restart = container.querySelector('#restart');

        let scr = document.createElement('p');
        scr.textContent = `${playerOne.name} ${score[playerOne.name]} : ${score[playerTwo.name]} ${playerTwo.name} `; 

        let reset = document.createElement('button');
        reset.textContent = 'Restart';

        let result = document.createElement('h2');

        score0.appendChild(scr);
        score1.appendChild(result);
        restart.appendChild(reset);
        
        


        for (let n = 0; n < 9; n++) {


            let div = document.createElement('div');
            let button = document.createElement('button');

            button.classList.add('game-button');
            
            board[n] = button;

            board[n].addEventListener('click', function() {
                
                
                addButtonFunctionality(n, score, result, scr, playerOne, playerTwo, reset);

                
            });


            
            div.appendChild(button);
            container.appendChild(div);

        
        }


    })();



})();

