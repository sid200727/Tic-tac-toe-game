const board = document.getElementById("board");
const statusText = document.getElementById("statusText");
const resetButton = document.getElementById("resetButton");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function createBoard() {
  board.innerHTML = ""; // Clear the board
  gameState = ["", "", "", "", "", "", "", "", ""]; // Reset game state    
  gameActive = true; // Reset game active state
  currentPlayer = "X"; // Reset current player
  statusText.textContent = `Current Player: ${currentPlayer}`; // Update status text 

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
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player: ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return (
      gameState[a] === currentPlayer &&
      gameState[b] === currentPlayer &&
      gameState[c] === currentPlayer
    );
  });
}

resetButton.addEventListener("click", createBoard);

// Initialize the game
createBoard();
