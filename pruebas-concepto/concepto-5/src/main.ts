import './style.css';

export interface Card {
    id: string;
    src: string;
    isFlipped: boolean;
    founded: boolean;
}

export let cards: Card[] = [
    {
        id: "1",
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/1.png?raw=true",
        isFlipped: false,
        founded: false
    },
    {
        id: "2",
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/2.png?raw=true",
        isFlipped: false,
        founded: false
    },
    {
        id: "3",
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/3.png?raw=true",
        isFlipped: false,
        founded: false
    },
    {
        id: "4",
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/4.png?raw=true",
        isFlipped: false,
        founded: false
    },
    {
        id: "5",
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/5.png?raw=true",
        isFlipped: false,
        founded: false
    },
    {
        id: "6",
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/6.png?raw=true",
        isFlipped: false,
        founded: false
    },
    {
        id: "7",
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/1.png?raw=true",
        isFlipped: false,
        founded: false
    },
    {
        id: "8",
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/2.png?raw=true",
        isFlipped: false,
        founded: false
    },
    {
        id: "9",
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/3.png?raw=true",
        isFlipped: false,
        founded: false
    },
    {
        id: "10",
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/4.png?raw=true",
        isFlipped: false,
        founded: false
    },
    {
        id: "11",
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/5.png?raw=true",
        isFlipped: false,
        founded: false
    },
    {
        id: "12",
        src: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/6.png?raw=true",
        isFlipped: false,
        founded: false
    }
];

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


const cardsContainer = document.getElementById("cards-container") as HTMLElement;

cards.forEach((card) => {
    const cardElement = createCardElement(card.src, card.id);
    cardElement.id = card.id;
    cardsContainer.appendChild(cardElement);
    cardElement.style.transform = "rotateY(180deg)";
});
