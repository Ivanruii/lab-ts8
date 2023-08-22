import { GameState, CurrentStatus, Card, cards } from "./model";

export let gameState: GameState = {
    cards: createCardsCouples(),
    flippedCards: 0,
    pickedCards: [],
    currentStatus: CurrentStatus.NotStarted,
    attempts: 0
};

function createCardsCouples() {
    const duplicatedCards = Array.from(cards, card => ({ ...card, id: card.id + '_copy'}));
    cards.push(...duplicatedCards);
    return cards
}

export function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    shuffledArray.sort(() => Math.random() - 0.5);
    return shuffledArray;
}

export function checkIfCouple(pickedCards: Card[]) {
    if (pickedCards.length === 2) {
        const [cardA, cardB] = pickedCards;

        if (cardA.id.charAt(0) === cardB.id.charAt(0)) {
            cardA.founded = true;
            cardB.founded = true;
            return true;
        }
        return false;
    }

    return new Error("Not enough cards to check");
}

export function resetGameState() {
    gameState.pickedCards = [];
    gameState.flippedCards = 0;
    gameState.attempts = 0;
    gameState.currentStatus = CurrentStatus.NotStarted;

    cards.forEach((card) => {
        card.founded = false;
        card.isFlipped = false;
    })
}

export function addFlippedCards() {
    gameState.flippedCards++;
}

export function addGameAttempt() {
    gameState.attempts++;
}

export function changeGameStatus(status: CurrentStatus) {
    gameState.currentStatus = status;
}