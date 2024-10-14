const boardElement = document.querySelector('.board');
const rows = 6;
const cols = 7;
let currentPlayer = 'red';


function createBoard() {
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
}

function addPawn(cell) {
    const col = cell.dataset.col;
    const cellsInColumn = Array.from(document.querySelectorAll(`[data-col='${col}']`));


    for (let i = cellsInColumn.length - 1; i >= 0; i--) {
        if (!cellsInColumn[i].classList.contains('red') && !cellsInColumn[i].classList.contains('yellow')) {
            cellsInColumn[i].classList.add(currentPlayer);

            const previousPlayer = currentPlayer;
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';

            setTimeout(() => {
                if (winCondtion()) {
                    winnerIs(previousPlayer);
                }
            }, 200);



            break;
        }
    }
}


function checkWinDirection(row, col, rowDir, colDir) {
    let count = 0;
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
            // const cells = document.querySelector(`.cell[data-col='${col}'][data-row='${row}']`);
            // savoir la couleur
            // savoir si elle suit la couleur d'avant
            // wincondition si 4 a la suite.
            if (checkWinDirection(row, col, 0, 1)) return winnerIs(row, col); // de gauche a droite
            if (checkWinDirection(row, col, 1, 0)) return winnerIs(row, col); // de haut en bas
            if (checkWinDirection(row, col, 1, 1)) return winnerIs(row, col); // diagonal vers le bas a droite
            if (checkWinDirection(row, col, -1, 1)) return winnerIs(row, col); // diagonal vers le haut à droite
        }
    }
}

function winnerIs(row, col) {
    const winningPlayer = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`).classList.contains('red') ? 'Rouge' : 'Jaune';
    alert(`${winningPlayer} a gagné !`)
}
createBoard();



const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('click', () => addPawn(cell));
});



// Bouton refresh. 

const resetButton = document.querySelector('.resetButton');
resetButton.addEventListener('click', () => {
    location.reload();
});