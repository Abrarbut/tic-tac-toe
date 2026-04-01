
const gameboard = document.getElementById('gameboard');
const cells = Array.from(gameboard.querySelectorAll('td'));
const statusEl = document.getElementById('status');
const newGameBtn = document.getElementById('newGame');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const scoreDEl = document.getElementById('scoreD');

const winConditions = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6] // diags
];

let startingPlayer = 'X';
let currentPlayer = startingPlayer;
let gameActive = true; // false after win/draw until New Game
let scores = { X: 0, O: 0, D: 0 };

function init() {
    cells.forEach((cell, index) => {
        cell.textContent = '';
        cell.classList.remove('win');
        cell.setAttribute('tabindex', '0');
        cell.setAttribute('role', 'button');
        cell.setAttribute('aria-label', `Cell ${index + 1}`);
        cell.dataset.index = index;

        cell.onclick = () => handleCell(index);
        cell.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCell(index);
            }
        };
    });

    newGameBtn.onclick = startNewGame;
    updateStatus();
    updateScoreboard();
}

function handleCell(index) {
    if (!gameActive) return;
    const cell = cells[index];
    if (cell.textContent !== '') return;

    cell.textContent = currentPlayer;

    const winning = checkWin();
    if (winning) {
        highlightWinning(winning);
        statusEl.textContent = `${currentPlayer} wins!`;
        scores[currentPlayer]++;
        updateScoreboard();
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        statusEl.textContent = `It's a draw!`;
        scores.D++;
        updateScoreboard();
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

function checkWin() {
    for (const condition of winConditions) {
        const [a,b,c] = condition;
        if (
            cells[a].textContent !== '' &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            return condition; // return the winning indices
        }
    }
    return null;
}

function highlightWinning(indices) {
    indices.forEach(i => cells[i].classList.add('win'));
}

function checkDraw() {
    return cells.every(cell => cell.textContent !== '');
}

function updateStatus() {
    statusEl.textContent = `Current turn: ${currentPlayer}`;
}

function updateScoreboard() {
    scoreXEl.textContent = scores.X;
    scoreOEl.textContent = scores.O;
    scoreDEl.textContent = scores.D;
}

function startNewGame() {
    // Alternate starting player each new game
    startingPlayer = startingPlayer === 'X' ? 'O' : 'X';
    currentPlayer = startingPlayer;
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
    });
    updateStatus();
}

// initialize on load
init();
