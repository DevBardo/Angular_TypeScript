/**
 * Correction du TP jeu du pendu
 * @author : Antoine
 */
import { EventEmitter } from 'events';
import { MockWords} from "../data";
import { Game, Status } from "../game";

/**
 * Bootstrap
 */
let event: EventEmitter = new EventEmitter(); // Nous permet d'émettre des données.
process.stdin.setEncoding('utf8'); // Définit l'encodage des caractères dans le flux de la console.

let current: any; // variable pour l'émission 
let game = new Game(MockWords); // Initialisation du jeu

/**
 * Application : interaction avec le joueur
 */

// Tout ce qui est envoyé par la méthode stdout arrive ici
// et est émis vers event.emit(current, ...)
process.stdin.on('data', (data) => {
  event.emit(current, data.toString().trim());
});

event.on('connect', (choice, message) => {
  console.log(message);
  current = choice;
  process.stdout.write('> ');
});

// les paramètres choice et game.message sont émis vers la méthode event.on('connect', ...)
event.emit('connect', 'choice', game.message);

/**
 * On analyse les réponses du joueur
 */
event.on('choice', (choice) => {
  game.run(choice); // logique du jeu
  if (game.status === Status.Progress)
    event.emit('connect', 'choice', game.message); // envoyé à event.on('connect', ...)
  else
    event.emit('end');
});

/**
 * Le jeu se termine on affiche le message game.final()
 */
event.on('end', () => {
  console.log(game.final());
  process.stdin.pause();
});
