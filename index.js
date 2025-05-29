window.addEventListener("DOMContentLoaded", () => {
    const tiles = Array.from(document.querySelectorAll(".tile"));
    const playerDisplay = document.querySelector(".display-player");
    const resetButton = document.getElementById("reset");
    const announcer = document.querySelector(".announcer");
    announcer.classList.add("hide");


    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let isGameActive = true;

    const PLAYERX_WON = "PLAYERX_WON";
    const PLAYERO_WON = "PLAYERO_WON";
    const TIE = "TIE";

    const winningConditions = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6]
    ]; 

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === "" || b === "" || c === "") {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
    if (roundWon) {
        announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
       }
       
    if (!board.includes(""))
        announce(TIE);   
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won'; 
                break;   
            case TIE:
                announcer.innerText = 'Tie'
                break;    
        }
        announcer.classList.remove("hide");
    };

    const isValidAction = (tile) => {
        if (tile.innerText === "X" || tile.innerText === "O"){
            return false;
        }
        return true;
    };

    const updateBoard = (index, player) => {
        board[index] = player;
    }

     function changePlayer  () {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`); 
        console.log(currentPlayer);
    }
    

    
    function userAction (tile, index)  {
        if(isValidAction(tile) && isGameActive) {
            const activePlayer = currentPlayer;
            tile.innerText = activePlayer;
            tile.classList.add(`player${activePlayer}`);
            updateBoard(index, activePlayer);

            const gameWon = checkWin(activePlayer);
            if(gameWon) {
                announce(activePlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
                isGameActive = false;
                return;
            }

            if(!board.includes("")) {
                announce(TIE);
                isGameActive = false;
                return;
            }
            // handleResultValidation();
            // if(isGameActive){
            //     changePlayer();
            changePlayer();
            }
            
        }

   
    function checkWin(player) {
        return winningConditions.some(condition => {
               return condition.every(index => board[index] === player);
        });
    }

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        isGameActive = true;
        announcer.classList.add("hide");
        if (currentPlayer === "O") {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = "";
            tile.classList.remove("playerX");
            tile.classList.remove("playerO");
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener("click", () => userAction(tile, index))
    });

    resetButton.addEventListener("click", resetBoard);
});






//  const cells = document.querySelectorAll(".cell");
// const statusText = document.querySelector("#statusText");
// const restartBtn = document.querySelector("#restartBtn");
// const winConditions = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
// ];
// let options = ["", "", "", "", "", "", "", "", ""];
// let currentPlayer = "X";
// let running = false;

// initializeGame();

// function initializeGame(){
//     cells.forEach(cell => cell.addEventListener("click", cellClicked));
//     restartBtn.addEventListener("click", restartGame);
//     statusText.textContent = `${currentPlayer}'s turn`;
//     running = true;
// }
// function cellClicked(){
//     const cellIndex = this.getAttribute("cellIndex");

//     if(options[cellIndex] != "" || !running){
//         return;
//     }

//     updateCell(this, cellIndex);
//     checkWinner();
// }
// function updateCell(cell, index){
//     options[index] = currentPlayer;
//     cell.textContent = currentPlayer;
// }
// function changePlayer(){
//     currentPlayer = (currentPlayer == "X") ? "O" : "X";
//     statusText.textContent = `${currentPlayer}'s turn`;
// }
// function checkWinner(){
//     let roundWon = false;

//     for(let i = 0; i < winConditions.length; i++){
//         const condition = winConditions[i];
//         const cellA = options[condition[0]];
//         const cellB = options[condition[1]];
//         const cellC = options[condition[2]];

//         if(cellA == "" || cellB == "" || cellC == ""){
//             continue;
//         }
//         if(cellA == cellB && cellB == cellC){
//             roundWon = true;
//             break;
//         }
//     }

//     if(roundWon){
//         statusText.textContent = `${currentPlayer} wins!`;
//         running = false;
//     }
//     else if(!options.includes("")){
//         statusText.textContent = `Draw!`;
//         running = false;
//     }
//     else{
//         changePlayer();
//     }
// }
// function restartGame(){
//     currentPlayer = "X";
//     options = ["", "", "", "", "", "", "", "", ""];
//     statusText.textContent = `${currentPlayer}'s turn`;
//     cells.forEach(cell => cell.textContent = "");
//     running = true;
// }