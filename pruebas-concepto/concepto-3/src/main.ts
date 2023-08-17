import './style.css';

interface Card {
    src: string;
    alt: string;
    isFlipped: boolean;
}

const cards: Card[] = [
    {
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/1.png?raw=true",
        alt: "Card 1",
        isFlipped: false
    },
    {
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/2.png?raw=true",
        alt: "Card 2",
        isFlipped: false
    },
    {
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/3.png?raw=true",
        alt: "Card 3",
        isFlipped: false
    },
    {
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/4.png?raw=true",
        alt: "Card 4",
        isFlipped: false
    },
    {
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/5.png?raw=true",
        alt: "Card 5",
        isFlipped: false
    },
    {
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/6.png?raw=true",
        alt: "Card 6",
        isFlipped: false
    },
    {
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/1.png?raw=true",
        alt: "Card 7",
        isFlipped: false
    },
    {
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/2.png?raw=true",
        alt: "Card 8",
        isFlipped: false
    },
    {
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/3.png?raw=true",
        alt: "Card 9",
        isFlipped: false
    },
    {
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/4.png?raw=true",
        alt: "Card 10",
        isFlipped: false
    },
    {
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/5.png?raw=true",
        alt: "Card 11",
        isFlipped: false
    },
    {
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/6.png?raw=true",
        alt: "Card 12",
        isFlipped: false
    }
];

function createCardElement(imageSrc: string, altText: string): HTMLElement {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    const cardImage = document.createElement("img");
    cardImage.src = imageSrc;
    cardImage.alt = altText;

    cardBack.appendChild(cardImage);
    cardContainer.appendChild(cardFront);
    cardContainer.appendChild(cardBack);

    return cardContainer;
}

function initializeGame(): void {
    const container = document.getElementById("container");

    if (container) {
        cards.forEach((carta) => {
            const cardElement = createCardElement(carta.src, carta.alt);
            cardElement.id = carta.alt;
            container.appendChild(cardElement);
        });
    }
}

initializeGame();