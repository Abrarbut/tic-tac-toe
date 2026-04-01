const gameboard = document.getElementById('gameboard');
const cells = gameboard.getElementsByTagName('td');
let currentPlayer = 'X';

for (let cell of cells) {
    cell.addEventListener('click', () => {
        if (cell.textContent === '') {
            cell.textContent = currentPlayer;
            if (checkWin()) {
                alert(`${currentPlayer} wins!`);
                resetGame();
            } else if (checkDraw()) {
                alert("It's a draw!");
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    return winConditions.some(condition => {
        return condition.every(index => cells[index].textContent === currentPlayer);
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function resetGame() {
    for (let cell of cells) {
        cell.textContent = '';
    }
    currentPlayer = 'X';
}
