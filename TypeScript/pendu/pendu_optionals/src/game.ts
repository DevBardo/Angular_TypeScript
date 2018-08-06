import { Word, User } from "./data";

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
    private _hiddenWord: Array<string> = []; // caché le mot à deviner
    private _status: Status; // status du jeu 
    // message pour le joueur : état du jeu
    private _message: string;
    private _alreadyPlayWords: Array<string> = [];

    constructor(private _words: Array<Word>, private _user: User) {
        this.init(_words); // initialisation du jeu
    }

    init(words: Array<Word>, status: Status = Status.Start): void {
        // choix aléatoire d'un mot
        let randomIndex: number = Math.floor(Math.random() * words.length);
        this._word = words[randomIndex].word;
        // le jeu commence on le met à start 
        this._status = status;
        this._attempts = 1;
        this._hiddenWord = [];

        // On cache le mot à deviner
        for (let i = 0; i < this._word.length; i++)
            this._hiddenWord[i] = '#';

        this._message = `Voici un jeu de pendu vous devez deviner le mot caché en ${this._maxAttempts} coups au plus, vous pouvez
        soit proposer une lettre ou un mot, au fur à et mesure le mot se dévoilera si vous devinez les lettres.
        Bonne chance ! mot : ${this.show()}`;
    }

    // getter permettant d'afficher plus simplement le status et les messages : game.status ou game.message
    get status(): Status { return this._status; }
    set status(status: Status) { this._status = status; }

    get message(): string { return this._message; }
    // gestion de l'utilisateur : setter et getter
    get user(): User { return this._user; }
    set user(user: User) { this._user = user; }

    get attemps(): number { return this._attempts; }

    /**
     * isLetter : test boolean si la lettre proposée est dans le mot ou non
     * 
     * @param letter 
     */
    isLetter(letter: string): boolean {
        return this._word.match(letter.toLowerCase()) ? true : false;
    }

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
        let result = '';
        for (let i = 0; i < this._hiddenWord.length; i++) {
            result += this._hiddenWord[i];
        }
        return result;
    }

    /**
     * modifyHideWord: on modifie le mot caché en fonction des bonnes lettres trouvées
     * 
     * @param letter 
     */
    modifyHideWord(letter: string): void {
        letter = letter.toLowerCase();

        for (let i = 0; i < this._word.length; i++) {
            this._hiddenWord[i] = (letter == this._word[i]) ? letter :
                (this._hiddenWord[i] == '#') ? '#' : this._hiddenWord[i];
        }
    }

    /**
     * run: fonction qui permet de calculer tous les paramètres du jeu
     * 
     * @param choice 
     */
    run(choice: string): void {

        if (choice.length > 1) {

            if (this.isWord(choice)) {
                this._status = Status.Winner as Status;
            } else {
                this._user.score -= 1;
                this._message = `Bien essayé, mais votre mot : ${choice} n'est pas le message caché...
                Recommencez, ${this.show()}, votre score : ${this._user.score}
                `;
            }

        } else if (choice.length === 1) {

            if (this.isLetter(choice)) {
                this.modifyHideWord(choice);
                this._alreadyPlayWords.push(choice);
                // il trouve le mot complet ?
                if (this.isWord(this.show())) {
                    this._status = Status.Winner as Status;
                } else {
                    this._message = `Vous avez trouvé une lettre recommencez : ${this.show()}, votre score : ${this._user.score}`;
                }
            } else {
                this._user.score -= 1;
                this._message = `Désolé, mais la lettre ${choice}, n'est pas dans le mot caché : ${this.show()},
                 votre score : ${this._user.score}`;
            }

        } else {
            this._user.score -= 1;
            this._message = `Désolé, mais vous proposez un caractère vide, n'est pas dans le mot caché : ${this.show()},
            votre score : ${this._user.score}`;
        }

        this._message += ` nombre de coup(s) restant : ${this._maxAttempts - this._attempts}`;
        this._attempts++;

        if (this._attempts > this._maxAttempts && this.status !== Status.Winner) this.status = Status.Loser;
    }

    /**
     * final: affiche l'état du jeu à la fin
     */
    final() {
        if (this._status === Status.Winner)
            return `Bravo vous avez trouvé le mot ${this._word} en ${this._attempts} coup(s), votre score : ${this._user.score}`;

        return `Désolé malgré les ${this._attempts - 1} coup(s) vous n'avez pas trouve le mot magique !
            On vous le donne quand même c'était : ${this._word}, votre score : ${this._user.score}`;
    }

    isAlreadyPlayWord(word: string) {
        return this._alreadyPlayWords.indexOf(word) != -1;
    }

}