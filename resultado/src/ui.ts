import { ElementWithInnerText, Card, CARDS_TO_FLIP, cards, CurrentStatus } from './model';
import { shuffleArray, checkIfCouple, gameState, resetGameState, addFlippedCards, addGameAttempt, changeGameStatus } from './motor';


const elements = {
    cardsContainer: getElementOrThrow<HTMLDivElement>('cards-container'),
    infoContainer: getElementOrThrow<HTMLDivElement>('info-container'),
    scoreText: getElementOrThrow<HTMLDivElement>('score-text'),
}

function initializeElements() {
    return {
        ...elements
    }
}

function getElementOrThrow<Type>(id: string): Type {
    const element = document.getElementById(id) as Type;
    if (!element) {
        throw new Error(`Element with id "${id}" not found.`);
    }
    return element;
}

export function createCardElement(imageSrc: string, id: string): HTMLElement {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    const cardImage = document.createElement("img");
    cardImage.src = imageSrc;
    cardImage.id = id;

    cardBack.appendChild(cardImage);
    cardContainer.appendChild(cardFront);
    cardContainer.appendChild(cardBack);

    return cardContainer;
}

export function createStartButton() {
    const startButton = document.createElement("button");

    startButton.className = "start-button";
    startButton.innerText = "EMPEZAR";

    return startButton;
}


export function setAlertText<Type extends ElementWithInnerText>(elementId: string, text: string, resetTime?: number): void {
    const element = getElementOrThrow(elementId);

    if (element) {
        (element as Type).innerText = String(text);

        if (element instanceof HTMLElement) {
            element.style.display = 'block';
        }
    }

    if (resetTime) {
        setTimeout(() => {
            if (element) {
                (element as Type).innerText = '';

                if (element instanceof HTMLElement) {
                    element.style.display = 'none';
                }
            }
        }, resetTime);
    }
}

function handleStartButtonClick() {
    const startButton = createStartButton();

    startButton.addEventListener("click", () => {
        changeGameStatus(CurrentStatus.Started)
        initializeGame();
        startButton.remove();
    });

    return startButton;
}

function flipCard(card: Card) {
    const cardElement = document.getElementById(card.id) as HTMLElement;

    if (card.founded) {
        setAlertText<HTMLElement>("alerts-container", "No puedes darle la vuelta a una carta encontrada.", 4000);
        return;
    }

    if (cardElement) {
        const rotationAngle = card.isFlipped ? "0deg" : "180deg";
        cardElement.style.transform = `rotateY(${rotationAngle})`;
        card.isFlipped = !card.isFlipped;
    }
}

function isGameWon(): boolean {
    return cards.every((card) => card.founded);
}

function updateAttempts(scoreText: HTMLElement) {
    addGameAttempt()
    scoreText.innerHTML = `Intentos: ${gameState.attempts}`;
}

function handleGameWin(cardsContainer: HTMLElement) {
    setAlertText<HTMLElement>("alerts-container", "¡Has ganado! Espera para volver a jugar.", 5000);
    setTimeout(() => {
        resetGameContainer()
        resetInfoContainer()
        changeGameStatus(CurrentStatus.Finished)
        resetGameState()
        cardsContainer.appendChild(handleStartButtonClick());
    }, 5000);
}

function handleGameStarted() {
    const shuffledCards = shuffleArray(cards);
    const elements = initializeElements();

    shuffledCards.forEach((card) => {
        const cardElement = createCardElement(card.src, card.id);
        cardElement.id = card.id;
        elements.cardsContainer.appendChild(cardElement);

        handleCardClick(cardElement, card)
    });
}

function handleCardClick(cardElement: HTMLElement, card: Card) {
    cardElement.addEventListener("click", () => {
        if (gameState.flippedCards < CARDS_TO_FLIP) {
            onOneCardFlipped(card)
        }

        if (gameState.flippedCards === CARDS_TO_FLIP) {
            onAllCardsFlipped()
        }
    });
}

function onOneCardFlipped(card: Card) {
    flipCard(card);
    gameState.pickedCards.push(card);
    addFlippedCards()
}

function onAllCardsFlipped() {
    const elements = initializeElements();

    elements.infoContainer.appendChild(elements.scoreText);
    setTimeout(() => {
        if (!checkIfCouple(gameState.pickedCards)) {
            gameState.pickedCards.forEach((card) => {
                flipCard(card);
            })
        }

        updateAttempts(elements.scoreText);

        if (isGameWon()) {
            handleGameWin(elements.cardsContainer);
        }

        gameState.pickedCards = [];
        gameState.flippedCards = 0;
    }, 1000);
}

function resetGameContainer() {
    const elements = initializeElements();

    elements.cardsContainer.innerHTML = "";
}

function resetInfoContainer() {
    const elements = initializeElements();

    elements.infoContainer.innerHTML = "";
}

export function initializeGame() {
    const elements = initializeElements();

    resetGameContainer()
    if (gameState.currentStatus === CurrentStatus.NotStarted || gameState.currentStatus === CurrentStatus.Finished) {
        elements.cardsContainer.appendChild(handleStartButtonClick());
    }

    if (gameState.currentStatus === CurrentStatus.Started) {
        handleGameStarted()
    }
}