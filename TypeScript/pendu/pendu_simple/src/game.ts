import { Word } from "./data";

// définition d'un Enum pour l'état du jeu
export enum Status {
    Winner,
    Loser,
    Progress,
    Start
}

export class Game {

    private _attempts: number; // compter le nombre de coup(s)
    private readonly _maxAttempts: number = 7; // définir le nombre de coups max lecture seule
    private _word: string; // mot à devnier en clair
    private _hiddenWord: string; // caché le mot à deviner
    private _status: Status; // status du jeu 
    // message pour le joueur : état du jeu
    private _message: string;

    constructor(private _words: Array<Word>) {
        this.init(_words); // initialisation du jeu
    }

    init(words: Array<Word>): void {
        // choix aléatoire d'un mot
        let randomIndex: number = Math.floor(Math.random() * words.length);
        this._word = words[randomIndex].word;
        // le jeu commence on le met à start 
        this._status = Status.Progress;
        this._attempts = 1;
        this._hiddenWord = words[randomIndex].hide;

        this._message = `Voici un jeu de pendu vous devez deviner le mot caché en ${this._maxAttempts} coups au plus, vous pouvez
        uniquement proposer un mot, certaines lettres du mot à trouver sont affichées. Bonne chance ! mot : ${this.show()}`;
    }

    // getter permettant d'afficher plus simplement le status et les messages : game.status ou game.message
    get status(): Status { return this._status; }
    set status(status: Status) { this._status = status; }
    get message(): string { return this._message; }
    // gestion de l'utilisateur : setter et getter
    get attemtps(): number { return this._attempts; }

    /**
    * isWord : test boolean si le mot est celui que l'on cherche ou non
    * 
    * @param word 
    */
    isWord(word: string) {
        return word.toLowerCase() === this._word;
    }

    /**
     * show : méthode qui affiche le mot caché à deviner
     */
    show(): string {
        return this._hiddenWord;
    }

    /**
     * run: fonction qui permet de calculer tous les paramètres du jeu
     * 
     * @param choice 
     */
    run(choice: string): void {

        if (this.isWord(choice)) {
            this._status = Status.Winner as Status;
        } else {
            this._message = `Bien essayé, mais votre mot : ${choice} n'est pas le message caché...
                Recommencez, ${this.show()}
                `;
        }


        this._message += ` nombre de coup(s) restant : ${this._maxAttempts - this._attempts}`;
        this._attempts++;

        if (this._attempts > this._maxAttempts
            && this.status !== Status.Winner)
            this.status = Status.Loser;
    }

    /**
     * final: affiche l'état du jeu à la fin
     */
    final() {
        if (this._status === Status.Winner)
            return `Bravo vous avez trouvé le mot ${this._word} en ${this._attempts}`;

        return `Désolé malgré les ${this._attempts - 1} coup(s) vous n'avez pas trouve le mot magique !
            On vous le donne quand même c'était : ${this._word}`;
    }

}