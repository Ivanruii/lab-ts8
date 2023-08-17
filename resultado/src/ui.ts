import {  ElementWithInnerText } from './model';

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

export function createScoreText() {
    const scoreText = document.createElement("p");
    scoreText.className = "score-text";
    scoreText.innerHTML = "Intentos: 0";
    return scoreText;
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

function getElementOrThrow<Type>(id: string): Type {
    const element = document.getElementById(id) as Type;
    if (!element) {
        throw new Error(`Element with id "${id}" not found.`);
    }
    return element;
}

