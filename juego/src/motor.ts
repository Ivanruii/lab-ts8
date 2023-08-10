import { Card, GameState, CARDS_TO_FLIP, cards, CurrentStatus } from './model';
import { createCardElement, createStartButton, createScoreText, setAlertText } from './ui';

export let gameState: GameState = {
    flippedCards: 0,
    pickedCards: [],
    currentStatus: CurrentStatus.NotStarted,
    attempts: 0
};

function handleStartButtonClick() {
    const startButton = createStartButton();

    startButton.addEventListener("click", () => {
        gameState.currentStatus = CurrentStatus.Started;
        initializeGame();
        startButton.remove();
    });

    return startButton;
}

function flipCard(card: Card) {
    const cardElement = document.getElementById(card.id) as HTMLElement;

    if (card.founded) {
        return setAlertText<HTMLElement>("alerts-container", "No puedes darle la vuelta a una carta encontrada.", 4000);
    }

    if (cardElement) {
        if (!card.isFlipped) {
            cardElement.style.transform = "rotateY(180deg)";
        } else {
            cardElement.style.transform = "rotateY(0deg)";
        }
        card.isFlipped = !card.isFlipped;
    }
}

function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    shuffledArray.sort(() => Math.random() - 0.5);
    return shuffledArray;
}

function isGameWon(): boolean {
    return cards.every((card) => card.founded);
}

function checkIfCouple(pickedCards: Card[]) {
    if (pickedCards.length === 2) {
        const [cardA, cardB] = pickedCards;

        if (cardA.src === cardB.src) {
            cardA.founded = true;
            cardB.founded = true;
        } else {
            flipCard(cardA);
            flipCard(cardB);
        }
    }
}

function resetGameState() {
    gameState.pickedCards = [];
    gameState.flippedCards = 0;
    gameState.attempts = 0;
    gameState.currentStatus = CurrentStatus.NotStarted;

    cards.forEach((card) => {
        card.founded = false;
        card.isFlipped = false;
    })
}

function updateAttempts(scoreText: HTMLElement): number {
    gameState.attempts++;
    scoreText.innerHTML = `Intentos: ${gameState.attempts}`;
    return gameState.attempts;
}

function handleGameWin(cardsContainer: HTMLElement, infoContainer: HTMLElement) {
    setAlertText<HTMLElement>("alerts-container", "¡Has ganado! Espera para volver a jugar.", 5000);
    setTimeout(() => {
        cardsContainer.innerHTML = "";
        infoContainer.innerHTML = "";
        gameState.currentStatus = CurrentStatus.Finished
        resetGameState()
        cardsContainer.appendChild(handleStartButtonClick());
    }, 5000);
}

export function initializeGame() {
    const cardsContainer = document.getElementById("cards-container");
    const infoContainer = document.getElementById("info-container");

    if (!cardsContainer || !infoContainer) {
        return;
    }

    cardsContainer.innerHTML = "";

    if (gameState.currentStatus === CurrentStatus.NotStarted || gameState.currentStatus === CurrentStatus.Finished) {
        cardsContainer.appendChild(handleStartButtonClick());
        return;
    }

    if (gameState.currentStatus === CurrentStatus.Started) {
        const shuffledCards = shuffleArray(cards);
        const scoreText = createScoreText();
        infoContainer.appendChild(scoreText);

        shuffledCards.forEach((card) => {
            const cardElement = createCardElement(card.src, card.id);
            cardElement.id = card.id;
            cardsContainer.appendChild(cardElement);

            cardElement.addEventListener("click", () => {
                if (gameState.flippedCards < CARDS_TO_FLIP) {
                    flipCard(card);
                    gameState.pickedCards.push(card);
                    gameState.flippedCards++;
                }

                if (gameState.flippedCards === CARDS_TO_FLIP) {
                    setTimeout(() => {
                        checkIfCouple(gameState.pickedCards);
                        updateAttempts(scoreText);

                        if (isGameWon()) {
                            handleGameWin(cardsContainer, infoContainer);
                        }

                        gameState.pickedCards = [];
                        gameState.flippedCards = 0;                    
                    }, 1000);
                }
            });
        });
    }
}
