// définit la structure de la classe Word utilisée comme type dans la 
// la constante MockWords
export class Word {
    word: string;
    hide: string;
}

// les données d'exemple pour initialiser le jeu
export const MockWords: Word[] = [
    { word: "cornedrue", hide: "#o######e" },
    { word: "cognards", hide: "c######s" },
    { word: "fourchelang", hide: "########a#g" },
    { word: "gringotts", hide: "#######tts" },
    { word: "hyppogriffes", hide: "####o######s" },
];