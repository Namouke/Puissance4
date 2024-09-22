const boardElement = document.querySelector('.board');
const rows = 6;
const cols = 7;


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


createBoard();

let currentPlayer = 'red'; 


function addPawn(cell) {
    const col = cell.dataset.col; 
    const cellsInColumn = Array.from(document.querySelectorAll(`[data-col='${col}']`)); 

    for (let i = cellsInColumn.length - 1; i >= 0; i--) {
        if (!cellsInColumn[i].classList.contains('red') && !cellsInColumn[i].classList.contains('yellow')) {
            cellsInColumn[i].classList.add(currentPlayer); 
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red'; 
            break; 
        }
    }
}

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('click', () => addPawn(cell));
});



// Bouton refresh. 

const resetButton = document.querySelector('.resetButton');


resetButton.addEventListener('click', () => {
    location.reload();
});