import { Card, GameState, CARDS_TO_FLIP, cards, CurrentStatus } from './model';
import { createCardElement, createStartButton, createScoreText, setAlertText } from './ui';

const cardsContainer = document.getElementById("cards-container");
const infoContainer = document.getElementById("info-container");

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

function handleGameWin(cardsContainer: HTMLElement) {
    setAlertText<HTMLElement>("alerts-container", "¡Has ganado! Espera para volver a jugar.", 5000);
    setTimeout(() => {
        resetGameContainer()
        resetInfoContainer()
        gameState.currentStatus = CurrentStatus.Finished
        resetGameState()
        cardsContainer.appendChild(handleStartButtonClick());
    }, 5000);
}

function handleGameStarted() {
    const shuffledCards = shuffleArray(cards);
    if (infoContainer && cardsContainer) {

        shuffledCards.forEach((card) => {
            const cardElement = createCardElement(card.src, card.id);
            cardElement.id = card.id;
            cardsContainer.appendChild(cardElement);

            handleCardClick(cardElement, card)
        });
    }
}

function handleCardClick(cardElement: HTMLElement, card: Card) {
    if (cardsContainer && infoContainer) {
        cardElement.addEventListener("click", () => {
            if (gameState.flippedCards < CARDS_TO_FLIP) {
                onOneCardFlipped(card)
            }

            if (gameState.flippedCards === CARDS_TO_FLIP) {
                onAllCardsFlipped()
            }
        });
    }
}

function onOneCardFlipped(card: Card) {
    flipCard(card);
    gameState.pickedCards.push(card);
    gameState.flippedCards++;
}

function onAllCardsFlipped() {
    const scoreText = createScoreText();
    if (cardsContainer && infoContainer) {
        infoContainer.appendChild(scoreText);
        setTimeout(() => {
            checkIfCouple(gameState.pickedCards);
            updateAttempts(scoreText);

            if (isGameWon()) {
                handleGameWin(cardsContainer);
            }

            gameState.pickedCards = [];
            gameState.flippedCards = 0;
        }, 1000);
    }
}

function resetGameContainer() {
    if (cardsContainer) {
        cardsContainer.innerHTML = "";
    }
}

function resetInfoContainer() {
    if (infoContainer) {
        infoContainer.innerHTML = "";
    }
}

export function initializeGame() {
    if (cardsContainer && infoContainer) {
        resetGameContainer()
        if (gameState.currentStatus === CurrentStatus.NotStarted || gameState.currentStatus === CurrentStatus.Finished) {
            cardsContainer.appendChild(handleStartButtonClick());
        }

        if (gameState.currentStatus === CurrentStatus.Started) {
            handleGameStarted()
        }
    }
}