const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2, 'row-0'], // Top row
  [3, 4, 5, 'row-1'], // Middle row
  [6, 7, 8, 'row-2'], // Bottom row
  [0, 3, 6, 'col-0'], // Left column
  [1, 4, 7, 'col-1'], // Middle column
  [2, 5, 8, 'col-2'], // Right column
  [0, 4, 8, 'diagonal-1'], // Diagonal
  [2, 4, 6, 'diagonal-2']  // Diagonal
];

// Handle cell click
function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
  
  // If cell is already clicked or game is over
  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }
  
  // Update game state and UI
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = `<span class="${currentPlayer === 'X' ? 'x-mark' : 'o-mark'}">${currentPlayer}</span>`;
  clickedCell.classList.add('disabled');
  
  // Check for win/draw
  checkResult();
}

// Check for win/draw
function checkResult() {
  let roundWon = false;
  let winCondition;
  
  // Check all winning conditions
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c, lineClass] = winningConditions[i];
    
    if (
      gameState[a] === '' ||
      gameState[b] === '' ||
      gameState[c] === ''
    ) {
      continue;
    }
    
    if (
      gameState[a] === gameState[b] &&
      gameState[b] === gameState[c]
    ) {
      roundWon = true;
      winCondition = winningConditions[i];
      break;
    }
  }
  
  // Handle win
  if (roundWon) {
    status.textContent = `${currentPlayer} wins!`;
    status.classList.add('victory-animation');
    gameActive = false;
    
    // Add win line animation
    const [a, b, c, lineClass] = winCondition;
    cells[a].classList.add('win-line', lineClass);
    cells[b].classList.add('win-line', lineClass);
    cells[c].classList.add('win-line', lineClass);
    
    return;
  }
  
  // Handle draw
  if (!gameState.includes('')) {
    status.textContent = 'It\'s a draw!';
    gameActive = false;
    return;
  }
  
  // Continue game - switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `${currentPlayer}'s turn`;
}

// Reset game
function resetGame() {
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  status.textContent = `${currentPlayer}'s turn`;
  status.classList.remove('victory-animation');
  
  cells.forEach(cell => {
    cell.innerHTML = '';
    cell.classList.remove('disabled', 'win-line', 'row-0', 'row-1', 'row-2', 'col-0', 'col-1', 'col-2', 'diagonal-1', 'diagonal-2');
  });
}

// Event listeners
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetGame);