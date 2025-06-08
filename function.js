const board= document.getElementById("board");
const status= document.getElementById("status");
const resetButton= document.getElementById("resetButton");
let currentPlayer= "X";
let gameActive= true;
let gameState= ["", "", "", "", "", "", "", "", ""];
const winningConditions= [
  [0, 1, 2],[3, 4, 5], [6, 7, 8],//Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], //Columns
  [0, 4, 8], [2, 4, 6] //Diagonals
];      
function createBoard(){
    board.innerHTML= "";// Clear the board
    gameState= ["", "", "", "", "", "", "", "", ""]; // Reset game state    
    gameActive= true; // Reset game active state
    status.textContent = `Current Player: ${currentPlayer}`; // Reset status text 
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const index = event.target.getAttribute("data-index");
    if (gameState[index] !== "" || !gameActive) {
        return; // Ignore if cell is already filled or game is not active
    }
    gameState[index] = currentPlayer; // Update game state
    event.target.textContent = currentPlayer; // Update cell display

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false; // End the game
        return;
    }
    if (gameState.every(cell => cell !== "")) {
        statusText.textContent = "It's a draw!";
        gameActive = false; // End the game
        return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
   
    statusText.textContent = `Player: ${currentPlayer}'s turn`; // Update status text
}
function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] === currentPlayer && gameState[b] === currentPlayer && gameState[c] === currentPlayer;
    });
}
resetButton.addEventListener("click", () =>{
    createBoard(); // Reset the game board
    currentPlayer = "X"; // Reset to player X
    statusText.textContent = `Current Player: ${currentPlayer}`; // Update status text
}); // Reset the game when button is clicked
// Initialize the game board
createBoard(); // Call createBoard to set up the game
