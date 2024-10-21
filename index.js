const boardElement = document.querySelector('.board');
const rows = 6;
const cols = 7;
let currentPlayer = 'red';
let gamesPlayed = 0;
let currentPieces = 0;

// Scoreboard

const currentTurnDisplay = document.getElementById('currentTurn');
const gamesPlayedDisplay = document.getElementById('gamesPlayed');


function updateScoreboard() {
    if (currentPlayer === 'red') {
        currentTurnDisplay.textContent = "Tour du joueur : Rouge";
    } else {
        currentTurnDisplay.textContent = "Tour du joueur : Jaune";
    }
}

function updateGamesPlayed() {
    gamesPlayedDisplay.textContent = `Parties jouées : ${gamesPlayed}`;
}

function updatePieceCount() {
    document.getElementById('currentPieces').textContent = `Pions actuellement joués : ${currentPieces}`;
}


function createBoard() {
    boardElement.innerHTML = ''; // Vider le plateau si nécessaire
    for (let row = 0; row < rows; row++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            rowElement.appendChild(cell);
        }
        boardElement.appendChild(rowElement);
    }
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', () => addPawn(cell));
    });
}

function resetGame() {
    currentPlayer = 'red';
    currentPieces = 0;
    createBoard();
    updateScoreboard();
    updatePieceCount();
}



function addPawn(cell) {
    const col = cell.dataset.col;
    const cellsInColumn = Array.from(document.querySelectorAll(`[data-col='${col}']`));


    for (let i = cellsInColumn.length - 1; i >= 0; i--) {
        if (!cellsInColumn[i].classList.contains('red') && !cellsInColumn[i].classList.contains('yellow')) {
            cellsInColumn[i].classList.add(currentPlayer);

            currentPieces++;
            updatePieceCount();

            const previousPlayer = currentPlayer;
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';

            updateScoreboard();

            if (winCondtion()) {
                winnerIs(previousPlayer);
            }
            break;
        }
    }
}


function checkWinDirection(row, col, rowDir, colDir) {
    let currentColor = null;

    for (let i = 0; i < 4; i++) {
        const newRow = row + i * rowDir;
        const newCol = col + i * colDir;

        if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
            return false;
        }


        const cell = document.querySelector(`.cell[data-row='${newRow}'][data-col='${newCol}']`);

        if (i === 0) {
            currentColor = cell.classList.contains('red') ? 'red' : cell.classList.contains('yellow') ? 'yellow' : null;
            if (!currentColor) return false;
        } else {
            if (!cell.classList.contains(currentColor)) {
                return false;
            }
        }
    }
    return true;
}

function winCondtion() {

    for (let row = 0; row < rows; row++) { // colonnes
        for (let col = 0; col < cols; col++) {
            if (checkWinDirection(row, col, 0, 1)) return true; // de gauche a droite
            if (checkWinDirection(row, col, 1, 0)) return true; // de haut en bas
            if (checkWinDirection(row, col, 1, 1)) return true; // diagonal vers le bas a droite
            if (checkWinDirection(row, col, -1, 1)) return true; // diagonal vers le haut à droite
        }
    }
    return false;
}

function winnerIs(previousPlayer) {
    const winningPlayer = previousPlayer === 'red' ? 'Rouge' : 'Jaune';
    setTimeout(() => {
        alert(`${winningPlayer} a gagné !`)

        gamesPlayed++;
        updateGamesPlayed();

        resetGame();
    }, 200)
}
createBoard();
updateScoreboard();
updateGamesPlayed();


// Bouton refresh. 

const resetButton = document.querySelector('.resetButton');
resetButton.addEventListener('click', () => {
    resetGame();
});


