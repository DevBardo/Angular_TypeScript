import { Word } from "./data";

// définition d'un Enum pour l'état du jeu
export enum Status {
    Winner,
    Loser,
    Progress
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
       
        // TODO initialiser le jeu

        this._message = `Voici un jeu de pendu vous devez deviner le mot caché en ${this._maxAttempts} coups au plus, vous pouvez
        uniquement proposer un mot, certaines lettres du mot à trouver sont affichées. Bonne chance ! mot : ${this.show()}`;
    }

    // getter et setter accéder ou assigner des valeurs : game.status, game.mesage ou game.status = Status.Progress
    get status(): Status { return this._status; }
    set status(status: Status) { this._status = status; }
    get message(): string { return this._message; }
    get attemtps(): number { return this._attempts; }

    /**
    * isWord : test boolean si le mot est celui que l'on cherche ou non
    * 
    * @param word 
    */
    isWord(word: string) {
        // TODO
    }


    /**
     * show : méthode qui affiche le mot caché à deviner
     */
    show(): string {
        // TODO 
    }

    /**
     * run: fonction qui permet de calculer tous les paramètres du jeu
     * 
     * @param choice 
     */
    run(choice: string): void {

       // TODO
    }

    /**
     * final: affiche l'état du jeu à la fin
     */
    final() : string {
       // TODO
    }

}