export class Word {
    word: string;
}

export const MockWords: Word[] = [
    { word: "cornedrue" },
    { word: "cognards" },
    { word: "fourchelang" },
    { word: "gringotts" },
    { word: "hyppogriffes" },
];

/**
 * Structure pour le joueur 
 */
export class User {
    name: string;
    score: number;
    attempts: number = 0;
}