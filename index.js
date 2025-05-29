document.addEventListener("DOMContentLoaded", () => {
    const tiles = Array.from(document.querySelectorAll(".tile"));
    const playerDisplay = document.querySelector(".display-player");
    const resetButton = document.getElementById("reset");
    const announcer = document.querySelector(".announcer");

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === "X" ? "PLAYERX_WON" : "PLAYERO_WON");
            isGameActive = false;
            return;
        }

        if (!board.includes("")) {
            announce("TIE");
            isGameActive = false;
        }
    }

    const announce = (type) => {
        switch(type) {
            case "PLAYERO_WON":
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case "PLAYERX_WON":
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case "TIE":
                announcer.innerText = "Tie";
        }
        announcer.classList.remove("hide");
    };

    const isValidAction = (tile) => {
        return tile.innerText === "";
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    };

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    
    };

   const userAction = (tile, index) => {
    if(isValidAction(tile) && isGameActive) {
        // Store current player before making changes
       // const activePlayer = currentPlayer;
         
        // Update display and board
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        
        board[index] = currentPlayer;  // Update board directly // changed from activePlayer
     
        
        // Check if this move won the game
        const gameWon = winningConditions.some(condition => {
            return condition.every(i => board[i] === currentPlayer); // changed from activePlayer
        });

        if(gameWon) {
            announce(currentPlayer === "X" ? "PLAYERX_WON" : "PLAYERO_WON");
            isGameActive = false;
            return;
        }

        // Check for tie
        if(!board.includes("")) {
            announce("TIE");
            isGameActive = false;
            return;
        }
        
        // Only switch players if game is still active
        changePlayer();
    }
}; 

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
    };

    tiles.forEach((tile, index) => {
        tile.addEventListener("click", () => userAction(tile, index));
    });

    resetButton.addEventListener("click", resetBoard);
});

 