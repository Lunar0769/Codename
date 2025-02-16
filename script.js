let gameState = {
    currentTurn: 'red',  // 'red' or 'blue' for alternating turns
    spymasterTurn: true, // True means it's the spymaster's turn, False for operatives
    redTeam: ['Player 1'],
    blueTeam: ['Player 2'],
    board: [],
    revealedCards: [],
    words: [
        'apple', 'banana', 'car', 'dog', 'elephant',
        'phone', 'king', 'queen', 'wizard', 'rocket',
        'ocean', 'mountain', 'sky', 'tree', 'house',
        'robot', 'light', 'sun', 'moon', 'star',
        'book', 'pen', 'computer', 'piano', 'watch'
    ],
    roles: {
        redSpymaster: null,
        blueSpymaster: null
    }
};



function startGame() {
    initializeGame();
    setUpTeams();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getWordTeam(index) {
    if (index < 8) return 'red';
    if (index < 16) return 'blue';
    if (index < 24) return 'neutral';
    return 'assassin';
}

function initializeGame() {
    const board = document.getElementById("game-board");
    board.innerHTML = "";

    // Shuffle words and roles
    const shuffledWords = [...words].sort(() => 0.5 - Math.random()).slice(0, 25);
    const cardRoles = Array(8).fill("red").concat(
        Array(8).fill("blue"),
        Array(7).fill("neutral"),
        Array(1).fill("assassin")
    );
    shuffle(cardRoles);

    // Create cards
    shuffledWords.forEach((word, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.textContent = word;
        card.dataset.role = cardRoles[index];

        card.addEventListener("click", () => {
            if (!card.classList.contains("revealed")) {
                card.classList.add("revealed", card.dataset.role);
            }
        });

        board.appendChild(card);
    });
}

function revealCard(index) {
    if (gameState.board[index].revealed) return; // Don't reveal again if already revealed

    const currentCard = gameState.board[index];
    currentCard.revealed = true;
    const cardElement = document.getElementsByClassName('card')[index];
    cardElement.classList.add('revealed');

    if (currentCard.team === 'red') {
        cardElement.style.backgroundColor = 'red';
    } else if (currentCard.team === 'blue') {
        cardElement.style.backgroundColor = 'blue';
    } else if (currentCard.team === 'neutral') {
        cardElement.style.backgroundColor = 'gray';
    } else if (currentCard.team === 'assassin') {
        cardElement.style.backgroundColor = 'black';
    }

    // Update turn after each guess
    switchTurn();
}

function switchTurn() {
    if (gameState.spymasterTurn) {
        gameState.spymasterTurn = false;
        document.getElementById('turn-indicator').textContent = `${gameState.currentTurn.charAt(0).toUpperCase() + gameState.currentTurn.slice(1)} Team's Operative's Turn`;
    } else {
        gameState.spymasterTurn = true;
        gameState.currentTurn = gameState.currentTurn === 'red' ? 'blue' : 'red';
        document.getElementById('turn-indicator').textContent = `${gameState.currentTurn.charAt(0).toUpperCase() + gameState.currentTurn.slice(1)} Team's Spymaster's Turn`;
    }
}

function setUpTeams() {
    // Simulating Spymaster Role assignment
    gameState.roles.redSpymaster = gameState.redTeam[0];
    gameState.roles.blueSpymaster = gameState.blueTeam[0];
}
