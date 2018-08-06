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

// si vous souhaitez faire un jeu avec un utilisateur, partie facultative
export class User {
    name: string;
    score: number;
    attempts: number = 0;
}