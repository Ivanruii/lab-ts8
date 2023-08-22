export interface Card {
    id: string;
    src: string;
    isFlipped: boolean;
    founded: boolean;
}

export enum CurrentStatus {
    NotStarted = 'NotStarted',
    Started = 'Started',
    Finished = 'Finished'
}

export type GameState = {
    cards: Card[];
    flippedCards: number;
    pickedCards: Card[];
    currentStatus: CurrentStatus;
    attempts: number;
};

export interface ElementWithInnerText {
    innerText: string;
}

export const CARDS_TO_FLIP = 2;

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
];